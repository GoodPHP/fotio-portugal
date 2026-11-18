import type { Locale } from '@/lib/locales';
import { PROMO_IDS } from '@/lib/promo';
import { formatPrice } from '@/lib/site';
import { giftCardOptions } from '@/lib/gift-card';
import PromoWindow from './PromoWindow';
import PromoLink from './PromoLink';

const COPY = {
  en: {
    eyebrow: 'Christmas 2026',
    title: 'Give a photo session in Portugal',
    body: 'A couple session, a family session or a proposal shoot. The recipient picks the place and the date later, any time within 12 months.',
    from: 'From',
    gift: 'Gift card',
    proposal: 'Christmas proposal',
  },
  pt: {
    eyebrow: 'Natal 2026',
    title: 'Ofereça uma sessão fotográfica em Portugal',
    body: 'Uma sessão de casal, uma sessão de família ou um pedido de casamento. Quem recebe escolhe o sítio e a data depois, quando quiser, dentro de 12 meses.',
    from: 'Desde',
    gift: 'Vale-presente',
    proposal: 'Pedido de casamento no Natal',
  },
} as const;

/** The home page's gift block, 20 Nov – 24 Dec, switched on in the browser. */
export default function HomeGiftBlock({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const options = giftCardOptions(locale);
  const lowest = Math.min(...options.map((o) => o.price));
  return (
    <PromoWindow window="gift" promoId={PROMO_IDS.gift} placement="home_block">
      <section aria-labelledby="gift-block-heading" data-promo-block className="mx-auto max-w-[92rem] px-6 pt-[var(--space-section)]">
        <div className="tile grid gap-6 p-7 sm:p-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <p className="eyebrow">{c.eyebrow}</p>
            <h2 id="gift-block-heading" className="font-display mt-3 text-3xl font-bold leading-[1.05] text-brand-dark sm:text-4xl">
              {c.title}
            </h2>
            <p className="measure mt-4 leading-relaxed text-brand-muted">
              {c.body} {c.from} {formatPrice(lowest, locale)}.
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:col-span-4">
            <PromoLink href="/gift-card" promoId={PROMO_IDS.gift} placement="home_block" className="btn btn-primary justify-center">
              {c.gift}
            </PromoLink>
            <PromoLink
              href="/services/christmas-proposal"
              promoId={PROMO_IDS.proposal}
              placement="home_block"
              className="btn btn-outline justify-center"
            >
              {c.proposal}
            </PromoLink>
          </div>
        </div>
      </section>
    </PromoWindow>
  );
}
