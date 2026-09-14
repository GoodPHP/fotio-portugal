/**
 * Fails the build when the brand name or the old domain is spelled anywhere
 * but the one module that defines them.
 *
 * The site was built for one brand in one country and is being rebuilt for
 * another. Before this gate existed the brand name appeared in eighteen files
 * — including three WhatsApp greetings that said it in Italian, which nobody
 * noticed because those strings are handed to WhatsApp and never rendered into
 * a page, a test or a screenshot.
 *
 * "Funnel the brand through one place" is an intention until something
 * enforces it. This is the enforcement.
 *
 *   npx tsx scripts/check-brand.ts
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';
import { SITE_NAME } from '../src/lib/site';

const ROOT = process.cwd();

/** Directories walked. Everything else (build output, deps, git) is skipped. */
const ROOTS = ['src', 'scripts', 'e2e', 'messages'];

/** Single files that are also checked. */
const FILES = ['wrangler.jsonc', 'package.json', 'next.config.mjs', 'public/_headers'];

const EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.mjs', '.jsonc', '.json', '.css', '.py', '']);

/**
 * Terms that must not appear.
 *
 * `domain` is the previous site's origin; a surviving occurrence is a wrong
 * canonical, a wrong sitemap entry or a wrong JSON-LD @id, none of which show
 * up as a broken page.
 */
const BANNED: { pattern: RegExp; why: string }[] = [
  // The current brand, not only the previous one. Otherwise the rule decays
  // into "the brand we already renamed lives in one place", and the next
  // rename is the same hunt through eighteen files.
  {
    pattern: new RegExp(`\\b${SITE_NAME}\\b`),
    why: 'the brand name — import SITE_NAME from src/lib/site.ts',
  },
  { pattern: /\bylala\b/i, why: 'old brand name — import SITE_NAME from src/lib/site.ts' },
  { pattern: /\bylala\.art\b/i, why: 'old domain — set NEXT_PUBLIC_SITE_URL instead' },
  { pattern: /\bfotio-france\b/, why: 'the France worker — this deployment is fotio-portugal' },
  { pattern: /\bCiao\b/, why: 'Italian greeting left in a WhatsApp message template' },
  { pattern: /\bpavaphotos\b/i, why: 'a domain from an even earlier incarnation' },
];

/**
 * Files allowed to carry a banned term.
 *
 * `src/lib/site.ts` defines the brand, so it is the one place that may spell
 * it. The list is otherwise empty, and that is the finished state — the France
 * content that used to be listed here has all been replaced.
 */
const ALLOWED = new Set<string>([
  'src/lib/site.ts',
  // --- Hub-page copy still describing France, pending the Portugal rewrite.
  // Each entry is expected to be deleted rather than kept, and the script
  // fails on an allowance nobody needs, so the list cannot rot.
]);

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry.startsWith('.')) continue;
    const abs = join(dir, entry);
    if (statSync(abs).isDirectory()) {
      walk(abs, out);
      continue;
    }
    if (EXTENSIONS.has(extname(entry))) out.push(abs);
  }
  return out;
}

function main(): void {
  const files = [
    ...ROOTS.flatMap((r) => {
      try {
        return walk(join(ROOT, r));
      } catch {
        return [];
      }
    }),
    ...FILES.map((f) => join(ROOT, f)),
  ];

  const failures: string[] = [];
  const usedAllowances = new Set<string>();

  for (const abs of files) {
    const rel = relative(ROOT, abs);
    let content: string;
    try {
      content = readFileSync(abs, 'utf8');
    } catch {
      continue;
    }
    const lines = content.split('\n');
    for (const { pattern, why } of BANNED) {
      lines.forEach((line, i) => {
        if (!pattern.test(line)) return;
        if (ALLOWED.has(rel)) {
          usedAllowances.add(rel);
          return;
        }
        failures.push(`${rel}:${i + 1}  ${line.trim().slice(0, 90)}\n    → ${why}`);
      });
    }
  }

  // An allowance nobody needs is a line of stale bookkeeping that makes the
  // list look like more work is left than there is.
  const stale = [...ALLOWED].filter((f) => f !== 'src/lib/site.ts' && !usedAllowances.has(f));

  if (failures.length > 0) {
    console.error(`[check-brand] ${failures.length} occurrence(s) outside src/lib/site.ts:\n`);
    for (const f of failures) console.error(`  ${f}\n`);
    process.exit(1);
  }

  if (stale.length > 0) {
    console.error('[check-brand] these allowances are no longer needed — delete them:');
    for (const f of stale) console.error(`  ${f}`);
    process.exit(1);
  }

  // src/lib/site.ts is the definition, not an exception, so it is not counted.
  const remaining = [...usedAllowances].filter((f) => f !== 'src/lib/site.ts').length;
  console.log(
    remaining === 0
      ? '[check-brand] clean — the brand lives only in src/lib/site.ts'
      : `[check-brand] clean, with ${remaining} file(s) still allowed to name it (see ALLOWED)`,
  );
}

main();
