'use client';

import { useMemo, useState } from 'react';
import Picture from '@/components/Picture';
import { FadeIn } from '@/components/Motion';
import Lightbox from '@/components/Lightbox';
import type { Locale } from '@/lib/locales';

export interface GalleryPhoto {
  src: string;
  /** Category value used by the filter chips. */
  category: string;
  /** Per-image alt text. */
  alt: string;
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
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (active === 'all' ? photos : photos.filter((p) => p.category === active)),
    [photos, active],
  );

  const visible = filtered.slice(0, visibleCount);
  const remaining = filtered.length - visible.length;

  function selectCategory(value: string) {
    setActive(value);
    setVisibleCount(initialCount);
  }

  return (
    <div>
      <FadeIn>
        <div
          role="group"
          aria-label={t('all', locale)}
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
        <p className="font-mono mt-6 text-center text-[0.6875rem] uppercase tracking-[0.16em] text-brand-muted" aria-live="polite">
          {t('showing', locale)} {visible.length} {t('of', locale)} {filtered.length} {t('photos', locale)}
        </p>
      </FadeIn>

      <div className="mt-10 gap-3 [column-fill:_balance] columns-2 sm:columns-3 lg:columns-4">
        {visible.map((photo, i) => (
          <button
            key={`${photo.src}-${i}`}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`${t('zoom', locale)} — ${photo.alt}`}
            className={`${TILE_CLASS} mb-3 break-inside-avoid`}
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
