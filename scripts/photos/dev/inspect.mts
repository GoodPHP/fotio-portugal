import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
const dir = '.cache/unsplash';
const files = readdirSync(dir);
const wanted = process.argv[2] ?? 'Coimbra';
for (const f of files) {
  const d = JSON.parse(readFileSync(join(dir, f), 'utf8'));
  if (!d.query?.includes(wanted)) continue;
  console.log(`\n== ${d.query} [${d.orderBy}] — ${d.results.length} results`);
  for (const p of d.results.slice(0, 4)) {
    console.log(
      `   likes=${String(p.likes).padStart(4)} loc=${p.location?.name ?? '-'} | ` +
      `alt="${(p.alt_description ?? '').slice(0, 60)}" | tags=${(p.tags ?? []).map((t: any) => t.title).slice(0, 5).join(',')}`,
    );
  }
}
