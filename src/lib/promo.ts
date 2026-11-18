/**
 * Seasonal promotions: Christmas & New Year 2026, gift cards, Black Friday.
 *
 * Every route is prerendered, so a date check at build time would freeze
 * whatever was true on the day of the last deploy. All date gates here run in
 * the browser instead: the banner, the home gift block and the Black Friday
 * text switch on and off by themselves, with no rebuild. The Black Friday
 * wording is never in the prerendered HTML, so a search result cannot show it
 * before or after the sale.
 *
 * Pure and free of catalogue imports, so client components can use it.
 */

/** Promo ids, sent to GA4 as `promo_id`. */
export const PROMO_IDS = {
  proposal: 'xmas26_proposal',
  gift: 'giftcard26',
  blackFriday: 'bf26',
} as const;

export type PromoId = (typeof PROMO_IDS)[keyof typeof PROMO_IDS];

const KNOWN_PROMO_IDS: readonly string[] = Object.values(PROMO_IDS);

export function isPromoId(value: unknown): value is PromoId {
  return typeof value === 'string' && KNOWN_PROMO_IDS.includes(value);
}

/**
 * Instants in Europe/Lisbon. Portugal is on WET (UTC+0) from late October to
 * late March, so every boundary below is written with a +00:00 offset.
 */
export const PROMO_WINDOWS = {
  /** The top banner: 20 Nov – 1 Jan. */
  banner: { start: '2026-11-20T00:00:00+00:00', end: '2027-01-01T23:59:59+00:00' },
  /** The "Gift card" link in the banner and the home gift block: 20 Nov – 24 Dec. */
  gift: { start: '2026-11-20T00:00:00+00:00', end: '2026-12-24T23:59:59+00:00' },
  /** Black Friday: 27 Nov 00:00 – 30 Nov 23:59, Lisbon time. */
  blackFriday: { start: '2026-11-27T00:00:00+00:00', end: '2026-11-30T23:59:59+00:00' },
} as const;

export type PromoWindowName = keyof typeof PROMO_WINDOWS;

export function isWithin(window: PromoWindowName, now: Date = new Date()): boolean {
  const w = PROMO_WINDOWS[window];
  const t = now.getTime();
  return t >= Date.parse(w.start) && t <= Date.parse(w.end);
}

// -------------------------------------------------------------------- banner

/**
 * Where the banner shows, as the reader's URL (not next-intl's route key).
 * Exact paths, plus prefixes for the city pages; a prefix matches only pages
 * below it, never the hub itself, and never "/" as a prefix.
 */
const BANNER_EXACT = new Set([
  '/',
  '/pt',
  '/services/proposal',
  '/pt/fotografo/pedido-de-casamento',
  '/pricing',
  '/pt/precos',
]);
const BANNER_PREFIXES = ['/cities/', '/pt/cidades/'];

export function bannerShowsOn(pathname: string): boolean {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (BANNER_EXACT.has(path)) return true;
  return BANNER_PREFIXES.some((p) => path.startsWith(p) && path.length > p.length);
}

// ------------------------------------------------------------------ occasion

/** Request-form occasions. The value is what `?occasion=` carries. */
export const OCCASIONS = ['christmas', 'gift', 'other'] as const;
export type Occasion = (typeof OCCASIONS)[number];

export const OCCASION_LABELS: Record<Occasion, { en: string; pt: string }> = {
  christmas: { en: 'Christmas / New Year proposal', pt: 'Pedido de casamento no Natal / Ano Novo' },
  gift: { en: 'Gift card', pt: 'Vale-presente' },
  other: { en: 'Other', pt: 'Outro' },
};

export const OCCASION_PROMO: Record<Occasion, PromoId | null> = {
  christmas: PROMO_IDS.proposal,
  gift: PROMO_IDS.gift,
  other: null,
};

export function parseOccasion(value: string | null | undefined): Occasion | null {
  return value && (OCCASIONS as readonly string[]).includes(value) ? (value as Occasion) : null;
}

// --------------------------------------------------------------- attribution

const STORAGE_KEY = 'promo_id';

/** Remember that this visit came through a promo, so a later lead carries `promo_id`. */
export function rememberPromo(id: PromoId): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, id);
  } catch {
    /* storage blocked: attribution is best effort */
  }
}

export function rememberedPromo(): PromoId | null {
  try {
    const value = window.sessionStorage.getItem(STORAGE_KEY);
    return isPromoId(value) ? value : null;
  } catch {
    return null;
  }
}

/** `promo_id` for a lead: the chosen occasion wins, then the remembered promo. */
export function leadPromoId(occasion?: Occasion | null): PromoId | null {
  return (occasion ? OCCASION_PROMO[occasion] : null) ?? rememberedPromo();
}

// ----------------------------------------------------------------- gift card

/**
 * What a gift card can be for. Each is a catalogue service id, so its price is
 * the one the site already publishes for that session (`src/lib/gift-card.ts`).
 */
export const GIFT_TYPES = ['couple', 'family', 'proposal'] as const;
export type GiftType = (typeof GIFT_TYPES)[number];

export function isGiftType(value: unknown): value is GiftType {
  return typeof value === 'string' && (GIFT_TYPES as readonly string[]).includes(value);
}

/** A gift card is valid for this many months from purchase. */
export const GIFT_VALIDITY_MONTHS = 12;

// ------------------------------------------------------------- holiday price

/**
 * Christmas / New Year shoots and gift cards are priced at this multiple of
 * the service's regular published starting price. Owner decision 2026-11-18.
 * Computed from the catalogue price everywhere, so the two cannot drift; the
 * regular service pages keep their normal prices. Only the resulting price is
 * shown — never a crossed-out or "was" price. The Black Friday −15% applies to
 * this holiday price.
 */
export const HOLIDAY_PRICE_FACTOR = 2;

/** The holiday price for a regular starting price, in whole euros. */
export function holidayPrice(regularPrice: number): number {
  return Math.round(regularPrice * HOLIDAY_PRICE_FACTOR);
}
