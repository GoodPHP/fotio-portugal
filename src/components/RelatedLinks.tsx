import { Link } from '@/i18n/navigation';
import type { City, Service } from '@/lib/types';
import { tx, type Locale } from '@/lib/locales';
import { serviceExistsIn } from '@/lib/catalog';
import { cityHref, leafHref, serviceHref } from '@/lib/routes';
import { inPlace } from '@/lib/cta';
import { formatPrice } from '@/lib/site';

const COPY = {
  places: { en: 'Photographers by destination', pt: 'Fotógrafos por destino' },
  sessions: { en: 'Sessions', pt: 'Sessões' },
  from: { en: 'from', pt: 'desde' },
  photographersIn: { en: 'Photographers', pt: 'Fotógrafos' },
} as const;

interface RelatedLinksProps {
  locale: Locale;
  headingId: string;
  title: string;
  cities?: City[];
  services?: Service[];
  /**
   * When the page is about one place, session links go to that place's
   * session page ("Couple session in Lisbon") rather than the national one.
   */
  city?: City;
}

/**
 * The internal-linking block: from an article or an inner page to the pages
 * that sell what it talks about. Destinations link to their photographer
 * pages, sessions to their session pages with the price beside them. Nothing
 * is linked that does not exist in the reader's language.
 */
export default function RelatedLinks({ locale, headingId, title, cities = [], services = [], city }: RelatedLinksProps) {
  const offered = services.filter((s) => serviceExistsIn(s, locale));
  if (cities.length === 0 && offered.length === 0) return null;

  return (
    <nav aria-labelledby={headingId} className="border-t border-brand-rule pt-10">
      <h2 id={headingId} className="font-display text-2xl font-bold text-brand-dark">
        {title}
      </h2>
      <div className="mt-6 grid gap-8 sm:grid-cols-2">
        {offered.length > 0 && (
          <div>
            <h3 className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-brand-muted">
              {COPY.sessions[locale]}
            </h3>
            <ul className="mt-3 divide-y divide-brand-rule border-y border-brand-rule">
              {offered.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={city ? leafHref(s, city, locale) : serviceHref(s, locale)}
                    className="flex items-baseline justify-between gap-4 py-3 text-brand-dark transition-colors hover:text-brand-orange-deep"
                  >
                    <span className="font-medium">
                      {tx(s.name, locale)}
                      {city ? ` ${inPlace(city, locale)}` : ''}
                    </span>
                    <span className="shrink-0 text-sm text-brand-muted">
                      {COPY.from[locale]} {formatPrice(s.initialPrice, locale)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {cities.length > 0 && (
          <div>
            <h3 className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-brand-muted">
              {COPY.places[locale]}
            </h3>
            <ul className="mt-3 divide-y divide-brand-rule border-y border-brand-rule">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link href={cityHref(c)} className="block py-3 font-medium text-brand-dark transition-colors hover:text-brand-orange-deep">
                    {COPY.photographersIn[locale]} {inPlace(c, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
