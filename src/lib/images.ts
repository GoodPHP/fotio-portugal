/**
 * Resolves local stock-image paths for cities and service categories.
 *
 * Images live under `public/images/` and are named by city slug
 * (`public/images/cities/<slug>.jpg`) and by service slug
 * (`public/images/services/<slug>.jpg`). They are fetched once via
 * `scripts/fetch-photos.py` (Unsplash); see `public/images/credits.json`
 * for attribution. Paths are derived, not stored on the catalog data.
 */
import { SITE_URL } from './site';

/** Root-relative path to the branded fallback OG image (1200×630). */
export const DEFAULT_OG_IMAGE = '/og-default.png';
export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 630;

/** Public path to a city's hero/card image. */
export function cityImage(slug: string): string {
  return `/images/cities/${slug}.jpg`;
}

/** Public path to a service's image (one image per service slug). */
export function serviceImage(slug: string): string {
  return `/images/services/${slug}.jpg`;
}

/** Turn a root-relative (or already-absolute) image path into an absolute URL. */
export function absoluteOgImage(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}
