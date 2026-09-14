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
              className="pointer-events-none absolute left-0 top-1/2 size-4 -translate-y-1/2 text-brand-muted"
            >
              <path d="m21 21-4.3-4.3M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              id="city-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={label('searchPlaceholder', locale)}
              className="w-full border-0 border-b border-brand-rule-strong bg-transparent py-3 pl-8 pr-4 text-base text-brand-dark outline-none transition-colors placeholder:text-brand-muted focus:border-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange-deep"
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
        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <li key={c.slug}>
              <Link
                href={cityHrefBySlug(c.slug)}
                className="group relative isolate flex h-full min-h-56 flex-col justify-end overflow-hidden rounded-card border border-brand-rule p-6 text-white transition duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/60"
              >
                <Picture
                  slot={citySlot(c.slug)}
                  alt={c.name}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="absolute inset-0 -z-10 object-cover transition-transform duration-500 group-hover:scale-105"
                  fill
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/35 to-black/10"
                />
                <span className="text-xs font-semibold uppercase tracking-widest text-white/80">
                  {c.region}
                </span>
                <h3 className="mt-1 font-display text-2xl font-semibold">{c.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-white/80">{c.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                  {label('explore', locale)}
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
