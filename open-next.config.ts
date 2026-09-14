import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache';
import doQueue from '@opennextjs/cloudflare/overrides/queue/do-queue';

/**
 * OpenNext adapter configuration for Cloudflare Workers.
 *
 * The incremental cache is the build-time one, served from Workers Static
 * Assets. It is read-only, which sounds like a loss and is not:
 *
 *   - Nothing here is fetched from anywhere. Every page is built from data in
 *     this repository, so a revalidated page renders exactly what the deployed
 *     build already contains. There is nothing for a writable cache to catch.
 *   - The 45-day drip does not need it. `publishedCuratedLeafParams` prerenders
 *     only released leaves; the rest are absent from `generateStaticParams`, so
 *     with `dynamicParams: true` they render on demand and `isLeafPublished`
 *     decides at request time. A leaf goes live when its slot passes, cache or
 *     no cache.
 *
 * KV was the previous choice and it did not survive contact with reality: every
 * `opennextjs-cloudflare deploy` writes the whole cache to it — 165 entries, and
 * the command offers no way to skip that — against a free-tier ceiling of 1,000
 * writes a day. Six deploys and the account is at the cap, which is exactly what
 * happened. Static assets cost nothing per deploy and are served from the edge
 * rather than from a store the worker has to call.
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  queue: doQueue,
});
