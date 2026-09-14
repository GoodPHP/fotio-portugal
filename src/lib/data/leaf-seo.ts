import type { Localized } from '../locales';

/**
 * Authored copy for the `service × city` combinations that carry real demand.
 *
 * There are 125 curated leaves. Writing all of them by hand is a different
 * project; writing the twenty that people actually search for is an afternoon,
 * and those twenty are where the money is — weddings where the venues are,
 * corporate work where the offices are, proposals and honeymoons where people
 * travel to. Everything else composes from the city and service data in
 * `content.ts`, which since the rewrite varies by lede, spots, permits and
 * deliverables rather than by two proper nouns.
 *
 * Keyed `${service.slug}--${city.slug}` on canonical slugs, never localized
 * ones, so a French URL change cannot orphan an entry.
 */
export interface LeafSeo {
  /** Brand included, ≤60 chars. */
  title: Localized;
  /** 150–160 chars. */
  description: Localized;
  /** Replaces the composed opening paragraph. Says why *this* pairing. */
  angle: Localized;
}

export const LEAF_SEO: Record<string, LeafSeo> = {};
