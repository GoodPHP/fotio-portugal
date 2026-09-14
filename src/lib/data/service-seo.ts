import type { Localized } from '../locales';
import { PEOPLE_SERVICE_SEO } from './service-seo-people';
import { WEDDING_SERVICE_SEO } from './service-seo-weddings';
import { BUSINESS_SERVICE_SEO } from './service-seo-business';
import { LIFESTYLE_SERVICE_SEO } from './service-seo-lifestyle';

/**
 * Authored SERP and long-form copy for every service, keyed by canonical slug.
 *
 * Split across four files by the kind of buyer rather than by the catalogue's
 * nine categories: a wedding and an elopement are read by the same person, and
 * a packshot and a restaurant shoot by another. Merged here so callers see one
 * lookup.
 *
 * Eighteen of the thirty-three services had no `description` at all and fell
 * back to a shared template, which put near-identical meta descriptions on
 * eighteen pages. `check-seo.ts` now fails the build if any published service
 * is missing an entry here.
 */
export interface ServiceSeo {
  /** ≤52 chars: the layout appends the brand suffix to reach the 60-char limit. */
  title: Localized;
  /** 150–160 chars. */
  description: Localized;
  /** Heading for the long-form passage that closes the page. */
  heading: Localized;
  /** The passage itself, one string per paragraph. */
  paragraphs: Localized<string[]>;
}

export const SERVICE_SEO: Record<string, ServiceSeo> = {
  ...PEOPLE_SERVICE_SEO,
  ...WEDDING_SERVICE_SEO,
  ...BUSINESS_SERVICE_SEO,
  ...LIFESTYLE_SERVICE_SEO,
};
