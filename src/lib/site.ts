import { DEFAULT_LOCALE, type Locale } from './locales';

export const SITE_NAME = 'Ylala';

/** Absolute site origin without trailing slash. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.ylala.art').replace(/\/+$/, '');

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

/**
 * Format a EUR amount for display, in the reader's convention: English puts the
 * symbol first (€1,600), French puts it last with a space (1 600 €).
 *
 * Thousands are grouped. Wedding packages run to four figures and "1200" in a
 * search result reads as a typo rather than as a price.
 */
export function formatPrice(amount: number, locale: Locale = DEFAULT_LOCALE): string {
  const grouped = new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-GB').format(amount);
  return locale === 'fr' ? `${grouped} €` : `€${grouped}`;
}

/**
 * Format a session length the way a person would say it: "90 min", "10 hours",
 * "2h 30". The catalogue stores minutes, and a wedding rendered as
 * "600 minutes" is technically correct and reads as a machine wrote it.
 */
export function formatDuration(minutes: number, locale: Locale = DEFAULT_LOCALE): string {
  // "min" is the abbreviation in both languages, so there is nothing to branch on.
  if (minutes < 120) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (locale === 'fr') return rest ? `${hours} h ${rest}` : `${hours} heures`;
  return rest ? `${hours}h ${rest}min` : `${hours} hours`;
}
