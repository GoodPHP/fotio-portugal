/**
 * Search Console export and first-pass analysis.
 *
 *   npm run gsc:sites                  # which properties the key can read
 *   npm run gsc:export                 # pull, save raw rows, write summary.md
 *
 * Env:
 *   GOOGLE_SA_JSON   service-account key, base64 or raw JSON (required)
 *   GSC_SITE_URL     property, e.g. "sc-domain:<domain>" or
 *                    "https://www.<domain>/". Unset: the one property the
 *                    key can read whose URL names the site's host.
 *   GSC_OUT_DIR      where to write (default ./seo-data/gsc, gitignored);
 *                    each run writes a dated subfolder and never overwrites
 *                    an earlier one, so periods can be compared later.
 *
 * Raw rows are saved exactly as the API returned them, before any analysis,
 * so a later change to the analysis can be re-run against old pulls.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { GscClient, resolveSite, type SearchAnalyticsRow } from './client';
import { addDays, comparisonWindows, findOpportunities, inWindow, pctChange, sum, ymd, type Window } from './analysis';

function csv(rows: SearchAnalyticsRow[], dimensions: string[]): string {
  const cell = (v: string | number) => (typeof v === 'number' ? String(v) : `"${v.replace(/"/g, '""')}"`);
  const header = [...dimensions, 'clicks', 'impressions', 'ctr', 'position'].join(',');
  return [header, ...rows.map((r) => [...r.keys, r.clicks, r.impressions, r.ctr, r.position].map(cell).join(','))].join('\n') + '\n';
}

function fmt(m: ReturnType<typeof sum>): string {
  return `${m.clicks} clicks · ${m.impressions} impressions · CTR ${(m.ctr * 100).toFixed(2)}% · pos ${m.position.toFixed(1)}`;
}

async function main() {
  const client = await GscClient.connect();

  if (process.argv.includes('--sites')) {
    for (const s of await client.sites()) console.log(`${s.permissionLevel.padEnd(20)} ${s.siteUrl}`);
    return;
  }

  const siteUrl = await resolveSite(client);
  const today = ymd(new Date());
  const { current, previous, yearAgo } = comparisonWindows(today);
  // Search Console keeps about sixteen months.
  const history: Window = { start: addDays(current.end, -485), end: current.end };
  const last90: Window = { start: addDays(current.end, -89), end: current.end };

  const outDir = join(process.env.GSC_OUT_DIR ?? join(process.cwd(), 'seo-data', 'gsc'), today);
  mkdirSync(outDir, { recursive: true });

  const pulls: Array<{ name: string; window: Window; dimensions: string[] }> = [
    { name: 'daily', window: history, dimensions: ['date'] },
    { name: 'queries-90d', window: last90, dimensions: ['query'] },
    { name: 'pages-90d', window: last90, dimensions: ['page'] },
    { name: 'countries-90d', window: last90, dimensions: ['country'] },
    { name: 'devices-90d', window: last90, dimensions: ['device'] },
    { name: 'appearance-90d', window: last90, dimensions: ['searchAppearance'] },
    { name: 'query-page-current', window: current, dimensions: ['query', 'page'] },
    { name: 'query-page-previous', window: previous, dimensions: ['query', 'page'] },
    { name: 'pages-current', window: current, dimensions: ['page'] },
    { name: 'pages-previous', window: previous, dimensions: ['page'] },
    { name: 'pages-year-ago', window: yearAgo, dimensions: ['page'] },
  ];

  const results: Record<string, SearchAnalyticsRow[]> = {};
  for (const pull of pulls) {
    const rows = await client.searchAnalytics(siteUrl, {
      startDate: pull.window.start,
      endDate: pull.window.end,
      dimensions: pull.dimensions,
      type: 'web',
    });
    results[pull.name] = rows;
    writeFileSync(join(outDir, `${pull.name}.csv`), csv(rows, pull.dimensions));
    console.log(`[gsc] ${pull.name}: ${rows.length} rows (${pull.window.start} → ${pull.window.end})`);
  }

  writeFileSync(
    join(outDir, 'meta.json'),
    JSON.stringify({ siteUrl, collectedAt: new Date().toISOString(), windows: { current, previous, yearAgo, history, last90 }, pulls: pulls.map((p) => ({ ...p, rows: results[p.name].length })) }, null, 2),
  );

  const daily = results.daily.map((r) => ({ date: r.keys[0], clicks: r.clicks, impressions: r.impressions, position: r.position }));
  const now = sum(inWindow(daily, current));
  const before = sum(inWindow(daily, previous));
  const lastYear = sum(inWindow(daily, yearAgo));
  // A young site has no query with 50 impressions yet; lower the floor with GSC_MIN_IMPRESSIONS.
  const minImpressions = Number(process.env.GSC_MIN_IMPRESSIONS) || 50;
  const opportunities = findOpportunities(results['query-page-current'], minImpressions);

  const lines = [
    `# Search Console summary — ${siteUrl}`,
    '',
    `Collected ${new Date().toISOString()}. Search type: web. Days after ${current.end} are excluded as incomplete.`,
    `First day with data: ${daily[0]?.date ?? 'none'}.`,
    '',
    '| Period | Dates | Totals |',
    '| --- | --- | --- |',
    `| Last 28 days | ${current.start} → ${current.end} | ${fmt(now)} |`,
    `| Previous 28 days | ${previous.start} → ${previous.end} | ${fmt(before)} |`,
    `| Same 28 days last year | ${yearAgo.start} → ${yearAgo.end} | ${fmt(lastYear)} |`,
    '',
    `Clicks vs previous: ${pctChange(now.clicks, before.clicks)}; impressions vs previous: ${pctChange(now.impressions, before.impressions)}.`,
    '',
    `## Opportunities (query × page, last 28 days, ≥${minImpressions} impressions)`,
    '',
    '| Kind | Query | Impr. | Clicks | CTR | Pos. | Pages | Note |',
    '| --- | --- | --- | --- | --- | --- | --- | --- |',
    ...opportunities.slice(0, 100).map(
      (o) => `| ${o.kind} | ${o.query} | ${o.impressions} | ${o.clicks} | ${(o.ctr * 100).toFixed(1)}% | ${o.position.toFixed(1)} | ${o.pages.slice(0, 3).join('<br>')} | ${o.note} |`,
    ),
    '',
    'Row totals exclude anonymized queries, so they can sit below the Search Console chart.',
  ];
  writeFileSync(join(outDir, 'summary.md'), lines.join('\n') + '\n');
  console.log(`[gsc] wrote ${outDir}`);
}

main().catch((error: Error) => {
  console.error(`[gsc] ${error.message}`);
  process.exit(1);
});
