'use client';

import type { Locale } from '@/lib/locales';
import { PROMO_IDS } from '@/lib/promo';
import PromoWindow from './PromoWindow';

export const BLACK_FRIDAY_TEXT: Record<Locale, string> = {
  en: 'Black Friday: −15% on gift cards and on shoots booked for January–March 2027. For requests sent from 27 November to 30 November 2026, 23:59 (Lisbon time).',
  pt: 'Black Friday: −15% em vales-presente e em sessões marcadas para janeiro–março de 2027. Para pedidos enviados de 27 de novembro a 30 de novembro de 2026, às 23:59 (hora de Lisboa).',
};

/**
 * The Black Friday line, 27–30 Nov only. Rendered in the browser, so it is
 * never part of the static HTML and switches itself off after the 30th.
 */
export default function BlackFridayNote({ locale, placement }: { locale: Locale; placement: string }) {
  return (
    <PromoWindow window="blackFriday" promoId={PROMO_IDS.blackFriday} placement={placement}>
      <p data-promo="bf26" className="border-l-[3px] border-brand-orange-deep bg-brand-cream px-4 py-3 font-semibold text-brand-dark">
        {BLACK_FRIDAY_TEXT[locale]}
      </p>
    </PromoWindow>
  );
}
