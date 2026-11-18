import { getServiceById } from './catalog';
import { tx, type Locale } from './locales';
import { formatDuration, formatPhotoCount } from './site';
import { GIFT_TYPES, holidayPrice, type GiftType } from './promo';

/**
 * The gift card's three options, projected to plain strings on the server so
 * the client form does not import the catalogue.
 *
 * The price of each is derived from the session's published "from" price
 * with `holidayPrice` (HOLIDAY_PRICE_FACTOR, owner decision 2026-11-18), so a
 * change to the catalogue price carries through.
 */
export interface GiftCardOption {
  type: GiftType;
  name: string;
  price: number;
  duration: string;
  photos: string;
}

export function giftCardOptions(locale: Locale): GiftCardOption[] {
  return GIFT_TYPES.map((type) => {
    const service = getServiceById(type);
    if (!service) throw new Error(`gift card: no service "${type}" in the catalogue`);
    return {
      type,
      name: tx(service.name, locale),
      price: holidayPrice(service.initialPrice),
      duration: formatDuration(service.durationMinutes, locale),
      photos: formatPhotoCount(service),
    };
  });
}
