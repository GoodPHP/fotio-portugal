import type { City } from './types';
import { tx, type Locale, type Localized } from './locales';
import { localizedCityName } from './catalog';
import { ptAt } from './pt-grammar';

/**
 * The site's two actions, and nothing else.
 *
 * Before this there were eight labels for the same two buttons: "Book now",
 * "Check your date", "Send request", "Book your session" for the one, and
 * "Message us on WhatsApp", "Ask on WhatsApp", "Chat on WhatsApp", "Continue
 * on WhatsApp", "Open WhatsApp" for the other. A visitor who sees three names
 * for one action wonders whether they are three actions. So: the primary is
 * always "Check availability" — which is also what it honestly is, since
 * nothing is paid or booked by pressing it — and the secondary is always
 * "Chat on WhatsApp".
 */
export const CTA = {
  checkAvailability: { en: 'Check availability', pt: 'Ver disponibilidade' } as Localized,
  chatWhatsapp: { en: 'Chat on WhatsApp', pt: 'Falar no WhatsApp' } as Localized,
};

/** "in Lisbon" · "no Porto" · "nos Açores" — a place, as a location phrase. */
export function inPlace(city: City, locale: Locale): string {
  return locale === 'pt' ? ptAt(city) : `in ${localizedCityName(city, locale)}`;
}

/** "Check availability in Lisbon" · "Ver disponibilidade no Porto". */
export function checkAvailabilityIn(city: City, locale: Locale): string {
  return `${tx(CTA.checkAvailability, locale)} ${inPlace(city, locale)}`;
}
