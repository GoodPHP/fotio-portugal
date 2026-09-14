/**
 * Per-service portfolio image paths.
 *
 * Portfolio galleries live under `public/images/portfolio/<service-slug>/<n>.jpg`
 * and are fetched (up to 5 per service) via `scripts/fetch-photos.py`; see
 * `public/images/credits.json` for attribution.
 *
 * The paths come from `public-images.ts`, generated at build time, rather than
 * from a directory listing. Reading the filesystem here worked only while a page
 * was prerendered: on Cloudflare Workers there is no filesystem, so any page
 * rendered on demand got an empty list and dropped its gallery without an error
 * to show for it. A service with no photographs still yields an empty list and
 * the gallery block is skipped — never a broken image.
 */
import { PORTFOLIO_IMAGES } from './data/public-images';
import { SERVICES } from './data';
import type { ServiceCategory } from './types';

const MAX_IMAGES = 5;

/**
 * Public paths to a service's portfolio images, sorted by filename, capped at 5.
 * Returns an empty array if the service has no portfolio folder yet.
 */
export function portfolioImages(serviceSlug: string): string[] {
  return [...(PORTFOLIO_IMAGES[serviceSlug] ?? [])];
}

/** A single portfolio photo tagged with the service and category it belongs to. */
export interface PortfolioPhoto {
  src: string;
  category: ServiceCategory;
  serviceSlug: string;
}

/**
 * Every available portfolio photo across all services, interleaved round-robin
 * by photo index so the unfiltered view mixes themes (one shot per service,
 * then the next from each) instead of grouping five-of-a-kind together.
 */
export function allPortfolioImages(): PortfolioPhoto[] {
  const perService = SERVICES.map((service) => ({
    category: service.category,
    serviceSlug: service.slug,
    images: portfolioImages(service.slug),
  })).filter((entry) => entry.images.length > 0);

  const photos: PortfolioPhoto[] = [];
  for (let i = 0; i < MAX_IMAGES; i += 1) {
    for (const entry of perService) {
      const src = entry.images[i];
      if (src) {
        photos.push({ src, category: entry.category, serviceSlug: entry.serviceSlug });
      }
    }
  }
  return photos;
}
