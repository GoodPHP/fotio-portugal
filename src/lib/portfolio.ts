/**
 * Per-service portfolio image slots.
 *
 * A slot is `portfolio/<service-slug>/<n>`, and `<Picture>` turns it into the
 * AVIF and WebP files rendered by `npm run photos:fetch`. Five per service.
 *
 * The list comes from the generated image manifest rather than from a directory
 * listing. Reading the filesystem here worked only while a page was
 * prerendered: on Cloudflare Workers there is no filesystem, so any page
 * rendered on demand got an empty list and dropped its gallery with no error to
 * show for it. A service with no photographs yields an empty list and the
 * gallery block is skipped — never a broken image.
 */
import { IMAGE_SLOTS } from './data/image-manifest';
import { SERVICES } from './data';
import type { ServiceCategory } from './types';

const MAX_IMAGES = 5;

/** A service's portfolio slots, in order, capped at five. */
export function portfolioImages(serviceSlug: string): string[] {
  const slots: string[] = [];
  for (let i = 1; i <= MAX_IMAGES; i += 1) {
    const slot = `portfolio/${serviceSlug}/${i}`;
    if (slot in IMAGE_SLOTS) slots.push(slot);
  }
  return slots;
}

/** A single portfolio photograph, tagged with the service it belongs to. */
export interface PortfolioPhoto {
  src: string;
  category: ServiceCategory;
  serviceSlug: string;
}

/**
 * Every available portfolio photograph, interleaved round-robin by index so the
 * unfiltered view mixes themes — one from each service, then the next — rather
 * than grouping five-of-a-kind together.
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
