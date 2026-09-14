'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/lib/locales';
import { formatPrice } from '@/lib/site';
import { serviceImage } from '@/lib/images';
import { serviceHrefBySlug } from '@/lib/routes';

export interface ServiceFilterItem {
  slug: string;
  name: string;
  category: string;
  price: number;
  categoryLabel: string;
}

export interface ServiceFilterCategory {
  value: string;
  label: string;
}

interface ServiceFilterProps {
  services: ServiceFilterItem[];
  categories: ServiceFilterCategory[];
  locale: Locale;
}

const UI = {
  searchLabel: { en: 'Search a service', fr: 'Rechercher un service' },
  searchPlaceholder: { en: 'E.g. wedding, portrait…', fr: 'Ex. mariage, portrait…' },
  all: { en: 'All', fr: 'Tous' },
  from: { en: 'from', fr: 'dès' },
  empty: { en: 'No services match your search.', fr: 'Aucun service ne correspond.' },
  results: { en: 'services', fr: 'services' },
} as const;

function label(key: keyof typeof UI, locale: Locale): string {
  return (UI[key] as Record<Locale, string>)[locale] ?? UI[key].en;
}

export default function ServiceFilter({ services, categories, locale }: ServiceFilterProps) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<string>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services.filter((s) => {
      const matchesCategory = active === 'all' || s.category === active;
      const matchesQuery =
        q === '' ||
        s.name.toLowerCase().includes(q) ||
        s.categoryLabel.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [services, query, active]);

  return (
    <div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="w-full max-w-md">
          <label htmlFor="service-search" className="eyebrow mb-3 block">
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
              id="service-search"
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

      <div role="group" aria-label={label('searchLabel', locale)} className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
        <FilterChip active={active === 'all'} onClick={() => setActive('all')}>
          {label('all', locale)}
        </FilterChip>
        {categories.map((cat) => (
          <FilterChip key={cat.value} active={active === cat.value} onClick={() => setActive(cat.value)}>
            {cat.label}
          </FilterChip>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-lg text-brand-muted">{label('empty', locale)}</p>
      ) : (
        /*
          A contents page, not a card grid. Thirty-three services in uniform
          tiles is a wall with no hierarchy and a lot of scrolling; as an
          indexed list they can be scanned in one pass, and the thumbnail still
          does the job of telling you what the session looks like.
        */
        <ul className="mt-10 border-t border-brand-rule">
          {filtered.map((s, i) => (
            <li key={s.slug}>
              <Link
                href={serviceHrefBySlug(s.slug)}
                className="group grid grid-cols-[2.5rem_4.5rem_1fr_auto] items-center gap-x-4 border-b border-brand-rule py-4 transition-colors hover:bg-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep sm:grid-cols-[3rem_6rem_1fr_10rem_auto] sm:gap-x-6 sm:py-5"
              >
                <span aria-hidden="true" className="font-mono text-xs tabular-nums text-brand-muted">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="relative aspect-[4/3] overflow-hidden rounded-card-sm">
                  <Image
                    src={serviceImage(s.slug)}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-display text-lg font-semibold text-brand-dark transition-colors group-hover:text-brand-orange-deep sm:text-xl">
                    {s.name}
                  </span>
                  <span className="mt-0.5 block font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-muted sm:hidden">
                    {formatPrice(s.price, locale)}
                  </span>
                </span>
                <span className="hidden font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-muted sm:block">
                  {s.categoryLabel}
                </span>
                <span className="hidden items-baseline gap-1.5 justify-self-end whitespace-nowrap sm:flex">
                  <span className="text-sm text-brand-muted">{label('from', locale)}</span>
                  <span className="font-display text-lg font-semibold text-brand-dark">{formatPrice(s.price, locale)}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`border-b-2 pb-1 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange-deep ${
        active
          ? 'border-brand-dark font-medium text-brand-dark'
          : 'border-transparent text-brand-muted hover:border-brand-rule-strong hover:text-brand-dark'
      }`}
    >
      {children}
    </button>
  );
}
