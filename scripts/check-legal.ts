/**
 * Fails the build while a TODO_ placeholder survives in the legal documents.
 *
 * There was no such gate before, which is precisely how a placeholder reaches
 * production: the page renders, nothing throws, and "TODO_NIF" sits in the
 * legal notice of a live commercial site until a customer finds it.
 *
 * Development needs to build over them, so ALLOW_LEGAL_TODO=1 downgrades the
 * failure to a warning. The deploy script does not set it.
 *
 *   npx tsx scripts/check-legal.ts
 */
import { LEGAL_DOCS, LEGAL_SLUGS } from '../src/lib/legal';
import { LOCALES } from '../src/lib/locales';
import { tx } from '../src/lib/locales';

const PLACEHOLDER = /TODO_[A-Z_]+/g;

const found = new Map<string, Set<string>>();

for (const slug of LEGAL_SLUGS) {
  const doc = LEGAL_DOCS[slug];
  for (const locale of LOCALES) {
    const text = [tx(doc.title, locale), tx(doc.description, locale), tx(doc.body, locale)].join('\n');
    for (const match of text.matchAll(PLACEHOLDER)) {
      const set = found.get(match[0]) ?? new Set<string>();
      set.add(slug);
      found.set(match[0], set);
    }
  }
}

if (found.size === 0) {
  console.log('[check-legal] clean — no placeholders left in the legal documents');
  process.exit(0);
}

const lenient = process.env.ALLOW_LEGAL_TODO === '1';
const log = lenient ? console.warn : console.error;

log(
  `[check-legal] ${found.size} placeholder(s) still in the legal documents.` +
    ' Each is a company detail only the operator can supply:\n',
);
for (const [placeholder, slugs] of [...found].sort()) {
  log(`  ${placeholder.padEnd(24)} ${[...slugs].sort().join(', ')}`);
}

if (lenient) {
  console.warn('\n[check-legal] ALLOW_LEGAL_TODO=1 — continuing anyway. Do not deploy like this.');
  process.exit(0);
}
console.error('\nSet ALLOW_LEGAL_TODO=1 to build over them before launch.');
process.exit(1);
