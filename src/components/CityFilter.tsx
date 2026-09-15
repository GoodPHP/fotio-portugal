'use client';

import { useMemo, useState } from 'react';
import Picture from '@/components/Picture';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/lib/locales';
import { citySlot } from '@/lib/images';
import { cityHrefBySlug } from '@/lib/routes';

export interface CityFilterItem {
  slug: string;
  name: string;
  region: string;
  blurb: string;
}

interface CityFilterProps {
  cities: CityFilterItem[];
  locale: Locale;
}

const UI = {
  searchLabel: { en: 'Search a city', pt: 'Procurar um sítio' },
  searchPlaceholder: { en: 'E.g. Lisbon, Porto…', pt: 'Ex.: Lisboa, Porto…' },
  empty: { en: 'No cities found.', pt: 'Nenhum resultado.' },
  results: { en: 'cities', pt: 'sítios' },
  explore: { en: 'Explore', pt: 'Ver' },
} as const;

function label(key: keyof typeof UI, locale: Locale): string {
  return (UI[key] as Record<Locale, string>)[locale] ?? UI[key].en;
}

export default function CityFilter({ cities, locale }: CityFilterProps) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q === '') return cities;
    return cities.filter(
      (c) => c.name.toLowerCase().includes(q) || c.region.toLowerCase().includes(q),
    );
  }, [cities, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="w-full max-w-md">
          <label htmlFor="city-search" className="eyebrow mb-3 block">
            {label('searchLabel', locale)}
          </label>
          <div className="relative">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="field-search-icon size-4"
            >
              <path d="m21 21-4.3-4.3M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
            </svg>
            <input
              id="city-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={label('searchPlaceholder', locale)}
              className="field field-search"
            />
          </div>
        </div>
        <p className="text-sm font-medium text-brand-muted" aria-live="polite">
          {filtered.length} {label('results', locale)}
        </p>
      </div>

      <h2 className="sr-only">{label('searchLabel', locale)}</h2>
      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-lg text-brand-muted">{label('empty', locale)}</p>
      ) : (
        /*
          The card used to be a photograph with a black gradient poured over it
          and white type on top. That is the one thing a site selling
          photography should not do: the scrim is there to rescue contrast, and
          it costs a third of the image to do it. The caption now sits under the
          photograph on the tile face, so the picture is seen whole and the type
          is ink on a light ground at full contrast.
        */
        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <li key={c.slug}>
              <Link
                href={cityHrefBySlug(c.slug)}
                className="tile tile-link group flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange-deep"
              >
                <span className="relative block aspect-[4/3] overflow-hidden">
                  <Picture
                    slot={citySlot(c.slug)}
                    alt={c.name}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    fill
                  />
                </span>
                <span className="flex flex-1 flex-col border-t border-brand-rule px-5 py-4">
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-brand-muted">
                    {c.region}
                  </span>
                  <h3 className="font-display mt-1.5 text-2xl font-semibold text-brand-dark transition-colors group-hover:text-brand-orange-deep">
                    {c.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-brand-muted">{c.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-orange-deep">
                    {label('explore', locale)}
                    <svg
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path d="M3 8h9m0 0L8.5 4.5M12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="square" />
                    </svg>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
