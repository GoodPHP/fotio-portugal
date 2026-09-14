/**
 * The search-response cache, shared by the command that writes it and the
 * command that reads it.
 *
 * It lives here rather than in `search.ts` so that `select.ts` can read a
 * cached response without importing — and therefore running — the command that
 * spends API quota.
 */
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export const CACHE_DIR = join(process.cwd(), '.cache', 'unsplash');

export interface UnsplashPhoto {
  id: string;
  created_at: string;
  width: number;
  height: number;
  color: string | null;
  blur_hash: string | null;
  likes: number;
  alt_description: string | null;
  description: string | null;
  urls: { raw: string };
  links: { html: string; download_location: string };
  user: { name: string; username: string; links: { html: string } };
  location?: { name: string | null } | null;
}

export interface CachedSearch {
  query: string;
  orientation: string;
  orderBy: string;
  results: UnsplashPhoto[];
}

export function ensureCacheDir(): void {
  mkdirSync(CACHE_DIR, { recursive: true });
}

export function cacheKey(query: string, orientation: string, orderBy: string): string {
  return createHash('sha1').update(`${query}|${orientation}|${orderBy}`).digest('hex').slice(0, 16);
}

export function cachePath(query: string, orientation: string, orderBy: string): string {
  return join(CACHE_DIR, `${cacheKey(query, orientation, orderBy)}.json`);
}

/** One cached response, or null where the query was never fetched. */
export function readCached(
  query: string,
  orientation: string,
  orderBy: string,
): CachedSearch | null {
  const file = cachePath(query, orientation, orderBy);
  if (!existsSync(file)) return null;
  return JSON.parse(readFileSync(file, 'utf8')) as CachedSearch;
}
