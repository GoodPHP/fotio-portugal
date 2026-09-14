/**
 * Renames every `fr` key in a bilingual object literal to `pt` and replaces its
 * value with a marker.
 *
 * The alternative — renaming the key and keeping the text — typechecks, passes
 * every gate in the build and ships French sentences under a Portuguese key.
 * There is no detector for that. A marker fails loudly instead:
 * `scripts/check-pt-todo.ts` refuses to build while one survives, and
 * `rg -c PT_TODO` is a progress count.
 *
 * Only object literals holding *both* an `en` and an `fr` property are touched,
 * which is precisely the `Localized` shape and the inline
 * `{ en: …, fr: … }[locale]` form. Anything else is left alone.
 *
 *   npx tsx scripts/codemod/strip-fr.ts src/app src/components
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { readdirSync, statSync } from 'node:fs';
import { join, relative, extname } from 'node:path';
import ts from 'typescript';

const ROOT = process.cwd();
const MARKER = 'PT_TODO';
/** How much of the English to carry across, as a hint while translating. */
const HINT_LENGTH = 60;

interface Edit {
  start: number;
  end: number;
  text: string;
}

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry.startsWith('.')) continue;
    const abs = join(dir, entry);
    if (statSync(abs).isDirectory()) walk(abs, out);
    else if (['.ts', '.tsx'].includes(extname(entry))) out.push(abs);
  }
  return out;
}

function propertyName(prop: ts.ObjectLiteralElementLike): string | undefined {
  if (!ts.isPropertyAssignment(prop)) return undefined;
  const name = prop.name;
  if (ts.isIdentifier(name)) return name.text;
  if (ts.isStringLiteral(name)) return name.text;
  return undefined;
}

function quote(text: string): string {
  return `'${text.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

/** A same-shaped placeholder, derived from the English value where possible. */
function placeholder(en: ts.Expression | undefined, source: ts.SourceFile): string | null {
  if (en && (ts.isStringLiteral(en) || ts.isNoSubstitutionTemplateLiteral(en))) {
    const hint = en.text.replace(/\s+/g, ' ').slice(0, HINT_LENGTH).trim();
    return quote(`${MARKER}: ${hint}`);
  }
  // `deliverables` and friends are string arrays; the shape has to survive or
  // the file will not typecheck, which defeats the point of a marker.
  if (en && ts.isArrayLiteralExpression(en)) {
    const items = en.elements.map((el) => {
      const hint =
        ts.isStringLiteral(el) || ts.isNoSubstitutionTemplateLiteral(el)
          ? el.text.replace(/\s+/g, ' ').slice(0, HINT_LENGTH).trim()
          : '';
      return `    ${quote(hint ? `${MARKER}: ${hint}` : MARKER)},`;
    });
    return `[\n${items.join('\n')}\n  ]`;
  }
  // A template literal or a call: the English cannot be reused as a hint
  // because it interpolates. Reported so it can be rewritten by hand.
  void source;
  return null;
}

function processFile(abs: string): { edits: number; manual: string[] } {
  const original = readFileSync(abs, 'utf8');
  const source = ts.createSourceFile(abs, original, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const edits: Edit[] = [];
  const manual: string[] = [];

  function visit(node: ts.Node): void {
    if (ts.isObjectLiteralExpression(node)) {
      const en = node.properties.find((p) => propertyName(p) === 'en');
      const fr = node.properties.find((p) => propertyName(p) === 'fr');
      if (en && fr && ts.isPropertyAssignment(fr) && ts.isPropertyAssignment(en)) {
        const value = placeholder(en.initializer, source);
        const line = source.getLineAndCharacterOfPosition(fr.getStart(source)).line + 1;
        if (value === null) {
          manual.push(`${relative(ROOT, abs)}:${line}`);
          edits.push({
            start: fr.getStart(source),
            end: fr.getEnd(),
            text: `pt: ${quote(MARKER)}`,
          });
        } else {
          edits.push({ start: fr.getStart(source), end: fr.getEnd(), text: `pt: ${value}` });
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(source);

  if (edits.length === 0) return { edits: 0, manual };

  // Applied back to front so earlier offsets stay valid.
  edits.sort((a, b) => b.start - a.start);
  let output = original;
  for (const edit of edits) {
    output = output.slice(0, edit.start) + edit.text + output.slice(edit.end);
  }
  writeFileSync(abs, output);
  return { edits: edits.length, manual };
}

function main(): void {
  const targets = process.argv.slice(2);
  if (targets.length === 0) {
    console.error('usage: tsx scripts/codemod/strip-fr.ts <dir|file> …');
    process.exit(2);
  }

  const files = targets.flatMap((t) => {
    const abs = join(ROOT, t);
    return statSync(abs).isDirectory() ? walk(abs) : [abs];
  });

  let total = 0;
  const manual: string[] = [];
  for (const abs of files) {
    const result = processFile(abs);
    total += result.edits;
    manual.push(...result.manual);
    if (result.edits > 0) console.log(`  ${relative(ROOT, abs)}  ${result.edits}`);
  }

  console.log(`\n[strip-fr] ${total} key(s) renamed`);
  if (manual.length > 0) {
    console.log(`\n[strip-fr] ${manual.length} interpolated value(s) need rewriting by hand:`);
    for (const m of manual) console.log(`  ${m}`);
  }
}

main();
