import { Link } from '@/i18n/navigation';
import type { City, Service } from '@/lib/types';
import { tx, type Locale } from '@/lib/locales';
import { localizedCityName } from '@/lib/catalog';
import { formatDelivery, formatDuration, formatPrice } from '@/lib/site';
import { serviceSlot } from '@/lib/images';
import { serviceHref } from '@/lib/routes';
import { trackAttrs } from '@/lib/analytics';
import Picture from './Picture';
import { ArrowIcon } from './Icons';

const LABELS = {
  from: { en: 'From', pt: 'Desde' },
  photos: { en: 'edited photos', pt: 'fotografias editadas' },
  delivery: { en: 'delivery', pt: 'entrega' },
  explore: { en: 'Explore session', pt: 'Ver a sessão' },
  popularIn: { en: 'Popular in', pt: 'Procurada em' },
} as const;

interface SessionCardProps {
  service: Service;
  locale: Locale;
  /** A short line replacing the catalogue description — the home page's pitch. */
  pitch?: string;
  /**
   * Places this session is actually offered in, from the cities' curated
   * `topServices` lists. Named on the card as examples, never invented.
   */
  places?: City[];
  /** Twice the room: a larger frame and the description shown. */
  feature?: boolean;
  /** `sizes` for the photograph. */
  sizes?: string;
}

/**
 * A session type, as something you can compare before you click.
 *
 * Price, length, photographs and turnaround are the four things a visitor
 * uses to tell one session from another, and all four come straight from the
 * catalogue. The card is not one big link: the title and the call to action
 * are links, so a screen reader hears "Couple session" and "Explore session"
 * rather than a paragraph of specifications read out as a link name.
 */
export default function SessionCard({ service, locale, pitch, places = [], feature = false, sizes }: SessionCardProps) {
  const name = tx(service.name, locale);
  const href = serviceHref(service, locale);
  const description = pitch ?? (service.description ? tx(service.description, locale) : undefined);
  const track = trackAttrs('session_selected', { service: service.slug, context: 'session-card' });

  return (
    <article className="tile group flex h-full flex-col">
      <Link href={href} tabIndex={-1} aria-hidden="true" className="block" {...track}>
        <figure className={`relative overflow-hidden ${feature ? 'aspect-[3/2]' : 'aspect-[4/3]'}`}>
          <Picture
            slot={serviceSlot(service.slug)}
            alt=""
            sizes={sizes ?? (feature ? '(max-width: 1024px) 100vw, 45vw' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw')}
            className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
            fill
          />
        </figure>
      </Link>

      <div className="flex flex-1 flex-col border-t border-brand-rule px-5 py-5 sm:px-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className={`font-display font-semibold text-brand-dark ${feature ? 'text-2xl sm:text-[1.75rem]' : 'text-xl'}`}>
            <Link
              href={href}
              className="transition-colors hover:text-brand-orange-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange-deep"
              {...track}
            >
              {name}
            </Link>
          </h3>
          <p className="shrink-0 text-right">
            <span className="block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-brand-muted">
              {LABELS.from[locale]}
            </span>
            <span className="font-display text-xl font-bold text-brand-dark">
              {formatPrice(service.initialPrice, locale)}
            </span>
          </p>
        </div>

        {description && <p className="mt-2.5 text-sm leading-relaxed text-brand-muted">{description}</p>}

        <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-brand-dark">
          {formatDuration(service.durationMinutes, locale)} · {service.editedPhotos} {LABELS.photos[locale]} ·{' '}
          {formatDelivery(service.deliveryHours, locale)} {LABELS.delivery[locale]}
        </p>

        {places.length > 0 && (
          <p className="mt-2 text-xs text-brand-muted">
            {LABELS.popularIn[locale]} {places.map((c) => localizedCityName(c, locale)).join(' · ')}
          </p>
        )}

        <div className="mt-auto pt-5">
          <Link
            href={href}
            className="link-ruled text-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange-deep"
            aria-label={`${LABELS.explore[locale]}: ${name}`}
            {...track}
          >
            {LABELS.explore[locale]}
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </article>
  );
}
