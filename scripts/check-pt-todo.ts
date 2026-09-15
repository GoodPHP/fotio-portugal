/**
 * Fails the build while any PT_TODO marker survives.
 *
 * The French→Portuguese codemod put one wherever a French string was removed
 * and a Portuguese one has to be written. The marker exists because the
 * alternative — renaming the key and keeping the French text — typechecks,
 * passes every other gate and ships. This is the detector for that.
 *
 *   npx tsx scripts/check-pt-todo.ts
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

const ROOT = process.cwd();
const MARKER = 'PT_TODO';

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry.startsWith('.')) continue;
    const abs = join(dir, entry);
    if (statSync(abs).isDirectory()) walk(abs, out);
    else if (['.ts', '.tsx', '.json'].includes(extname(entry))) out.push(abs);
  }
  return out;
}

const files = walk(join(ROOT, 'src')).concat(walk(join(ROOT, 'messages')));

const byFile = new Map<string, number>();
let total = 0;
for (const abs of files) {
  const hits = readFileSync(abs, 'utf8').split('\n').filter((l) => l.includes(MARKER)).length;
  if (hits > 0) {
    byFile.set(relative(ROOT, abs), hits);
    total += hits;
  }
}

if (total === 0) {
  console.log('[check-pt-todo] clean — every Portuguese string is written');
  process.exit(0);
}

console.error(`[check-pt-todo] ${total} untranslated string(s) in ${byFile.size} file(s):\n`);
for (const [file, count] of [...byFile].sort((a, b) => b[1] - a[1])) {
  console.error(`  ${String(count).padStart(4)}  ${file}`);
}
process.exit(1);
