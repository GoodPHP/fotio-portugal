/**
 * Spends Unsplash API quota, and nothing else.
 *
 *   UNSPLASH_KEY=xxx npx tsx scripts/photos/search.ts
 *
 * Separating this from selection is the central fix. The previous fetcher
 * searched, chose and downloaded in one pass, so tuning the choice either burnt
 * quota or was frozen forever by the cache — the cache froze the *search*, not
 * the *choice*. Here the search result is the cache, and `select.ts` is a pure
 * function over it that can be re-run in a second at no cost.
 *
 * Each query is asked twice, ordered by relevance and by recency. The second
 * ordering is the point: the most relevant photograph of a famous place is, by
 * construction, the one every other site already has.
 *
 * Rate limiting is handled by reading the remaining allowance from each
 * response and stopping while there is some left, rather than by sleeping and
 * hoping. A demo key allows 50 requests an hour; the cache is keyed on the
 * query, so a re-run resumes exactly where it stopped.
 */
import { existsSync, writeFileSync } from 'node:fs';
import { cachePath, ensureCacheDir } from './cache';
import { distinctQueries } from './targets';

const KEY = process.env.UNSPLASH_KEY;
if (!KEY) {
  console.error('Set UNSPLASH_KEY. A free demo key is 50 requests an hour; a');
  console.error('production key is 5,000 and needs the attribution and');
  console.error('download-trigger compliance this pipeline already implements.');
  process.exit(2);
}

ensureCacheDir();

/** Stop while there is still allowance left, so a retry is never a lockout. */
const RESERVE = 3;
const ORDERINGS = ['relevant', 'latest'] as const;

async function search(
  query: string,
  orientation: string,
  orderBy: string,
): Promise<{ status: 'cached' | 'fetched' | 'exhausted'; remaining?: number }> {
  const file = cachePath(query, orientation, orderBy);
  if (existsSync(file)) return { status: 'cached' };

  const url = new URL('https://api.unsplash.com/search/photos');
  url.searchParams.set('query', query);
  url.searchParams.set('per_page', '30');
  url.searchParams.set('orientation', orientation);
  url.searchParams.set('content_filter', 'high');
  url.searchParams.set('order_by', orderBy);

  const response = await fetch(url, {
    headers: { Authorization: `Client-ID ${KEY}`, 'Accept-Version': 'v1' },
  });

  if (response.status === 403) return { status: 'exhausted', remaining: 0 };
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} for "${query}"`);

  const remaining = Number(response.headers.get('X-Ratelimit-Remaining') ?? '0');
  const body = await response.json();
  writeFileSync(file, JSON.stringify({ query, orientation, orderBy, ...body }));
  return { status: 'fetched', remaining };
}

async function main(): Promise<void> {
  const queries = distinctQueries();
  const total = queries.length * ORDERINGS.length;
  let done = 0;
  let spent = 0;

  for (const { query, orientation } of queries) {
    for (const orderBy of ORDERINGS) {
      done += 1;
      const result = await search(query, orientation, orderBy);

      if (result.status === 'cached') continue;
      spent += 1;
      process.stdout.write(
        `  [${String(done).padStart(3)}/${total}] ${orderBy.padEnd(8)} ${query}` +
          ` — ${result.remaining} left\n`,
      );

      if (result.status === 'exhausted' || (result.remaining ?? 0) <= RESERVE) {
        console.log(
          `\n[photos:search] allowance nearly spent after ${spent} request(s).` +
            '\nEverything fetched is cached. Re-run the same command in an hour' +
            ' and it resumes from here.',
        );
        return;
      }
    }
  }

  console.log(`\n[photos:search] complete — ${total} queries cached, ${spent} spent this run.`);
}

main().catch((error) => {
  console.error('[photos:search]', error instanceof Error ? error.message : error);
  process.exit(1);
});
