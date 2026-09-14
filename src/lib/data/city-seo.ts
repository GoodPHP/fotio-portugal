import type { Localized } from '../locales';

/**
 * Per-city SERP copy.
 *
 * Kept apart from the city records for one reason: the generated alternative
 * was a single template with the name and region substituted in, which gave
 * twenty-two pages the same meta description and taught a crawler that they
 * were interchangeable. They are not — each city here is sold on the one fact
 * that actually changes how a session there is planned.
 *
 * `check-seo.ts` asserts that every published city has an entry and that both
 * strings fit the SERP limits, so a new city cannot quietly fall back to
 * boilerplate.
 */

export interface CitySeo {
  /** ≤52 chars: the layout appends the brand suffix to reach the 60-char limit. */
  title: Localized;
  /** 150–160 chars. */
  description: Localized;
}

export const CITY_SEO: Record<string, CitySeo> = {};
