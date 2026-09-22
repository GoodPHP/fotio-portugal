import { Link } from '@/i18n/navigation';
import type { City } from '@/lib/types';
import { tx, type Locale } from '@/lib/locales';
import { localizedCityName } from '@/lib/catalog';
import { citySlot } from '@/lib/images';
import { cityHref } from '@/lib/routes';
import { inPlace } from '@/lib/cta';
import { trackAttrs } from '@/lib/analytics';
import Picture from './Picture';
import { ArrowIcon } from './Icons';

const LABELS = {
  photographers: { en: 'Photographers', pt: 'Fotógrafos' },
  sessions: { en: 'session types', pt: 'tipos de sessão' },
} as const;

interface DestinationCardProps {
  city: City;
  locale: Locale;
  /** Session types offered here in this language; omitted when unknown. */
  sessionCount?: number;
  /** Taller frame, for the larger cells of an uneven grid. */
  tall?: boolean;
  sizes?: string;
}

/**
 * A place, as a way in.
 *
 * The whole tile is one link — there is only one thing to do with it — and
 * its accessible name is the call to action, "Photographers in Lisbon",
 * which is also the query the page it leads to is built to answer. The lede
 * is the city's own authored first line rather than a summary written for
 * the card.
 */
export default function DestinationCard({ city, locale, sessionCount, tall = false, sizes }: DestinationCardProps) {
  const name = localizedCityName(city, locale);
  const cta = `${LABELS.photographers[locale]} ${inPlace(city, locale)}`;

  return (
    <Link
      href={cityHref(city)}
      className="tile tile-link group flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange-deep"
      {...trackAttrs('destination_selected', { city: city.slug, context: 'destination-card' })}
    >
      <figure className={`relative overflow-hidden ${tall ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}>
        <Picture
          slot={citySlot(city.slug)}
          alt=""
          sizes={sizes ?? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'}
          className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
          fill
        />
      </figure>
      <div className="flex flex-1 flex-col border-t border-brand-rule px-5 py-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-xl font-semibold text-brand-dark transition-colors group-hover:text-brand-orange-deep">
            {name}
          </h3>
          <span className="shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-brand-muted">
            {tx(city.region, locale)}
          </span>
        </div>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-brand-muted">{tx(city.lede, locale)}</p>
        {sessionCount ? (
          <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-brand-dark">
            {sessionCount} {LABELS.sessions[locale]}
          </p>
        ) : null}
        <span className="link-ruled mt-auto self-start pt-4 text-sm">
          {cta}
          <ArrowIcon />
        </span>
      </div>
    </Link>
  );
}
