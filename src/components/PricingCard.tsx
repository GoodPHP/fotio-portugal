import { Link } from '@/i18n/navigation';
import type { Service } from '@/lib/types';
import { tx, type Locale } from '@/lib/locales';
import { CTA } from '@/lib/cta';
import { formatDelivery, formatDuration, formatPhotoCount, formatPrice } from '@/lib/site';
import { bookHref, serviceHref } from '@/lib/routes';
import { trackAttrs } from '@/lib/analytics';
import { ArrowIcon } from './Icons';

const LABELS = {
  from: { en: 'From', pt: 'Desde' },
  session: { en: 'Session', pt: 'Sessão' },
  photos: { en: 'Edited photos', pt: 'Fotografias editadas' },
  delivery: { en: 'Delivery', pt: 'Entrega' },
  details: { en: 'Details', pt: 'Detalhes' },
} as const;

/**
 * One session's price, with what the price buys written underneath it.
 *
 * The old pricing table said "from €190" and then, further down, that the
 * final cost "depends on the type of shoot". This card says what the price
 * covers — the length, the photographs, the turnaround — so "from" has a
 * definition on the card itself rather than a disclaimer somewhere else.
 */
export default function PricingCard({ service, locale }: { service: Service; locale: Locale }) {
  const name = tx(service.name, locale);
  const rows = [
    { k: LABELS.session[locale], v: formatDuration(service.durationMinutes, locale) },
    { k: LABELS.photos[locale], v: formatPhotoCount(service) },
    { k: LABELS.delivery[locale], v: formatDelivery(service.deliveryHours, locale) },
  ];

  return (
    <article className="tile flex h-full flex-col p-6 sm:p-7">
      <h3 className="font-display text-xl font-semibold text-brand-dark">
        <Link
          href={serviceHref(service, locale)}
          className="transition-colors hover:text-brand-orange-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange-deep"
        >
          {name}
        </Link>
      </h3>
      <p className="mt-4">
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-muted">
          {LABELS.from[locale]}{' '}
        </span>
        <span className="font-display text-4xl font-bold tracking-[-0.03em] text-brand-dark">
          {formatPrice(service.initialPrice, locale)}
        </span>
      </p>
      <dl className="mt-5 border-t border-brand-rule text-sm">
        {rows.map((row) => (
          <div key={row.k} className="flex justify-between gap-4 border-b border-brand-rule py-2.5">
            <dt className="text-brand-muted">{row.k}</dt>
            <dd className="font-medium text-brand-dark">{row.v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-6">
        <Link
          href={bookHref({ service })}
          className="btn btn-primary btn-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
          {...trackAttrs('cta_check_availability', { context: 'pricing-card', service: service.slug })}
        >
          {tx(CTA.checkAvailability, locale)}
          <ArrowIcon className="h-3 w-3" />
        </Link>
        <Link
          href={serviceHref(service, locale)}
          className="link-ruled text-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange-deep"
          aria-label={`${LABELS.details[locale]}: ${name}`}
        >
          {LABELS.details[locale]}
        </Link>
      </div>
    </article>
  );
}
