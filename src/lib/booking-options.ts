import { CITIES, localizedCityName, servicesFor } from './catalog';
import { tx, type Locale, type Localized } from './locales';

/**
 * The choices the booking flow offers, in the order it offers them.
 *
 * One module so the home widget, /book and the WhatsApp message agree on
 * what a visitor can pick. Everything is projected to plain strings here,
 * on the server: the flow is a client component and must not import the
 * catalogue, which would ship every city's prose to the browser.
 */

/** Sent in place of a slug when the visitor picks "Other". The API accepts it. */
export const OTHER = 'other';

export interface PlaceOption {
  slug: string;
  name: string;
}

export interface SessionOption {
  /** Stable service id — what `?service=` carries and the API validates. */
  slug: string;
  /** The URL slug in this language, so a localized `?service=` also prefills. */
  localSlug: string;
  name: string;
  price: number;
}

export interface BookingOptions {
  places: PlaceOption[];
  sessions: SessionOption[];
  groupSizes: { value: string; label: string }[];
}

/**
 * Where people go, most-asked first. The brief's order; places not named
 * follow in catalogue order, so a new city appears without an edit here.
 */
const PLACE_ORDER = ['lisboa', 'porto', 'sintra', 'cascais', 'algarve', 'madeira', 'acores', 'douro', 'comporta'];

/**
 * What people book, most-asked first. A service missing from a language —
 * honeymoon in Portuguese — is skipped; the rest of that language's
 * catalogue follows in catalogue order.
 */
const SESSION_ORDER = [
  'couple',
  'proposal',
  'honeymoon',
  'family',
  'vacation',
  'lifestyle-portrait',
  'portrait',
  'wedding',
  'maternity',
  'headshots',
];

const GROUP_SIZES: { value: string; label: Localized }[] = [
  { value: '1', label: { en: 'Just me', pt: 'Só eu' } },
  { value: '2', label: { en: '2 people', pt: '2 pessoas' } },
  { value: '3-4', label: { en: '3–4', pt: '3–4' } },
  { value: '5-8', label: { en: '5–8', pt: '5–8' } },
  { value: '9+', label: { en: '9 or more', pt: '9 ou mais' } },
];

function ranked<T>(items: readonly T[], key: (item: T) => string, order: readonly string[]): T[] {
  const rank = (item: T) => {
    const i = order.indexOf(key(item));
    return i === -1 ? order.length : i;
  };
  return [...items].sort((a, b) => rank(a) - rank(b));
}

export function bookingOptions(locale: Locale): BookingOptions {
  const places = ranked(CITIES, (c) => c.slug, PLACE_ORDER).map((city) => ({
    slug: city.slug,
    name: localizedCityName(city, locale),
  }));

  const sessions = ranked(servicesFor(locale), (s) => s.slug, SESSION_ORDER).map((service) => ({
    slug: service.slug,
    localSlug: service.slugs?.[locale] ?? service.slug,
    name: tx(service.name, locale),
    price: service.initialPrice,
  }));

  return {
    places,
    sessions,
    groupSizes: GROUP_SIZES.map((g) => ({ value: g.value, label: tx(g.label, locale) })),
  };
}

/** Group-size values, for the API's validation. */
export const GROUP_SIZE_VALUES = GROUP_SIZES.map((g) => g.value);

