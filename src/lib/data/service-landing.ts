import type { Localized } from '../locales';
import { PEOPLE_SERVICE_LANDING } from './service-landing-people';
import { MILESTONE_SERVICE_LANDING } from './service-landing-milestones';
import { WEDDING_SERVICE_LANDING } from './service-landing-weddings';
import { BUSINESS_SERVICE_LANDING } from './service-landing-business';
import { COMMERCIAL_SERVICE_LANDING } from './service-landing-commercial';
import { LIFESTYLE_SERVICE_LANDING } from './service-landing-lifestyle';

/**
 * The sections that turn a service page from a price card into a page someone
 * books from, keyed by canonical slug.
 *
 * `service-seo.ts` carries the SERP copy and the closing passage. This carries
 * what a buyer reads *before* deciding: who the session is for, what happens
 * from the first message to the gallery, how to prepare, and the questions
 * people ask before they pay. Every block is authored per service — a shared
 * template here would put the same four steps on twenty-two pages, which is
 * the thin-content pattern this site exists to avoid.
 *
 * Split by the kind of buyer, like `service-seo.ts`, and further where a file
 * would pass the size budget. Claims must agree with the catalogue figures in
 * `services.ts`; `check-seo.ts` fails the build when a published service has
 * no entry or a block is short.
 */
export interface LandingPoint {
  title: string;
  text: string;
}

export interface LandingFaq {
  question: Localized;
  answer: Localized;
}

export interface ServiceLanding {
  /** One sentence under the H1: the outcome, in the buyer's words. ≤170 chars. */
  promise: Localized;
  /** Who books this session, and why. Exactly three. */
  audience: Localized<LandingPoint[]>;
  /** From the first message to the gallery. Exactly four steps. */
  process: Localized<LandingPoint[]>;
  /** Concrete preparation advice, one line each. Four to six. */
  prepare: Localized<string[]>;
  /**
   * Questions a buyer asks before paying. Rendered after the catalogue FAQs in
   * `services.ts`, so none may repeat one of those. Four to six.
   */
  faqs: LandingFaq[];
}

// Partial: a slug with no entry is a real state (a newly added service), and the
// type makes every reader handle it rather than trusting `check-seo.ts` to run.
export const SERVICE_LANDING: Partial<Record<string, ServiceLanding>> = {
  ...PEOPLE_SERVICE_LANDING,
  ...MILESTONE_SERVICE_LANDING,
  ...WEDDING_SERVICE_LANDING,
  ...BUSINESS_SERVICE_LANDING,
  ...COMMERCIAL_SERVICE_LANDING,
  ...LIFESTYLE_SERVICE_LANDING,
};
