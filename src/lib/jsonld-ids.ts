import { SITE_URL } from './site';

/**
 * Locale-independent stable @id anchors. Only `url`/`inLanguage`/text fields vary
 * across locales; identity does not — so search engines treat all locales as one
 * entity graph.
 */
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function businessId(citySlug: string): string {
  return `${SITE_URL}/#business-${citySlug}`;
}

export function serviceNodeId(serviceSlug: string, citySlug?: string): string {
  return citySlug
    ? `${SITE_URL}/#service-${serviceSlug}-${citySlug}`
    : `${SITE_URL}/#service-${serviceSlug}`;
}

export function offerId(serviceSlug: string, citySlug?: string): string {
  return citySlug
    ? `${SITE_URL}/#offer-${serviceSlug}-${citySlug}`
    : `${SITE_URL}/#offer-${serviceSlug}`;
}
