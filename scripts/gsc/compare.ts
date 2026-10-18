/**
 * Week-over-week comparison of two saved pulls.
 *
 *   npm run gsc:compare                      # the two newest folders in GSC_OUT_DIR
 *   npm run gsc:compare -- <before> <after>  # two folder names or paths
 *
 * Writes `compare.md` into the newer folder. Reads only files on disk, so it
 * needs no key and can be re-run on old pulls after the analysis changes.
 *
 * What it compares, and why:
 * - Totals for the last 7 complete days against the 7 before, from the newer
 *   pull's daily rows (the 28-day windows of two weekly pulls overlap by 21 days).
 * - Pages and queries: last 28 days against the previous 28 in the newer pull
 *   (non-overlapping), and queries that are new since the older pull.
 * - Index status of sitemap URLs, when both folders have an inspection.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { pctChange, type Metrics } from './analysis';
import { indexChanges, indexSummary, movers, newKeys, parseCsv, totalsIn, weekWindows, type Inspection, type Row } from './weekly';

const root = process.env.GSC_OUT_DIR ?? join(process.cwd(), 'seo-data', 'gsc');

function resolveDirs(): [string, string] {
  const args = process.argv.slice(2);
  const at = (d: string) => (existsSync(d) ? d : join(root, d));
  if (args.length === 2) return [at(args[0]), at(args[1])];
  const dated = readdirSync(root).filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d)).sort();
  if (dated.length < 2) throw new Error(`Need two dated pulls in ${root}, found ${dated.length}.`);
  return [join(root, dated.at(-2)!), join(root, dated.at(-1)!)];
}

function read(dir: string, name: string): Array<Record<string, string>> | undefined {
  const file = join(dir, name);
  return existsSync(file) ? parseCsv(readFileSync(file, 'utf8')) : undefined;
}

const rows = (records: Array<Record<string, string>> | undefined, key: (r: Record<string, string>) => string): Row[] =>
  (records ?? []).map((r) => ({ key: key(r), clicks: Number(r.clicks), impressions: Number(r.impressions), position: Number(r.position) }));

/** query × page rows summed per query. */
function byQuery(records: Array<Record<string, string>> | undefined): Row[] {
  const out = new Map<string, Row & { weighted: number }>();
  for (const r of rows(records, (x) => x.query)) {
    const q = out.get(r.key) ?? { key: r.key, clicks: 0, impressions: 0, position: 0, weighted: 0 };
    q.clicks += r.clicks;
    q.impressions += r.impressions;
    q.weighted += r.position * r.impressions;
    q.position = q.impressions ? q.weighted / q.impressions : 0;
    out.set(r.key, q);
  }
  return [...out.values()];
}

const fmt = (m: Metrics) => `${m.clicks} · ${m.impressions} · ${(m.ctr * 100).toFixed(2)}% · ${m.position.toFixed(1)}`;
const pos = (r: Row | undefined) => (r ? r.position.toFixed(1) : '—');
const path = (url: string) => url.replace(/^https?:\/\/[^/]+/, '') || '/';

function main() {
  const [beforeDir, afterDir] = resolveDirs();
  const meta = JSON.parse(readFileSync(join(afterDir, 'meta.json'), 'utf8'));
  const end: string = meta.windows.current.end;
  const daily = rows(read(afterDir, 'daily.csv'), (r) => r.date).map((r) => ({ ...r, date: r.key }));
  const week = weekWindows(end);
  const now = totalsIn(daily, week.current);
  const before = totalsIn(daily, week.previous);

  const lines = [
    `# Week over week — ${basename(beforeDir)} → ${basename(afterDir)}`,
    '',
    '## Totals (clicks · impressions · CTR · position)',
    '',
    '| Period | Dates | Totals |',
    '| --- | --- | --- |',
    `| Last 7 days | ${week.current.start} → ${week.current.end} | ${fmt(now)} |`,
    `| Previous 7 days | ${week.previous.start} → ${week.previous.end} | ${fmt(before)} |`,
    '',
    `Clicks ${pctChange(now.clicks, before.clicks)}, impressions ${pctChange(now.impressions, before.impressions)}, position ${before.position && now.position ? (before.position - now.position).toFixed(1) : 'n/a'} (positive = better).`,
    '',
  ];

  const pageMoves = movers(rows(read(afterDir, 'pages-previous.csv'), (r) => r.page), rows(read(afterDir, 'pages-current.csv'), (r) => r.page));
  lines.push(
    `## Pages that moved most (28 days to ${end} vs the 28 before)`,
    '',
    '| Page | Impr. before → after | Pos. before → after |',
    '| --- | --- | --- |',
    ...pageMoves.map((m) => `| ${path(m.key)} | ${m.before?.impressions ?? 0} → ${m.after?.impressions ?? 0} | ${pos(m.before)} → ${pos(m.after)} |`),
    '',
  );

  const queryMoves = movers(byQuery(read(afterDir, 'query-page-previous.csv')), byQuery(read(afterDir, 'query-page-current.csv')));
  lines.push(
    '## Queries that moved most (same windows)',
    '',
    '| Query | Impr. before → after | Pos. before → after |',
    '| --- | --- | --- |',
    ...queryMoves.map((m) => `| ${m.key} | ${m.before?.impressions ?? 0} → ${m.after?.impressions ?? 0} | ${pos(m.before)} → ${pos(m.after)} |`),
    '',
  );

  const fresh = newKeys(byQuery(read(beforeDir, 'query-page-current.csv')), byQuery(read(afterDir, 'query-page-current.csv')));
  lines.push(
    `## Queries new since ${basename(beforeDir)} (${fresh.length})`,
    '',
    '| Query | Impr. | Pos. |',
    '| --- | --- | --- |',
    ...fresh.slice(0, 25).map((r) => `| ${r.key} | ${r.impressions} | ${r.position.toFixed(1)} |`),
    '',
  );

  const inspected = (dir: string) => read(dir, 'url-inspection-sitemap.csv') as Inspection[] | undefined;
  const was = inspected(beforeDir);
  const is = inspected(afterDir);
  if (was && is) {
    const a = indexSummary(was);
    const b = indexSummary(is);
    const types = [...new Set([...a.byType.keys(), ...b.byType.keys()])].sort();
    const share = (s: { indexed: number; total: number } | undefined) => (s ? `${s.indexed}/${s.total}` : '—');
    const changes = indexChanges(was, is);
    const list = (r: Inspection[]) => r.slice(0, 20).map((x) => path(x.url)).join('<br>') || '—';
    lines.push(
      '## Index status of sitemap URLs',
      '',
      '| Type | Before | After |',
      '| --- | --- | --- |',
      `| all | ${a.indexed}/${a.total} | ${b.indexed}/${b.total} |`,
      ...types.map((t) => `| ${t} | ${share(a.byType.get(t))} | ${share(b.byType.get(t))} |`),
      '',
      '| Coverage | Before | After |',
      '| --- | --- | --- |',
      ...[...new Set([...a.byCoverage.keys(), ...b.byCoverage.keys()])].sort().map((c) => `| ${c || '(empty)'} | ${a.byCoverage.get(c) ?? 0} | ${b.byCoverage.get(c) ?? 0} |`),
      '',
      `| Change | Count | URLs (first 20) |`,
      '| --- | --- | --- |',
      `| Entered the index | ${changes.gained.length} | ${list(changes.gained)} |`,
      `| Left the index | ${changes.lost.length} | ${list(changes.lost)} |`,
      `| New in the sitemap | ${changes.added.length} | ${list(changes.added)} |`,
      `| Gone from the sitemap | ${changes.removed.length} | ${list(changes.removed)} |`,
      '',
    );
  } else {
    lines.push('## Index status', '', 'Not compared: run `npm run gsc:inspect` so both pulls have `url-inspection-sitemap.csv`.', '');
  }

  lines.push('Small numbers move a lot week to week; treat a change under ~20 impressions as noise.');
  const file = join(afterDir, 'compare.md');
  writeFileSync(file, lines.join('\n') + '\n');
  console.log(`[gsc] wrote ${file}`);
}

main();
