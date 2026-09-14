import { DEFAULT_LOCALE, type Locale } from './locales';

/**
 * Brand, country and reader-facing formatting — all of it, in one module.
 *
 * Everything that names the business or the country it operates in is defined
 * here and imported everywhere else. That is not tidiness: this codebase was
 * built for France and is being rebuilt for Portugal, and the brand name alone
 * was previously spelled out in eighteen files, three of which (the WhatsApp
 * greetings) still said it in Italian. `scripts/check-brand.ts` enforces the
 * rule by failing the build on any occurrence outside this file.
 *
 * The locale-keyed tables below exist for the same reason. They replace
 * `if (locale === 'fr')` branches scattered through the formatters: adding or
 * swapping a language is then one row per table, and the compiler names every
 * table that still lacks it.
 */

// ---------------------------------------------------------------------- brand

/**
 * TODO_BRAND — placeholder until the Portugal brand is chosen.
 *
 * Change this one line and the whole site follows: <title> template, wordmark,
 * OG siteName, JSON-LD Organization, the WhatsApp greeting, the Telegram alert
 * subject and the legal documents.
 */
export const SITE_NAME = 'Fotio';

/** Sits under the brand in the default <title> and in OG descriptions. */
export const SITE_TAGLINE: Record<Locale, string> = {
  en: 'Professional photographers across France',
  fr: 'Photographes professionnels partout en France',
};

/** Absolute site origin without trailing slash. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.ylala.art').replace(/\/+$/, '');

/**
 * Prefix for the `<meta>` tags the language switcher reads.
 *
 * Deliberately brand-independent. It is written in `lib/seo.ts` and read in
 * `components/LocaleSwitcher.tsx`, and a mismatch between the two silently
 * sends every language switch to the home page instead of the translated page.
 * Both sides import this constant, and `seo.test.ts` asserts they agree.
 */
export const META_ALT_PREFIX = 'x-alt';

// -------------------------------------------------------------------- country

/** ISO 3166-1 alpha-2, for JSON-LD `addressCountry`. */
export const SITE_COUNTRY = 'FR';

/** ISO 4217, for every `priceCurrency` and `priceSpecification` in the graph. */
export const CURRENCY = 'EUR';

// --------------------------------------------------------------------- locale

/** BCP 47 tag for `<html lang>`. Regional, because "pt" alone reads as pt-BR. */
export const HTML_LANG: Record<Locale, string> = {
  en: 'en-GB',
  fr: 'fr-FR',
};

/** Open Graph's underscored variant of the same thing. */
export const OG_LOCALE: Record<Locale, string> = {
  en: 'en_GB',
  fr: 'fr_FR',
};

/** What `Intl` should group and punctuate numbers as. */
export const NUMBER_LOCALE: Record<Locale, string> = {
  en: 'en-GB',
  fr: 'fr-FR',
};

// -------------------------------------------------------------------- contact

/** WhatsApp business number, international format; non-digits are stripped. */
export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '33000000000').replace(/[^0-9]/g, '');

/**
 * GA4 measurement ID. Absent means no analytics script is loaded at all, which
 * is what a preview deploy and a local run should do.
 */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '';

/** Social profile URLs, configured via env. Empty entries are dropped. */
export const SOCIAL_LINKS: string[] = [
  process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  process.env.NEXT_PUBLIC_FACEBOOK_URL,
].filter((u): u is string => Boolean(u));

/** Build a WhatsApp click-to-chat deep link with a prefilled message. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ------------------------------------------------------------------ formatting

/**
 * Where the currency symbol goes, per reader.
 *
 * English puts it first and closed up (€1,600); French and Portuguese put it
 * last, after a space (1 600 €). `Intl.NumberFormat` has a currency mode that
 * would do this, but it also insists on its own idea of the symbol and of the
 * space before it, and the two conventions here are stable enough to state.
 */
const PRICE_FORMAT: Record<Locale, (grouped: string) => string> = {
  en: (grouped) => `€${grouped}`,
  fr: (grouped) => `${grouped} €`,
};

/**
 * How a session length longer than two hours is said, per reader.
 *
 * Under two hours every language on the site says "90 min", so that case is
 * handled before these are consulted.
 */
const DURATION_FORMAT: Record<Locale, (hours: number, rest: number) => string> = {
  en: (hours, rest) => (rest ? `${hours}h ${rest}min` : `${hours} hours`),
  fr: (hours, rest) => (rest ? `${hours} h ${rest}` : `${hours} heures`),
};

/**
 * Format a price for display, in the reader's convention.
 *
 * Thousands are grouped. Wedding packages run to four figures and "1200" in a
 * search result reads as a typo rather than as a price.
 */
export function formatPrice(amount: number, locale: Locale = DEFAULT_LOCALE): string {
  const grouped = new Intl.NumberFormat(NUMBER_LOCALE[locale]).format(amount);
  return PRICE_FORMAT[locale](grouped);
}

/**
 * Format a session length the way a person would say it: "90 min", "10 hours",
 * "2h 30". The catalogue stores minutes, and a wedding rendered as
 * "600 minutes" is technically correct and reads as a machine wrote it.
 */
export function formatDuration(minutes: number, locale: Locale = DEFAULT_LOCALE): string {
  // "min" is the abbreviation in every language on the site, so there is
  // nothing to branch on below two hours.
  if (minutes < 120) return `${minutes} min`;
  return DURATION_FORMAT[locale](Math.floor(minutes / 60), minutes % 60);
}
