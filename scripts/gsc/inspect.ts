/**
 * Index status of every URL in the live sitemap, via the URL Inspection API.
 *
 *   npm run gsc:inspect
 *
 * Writes `url-inspection-sitemap.csv` into today's folder under GSC_OUT_DIR
 * (the same folder `gsc:export` writes), so `gsc:compare` can diff it with
 * last week's. The live sitemap, not a local build, because that is the list
 * Google is working from.
 *
 * Env: GOOGLE_SA_JSON, GSC_SITE_URL, GSC_OUT_DIR as for `gsc:export`;
 *      GSC_SITEMAP_URL to inspect another sitemap (default <site>/sitemap.xml).
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { SITE_URL } from '../../src/lib/site';
import { ymd } from './analysis';
import { GscClient, resolveSite } from './client';
import { classifyUrl } from './weekly';

const PARALLEL = 6;

async function sitemapUrls(url: string): Promise<string[]> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url} → ${response.status}`);
  const xml = await response.text();
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
}

async function main() {
  const client = await GscClient.connect();
  const siteUrl = await resolveSite(client);
  const urls = await sitemapUrls(process.env.GSC_SITEMAP_URL ?? new URL('/sitemap.xml', SITE_URL).href);
  console.log(`[gsc] inspecting ${urls.length} sitemap URLs`);

  const cell = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const lines: string[] = new Array(urls.length);
  let next = 0;
  let failed = 0;
  async function worker() {
    while (next < urls.length) {
      const i = next++;
      const url = urls[i];
      // One retry: the API returns an occasional 500 for a single URL that succeeds a moment later.
      for (let attempt = 1; ; attempt++) {
        try {
          const r = await client.inspect(siteUrl, url);
          lines[i] = [url, classifyUrl(url), r.verdict ?? '', r.coverageState ?? '', r.lastCrawlTime ?? '', r.googleCanonical ?? ''].map(cell).join(',');
          break;
        } catch (error) {
          if (attempt < 2) {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            continue;
          }
          failed++;
          // The coverage column feeds a Markdown table in compare.md: one line, no pipes.
          const reason = (error as Error).message.replace(/\s+/g, ' ').replace(/\|/g, '/').slice(0, 120);
          lines[i] = [url, classifyUrl(url), 'ERROR', reason, '', ''].map(cell).join(',');
          break;
        }
      }
    }
  }
  await Promise.all(Array.from({ length: PARALLEL }, worker));

  const outDir = join(process.env.GSC_OUT_DIR ?? join(process.cwd(), 'seo-data', 'gsc'), ymd(new Date()));
  mkdirSync(outDir, { recursive: true });
  const file = join(outDir, 'url-inspection-sitemap.csv');
  writeFileSync(file, ['url,type,verdict,coverage,lastCrawl,googleCanonical', ...lines].join('\n') + '\n');
  console.log(`[gsc] wrote ${file}${failed ? ` (${failed} URLs failed, verdict ERROR)` : ''}`);
}

main().catch((error: Error) => {
  console.error(`[gsc] ${error.message}`);
  process.exit(1);
});
