import { tx, type Locale } from '@/lib/locales';
import { GUARANTEE, INCLUDED, WEATHER } from '@/lib/promises';
import { FadeIn } from './Motion';
import { CheckMark } from './Icons';

const COPY = {
  eyebrow: { en: 'Peace of mind', pt: 'Tranquilidade' },
  title: { en: 'Book with confidence', pt: 'Reserve com confiança' },
  included: { en: 'Every session includes', pt: 'Todas as sessões incluem' },
} as const;

/**
 * The guarantee, where a visitor can see it.
 *
 * It existed before — in the Terms, in a fact box, as the last line of a
 * paragraph on the booking page — but never anywhere a person deciding
 * whether to trust a stranger with their honeymoon would read it. Every
 * sentence comes from `promises.ts`, which is worded to match the Terms; this
 * component adds no promise of its own.
 */
export default function GuaranteeBlock({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="guarantee-heading" data-surface="dark" className="bg-brand-dark py-[var(--space-section)]">
      <div className="mx-auto grid max-w-[92rem] gap-12 px-6 lg:grid-cols-12 lg:gap-16">
        <FadeIn className="lg:col-span-6">
          <p className="eyebrow">{COPY.eyebrow[locale]}</p>
          <h2
            id="guarantee-heading"
            className="font-display mt-4 font-bold leading-[1.0] text-white"
            style={{ fontSize: 'var(--text-title)' }}
          >
            {COPY.title[locale]}
          </h2>
          <div className="mt-10 space-y-8">
            {[GUARANTEE, WEATHER].map((promise) => (
              <div key={promise.title.en} className="border-l-2 border-brand-orange-deep pl-5">
                <h3 className="font-display text-2xl font-semibold text-white">{tx(promise.title, locale)}</h3>
                <p className="measure mt-2 leading-relaxed text-brand-muted">{tx(promise.body, locale)}</p>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn className="lg:col-span-6">
          <h3 className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-white">
            {COPY.included[locale]}
          </h3>
          <ul className="grout mt-5">
            {tx(INCLUDED, locale).map((item) => (
              <li key={item} className="flex items-center gap-4 px-5 py-4 text-white">
                <CheckMark />
                {item}
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
