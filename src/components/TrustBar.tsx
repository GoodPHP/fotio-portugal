import { tx, type Locale } from '@/lib/locales';
import { trustStats } from '@/lib/catalog';
import { DELIVERY_TYPICAL, REPLY_TIME_STAT } from '@/lib/promises';
import { SITE_NAME } from '@/lib/site';

const COPY = {
  heading: {
    en: `Why travellers choose ${SITE_NAME}`,
    pt: `Porquê reservar com a ${SITE_NAME}`,
  },
  places: { en: 'Places across Portugal', pt: 'Sítios em todo o Portugal' },
  placesNote: { en: 'Cities, coast and islands', pt: 'Cidades, costa e ilhas' },
  sessions: { en: 'Session types', pt: 'Tipos de sessão' },
  sessionsNote: { en: 'From proposals to family trips', pt: 'De pedidos de casamento a famílias' },
  deliveryNote: { en: 'Private online gallery', pt: 'Galeria privada online' },
  replyNote: { en: 'A person, on email or WhatsApp', pt: 'Uma pessoa, por e-mail ou WhatsApp' },
} as const;

/**
 * Four facts, each of them checkable.
 *
 * The counts are computed from the catalogue (`trustStats`) and the two
 * promises come from `promises.ts`, so nothing here can say more than the
 * business does. There is deliberately no rating tile: there are no reviews
 * yet, and a star count with nothing behind it is the one number on a
 * marketplace a visitor has learned to distrust.
 */
export default function TrustBar({ locale }: { locale: Locale }) {
  const stats = trustStats(locale);
  const tiles = [
    { v: String(stats.places), k: COPY.places[locale], note: COPY.placesNote[locale] },
    { v: String(stats.sessionTypes), k: COPY.sessions[locale], note: COPY.sessionsNote[locale] },
    { v: tx(DELIVERY_TYPICAL.value, locale), k: tx(DELIVERY_TYPICAL.label, locale), note: COPY.deliveryNote[locale] },
    { v: tx(REPLY_TIME_STAT.value, locale), k: tx(REPLY_TIME_STAT.label, locale), note: COPY.replyNote[locale] },
  ];

  return (
    <section aria-labelledby="trust-heading" className="mx-auto max-w-[92rem] px-6 py-[var(--space-band)]">
      <h2 id="trust-heading" className="font-display text-xl font-semibold text-brand-dark sm:text-2xl">
        {COPY.heading[locale]}
      </h2>
      <dl className="grout grout-tile mt-6 grid-cols-2 lg:grid-cols-4">
        {tiles.map((t) => (
          <div key={t.k} className="px-5 py-6 sm:px-6 sm:py-7">
            <dt className="sr-only">{t.k}</dt>
            <dd>
              <span className="font-display block text-3xl font-bold leading-none tracking-[-0.04em] text-brand-dark sm:text-[2.75rem]">
                {t.v}
              </span>
              <span className="mt-3 block font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-brand-dark">
                {t.k}
              </span>
              <span className="mt-1.5 block text-sm text-brand-muted">{t.note}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
