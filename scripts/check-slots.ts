/**
 * Fails the build when a page names a city or service that does not exist.
 *
 * Every hub page picks one entry from the catalogue to front its social card,
 * and some pick one to carry a hero photograph as well. Those picks are
 * module-level constants holding a slug, and nothing checked them: `citySlot()`
 * builds an image key out of any string it is given, and `<Picture>` renders a
 * placeholder for a key it cannot find. So a wrong slug produced a page that
 * looked almost right and an OG card that 404'd for every scraper that fetched
 * it — no error, no warning, no failing test.
 *
 * Three of them were wrong, all left behind by the site this one was rebuilt
 * from: `about` fronted itself with `paris`, `cities` with `paris`, `contact`
 * with `lyon`. The about page had been rendering the missing-photograph tile as
 * its hero for the whole rebuild.
 *
 *   npx tsx scripts/check-slots.ts
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { CITIES, SERVICES } from '../src/lib/catalog';

const ROOT = process.cwd();
const PAGES = join(ROOT, 'src', 'app');

const CITY_SLUGS = new Set(CITIES.map((c) => c.slug));
const SERVICE_SLUGS = new Set(SERVICES.map((s) => s.slug));

/**
 * A module-level constant whose name says which catalogue it indexes.
 *
 * Matching on the name rather than on the value is what makes this a gate
 * rather than a spell-checker: `OG_CITY_SLUG` must be a city and nothing else,
 * so a plausible-looking string that happens not to be one still fails.
 */
const DECLARATION = /^const\s+([A-Z][A-Z0-9_]*)\s*=\s*'([a-z0-9-]+)'\s*;/gm;

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const abs = join(dir, entry);
    if (statSync(abs).isDirectory()) walk(abs, out);
    else if (entry.endsWith('.tsx') || entry.endsWith('.ts')) out.push(abs);
  }
  return out;
}

function main(): void {
  const failures: string[] = [];
  let checked = 0;

  for (const abs of walk(PAGES)) {
    const rel = relative(ROOT, abs);
    const source = readFileSync(abs, 'utf8');
    for (const match of source.matchAll(DECLARATION)) {
      const [, name, value] = match;
      const wantsCity = name.includes('CITY');
      const wantsService = name.includes('SERVICE');
      if (!wantsCity && !wantsService) continue;

      checked += 1;
      const known = wantsCity ? CITY_SLUGS : SERVICE_SLUGS;
      if (known.has(value)) continue;

      const kind = wantsCity ? 'city' : 'service';
      const line = source.slice(0, match.index).split('\n').length;
      failures.push(
        `${rel}:${line}  ${name} = '${value}'\n    → no ${kind} with that slug. ` +
          `The page will render a placeholder and publish an OG image that does not exist.`,
      );
    }
  }

  if (failures.length > 0) {
    console.error(`[check-slots] ${failures.length} page constant(s) name nothing:\n`);
    for (const f of failures) console.error(`  ${f}\n`);
    process.exit(1);
  }

  console.log(`[check-slots] clean — ${checked} page constant(s) resolve to a catalogue entry`);
}

main();
