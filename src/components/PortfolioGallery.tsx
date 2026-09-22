'use client';

import { useMemo, useState } from 'react';
import Picture from '@/components/Picture';
import { FadeIn } from '@/components/Motion';
import Lightbox from '@/components/Lightbox';
import { track } from '@/lib/analytics';
import type { ComponentProps } from 'react';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/lib/locales';

export interface GalleryPhoto {
  src: string;
  /** Category value used by the filter chips. */
  category: string;
  /** Per-image alt text. */
  alt: string;
  /** The session this photograph illustrates, linked with its price. */
  session?: { name: string; href: ComponentProps<typeof Link>['href']; price: string };
  /**
   * The place it was taken, when it is known. Stock photographs have none,
   * and are not given one: the destination filter appears only once real,
   * tagged client work exists.
   */
  place?: { value: string; label: string };
  /** Photographer credit, shown under the image. */
  credit?: { name: string; url: string };
}

export interface GalleryCategory {
  value: string;
  label: string;
}

interface PortfolioGalleryProps {
  photos: GalleryPhoto[];
  categories: GalleryCategory[];
  locale: Locale;
  /** How many tiles to show before "Load more". */
  initialCount?: number;
  /** How many more tiles each "Load more" reveals. */
  batch?: number;
}

const UI = {
  all: { en: 'All', pt: 'Todas' },
  photos: { en: 'photos', pt: 'fotografias' },
  loadMore: { en: 'Load more photos', pt: 'Ver mais fotografias' },
  showing: { en: 'Showing', pt: 'A mostrar' },
  of: { en: 'of', pt: 'de' },
  zoom: { en: 'Open full screen', pt: 'Abrir em ecrã inteiro' },
  bySession: { en: 'By session', pt: 'Por sessão' },
  byPlace: { en: 'By destination', pt: 'Por destino' },
  anywhere: { en: 'Anywhere', pt: 'Qualquer sítio' },
  photo: { en: 'Photo', pt: 'Foto' },
} as const;

function t(key: keyof typeof UI, locale: Locale): string {
  return (UI[key] as Record<Locale, string>)[locale] ?? UI[key].en;
}

// Deterministic aspect-ratio rhythm so same-ratio source photos still read as
// a masonry wall rather than a uniform grid. Cropped via object-cover.
const ASPECTS = ['aspect-[3/4]', 'aspect-[4/5]', 'aspect-square', 'aspect-[3/2]'] as const;

const TILE_CLASS =
  'group relative block w-full cursor-zoom-in overflow-hidden border border-brand-rule bg-brand-cream transition-colors hover:border-brand-orange-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep';

export default function PortfolioGallery({
  photos,
  categories,
  locale,
  initialCount = 24,
  batch = 24,
}: PortfolioGalleryProps) {
  const [active, setActive] = useState<string>('all');
  const [place, setPlace] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const places = useMemo(() => {
    const seen = new Map<string, string>();
    for (const p of photos) if (p.place) seen.set(p.place.value, p.place.label);
    return [...seen].map(([value, label]) => ({ value, label }));
  }, [photos]);

  const filtered = useMemo(
    () =>
      photos.filter(
        (p) => (active === 'all' || p.category === active) && (place === 'all' || p.place?.value === place),
      ),
    [photos, active, place],
  );

  const visible = filtered.slice(0, visibleCount);
  const remaining = filtered.length - visible.length;

  function selectCategory(value: string) {
    setActive(value);
    setVisibleCount(initialCount);
    track('portfolio_interaction', { action: 'filter-session', value });
  }

  function selectPlace(value: string) {
    setPlace(value);
    setVisibleCount(initialCount);
    track('portfolio_interaction', { action: 'filter-destination', value });
  }

  return (
    <div>
      <FadeIn>
        <div
          role="group"
          aria-label={t('bySession', locale)}
          className="flex flex-wrap justify-center gap-2"
        >
          <FilterChip active={active === 'all'} onClick={() => selectCategory('all')}>
            {t('all', locale)}
          </FilterChip>
          {categories.map((cat) => (
            <FilterChip
              key={cat.value}
              active={active === cat.value}
              onClick={() => selectCategory(cat.value)}
            >
              {cat.label}
            </FilterChip>
          ))}
        </div>
        {places.length > 0 && (
          <div role="group" aria-label={t('byPlace', locale)} className="mt-3 flex flex-wrap justify-center gap-2">
            <FilterChip active={place === 'all'} onClick={() => selectPlace('all')}>
              {t('anywhere', locale)}
            </FilterChip>
            {places.map((p) => (
              <FilterChip key={p.value} active={place === p.value} onClick={() => selectPlace(p.value)}>
                {p.label}
              </FilterChip>
            ))}
          </div>
        )}
        <p className="font-mono mt-6 text-center text-[0.6875rem] uppercase tracking-[0.16em] text-brand-muted" aria-live="polite">
          {t('showing', locale)} {visible.length} {t('of', locale)} {filtered.length} {t('photos', locale)}
        </p>
      </FadeIn>

      <div className="mt-10 gap-3 [column-fill:_balance] columns-2 sm:columns-3 lg:columns-4">
        {visible.map((photo, i) => (
          <figure key={`${photo.src}-${i}`} className="mb-4 break-inside-avoid">
          <button
            type="button"
            onClick={() => {
              setOpenIndex(i);
              track('portfolio_interaction', { action: 'open', value: photo.src });
            }}
            aria-label={`${t('zoom', locale)} — ${photo.alt}`}
            className={TILE_CLASS}
          >
            <span className={`relative block ${ASPECTS[i % ASPECTS.length]}`}>
              <Picture
                slot={photo.src}
                alt={photo.alt}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 22vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                fill
              />
              {/* A caption bar that slides up from the bottom edge, rather than
                  a gradient poured over the lower third of the photograph. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-brand-dark px-3 py-2.5 transition-transform duration-300 group-hover:translate-y-0"
              >
                <span className="font-mono block truncate text-[0.625rem] uppercase tracking-[0.16em] text-white">
                  {photo.alt}
                </span>
              </span>
            </span>
          </button>
          {(photo.session || photo.credit) && (
            <figcaption className="mt-1.5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 text-xs">
              {photo.session && (
                <Link
                  href={photo.session.href}
                  className="font-medium text-brand-dark transition-colors hover:text-brand-orange-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep"
                  data-track="session_selected"
                  data-track-context="portfolio"
                >
                  {photo.session.name} · {photo.session.price}
                </Link>
              )}
              {photo.credit && (
                <a
                  href={photo.credit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-muted hover:text-brand-dark"
                >
                  {t('photo', locale)}: {photo.credit.name}
                </a>
              )}
            </figcaption>
          )}
          </figure>
        ))}
      </div>

      {remaining > 0 && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => c + batch)}
            className="btn btn-outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep"
          >
            {t('loadMore', locale)} ({remaining})
          </button>
        </div>
      )}

      <Lightbox
        images={filtered.map((p) => p.src)}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
        alt={t('photos', locale)}
        locale={locale}
      />
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
    /*
      Selected is styled from `aria-pressed` in globals.css, not from the
      `active` prop, so the look and the announcement cannot disagree.
    */
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="chip focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-orange-deep"
    >
      {children}
    </button>
  );
}
