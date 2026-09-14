import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache';

/**
 * OpenNext adapter configuration for Cloudflare Workers.
 *
 * The incremental cache is the build-time one, served from Workers Static
 * Assets. It is read-only, which sounds like a loss and is not:
 *
 *   - Nothing here is fetched from anywhere. Every page is built from data in
 *     this repository, so a revalidated page renders exactly what the deployed
 *     build already contains. There is nothing for a writable cache to catch.
 *   - Nothing revalidates at all any more. Every route is `force-static` with
 *     `dynamicParams: false`, so the full published matrix is prerendered and
 *     anything outside it is a 404 rather than an on-demand render. The drip
 *     releases its next batch on the next build.
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
});
