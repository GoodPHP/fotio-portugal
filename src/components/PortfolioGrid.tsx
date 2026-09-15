'use client';

import { useState } from 'react';
import Picture from '@/components/Picture';
import { FadeIn, Stagger, StaggerItem } from '@/components/Motion';
import Lightbox from '@/components/Lightbox';
import type { Locale } from '@/lib/locales';

interface PortfolioGridProps {
  /** Public image paths (up to 5). First one is featured (large, left). */
  images: string[];
  /** Small mono eyebrow above the title. */
  eyebrow: string;
  /** Section heading. */
  title: string;
  /** Supporting line under the title. */
  subtitle: string;
  /** Base alt text; each image gets a numbered suffix for a11y. */
  alt: string;
  /** Active locale, forwarded to the lightbox for localized controls. */
  locale: Locale;
  /**
   * Load the featured tile eagerly. Set this on pages where the grid is the
   * largest thing above the fold, so the LCP element is not lazy-loaded.
   */
  priorityFeatured?: boolean;
}

const TILE_CLASS =
  'group relative block h-full w-full cursor-zoom-in overflow-hidden border border-brand-rule transition-colors hover:border-brand-orange-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep';
const IMG_CLASS = 'object-cover transition-transform duration-500 group-hover:scale-105';

/**
 * Editorial portfolio block: one featured shot on the left and a 2×2 grid of
 * smaller shots on the right. Each tile opens a fullscreen lightbox at its
 * position. Renders nothing when there are no images.
 */
export default function PortfolioGrid({
  images,
  eyebrow,
  title,
  subtitle,
  alt,
  locale,
  priorityFeatured = false,
}: PortfolioGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const [featured, ...rest] = images;
  const thumbs = rest.slice(0, 4);

  return (
    <section aria-labelledby="portfolio-heading" className="mx-auto max-w-[92rem] px-6 py-[var(--space-section)]">
      <FadeIn className="border-b border-brand-rule pb-7">
        <p className="eyebrow">{eyebrow}</p>
        <h2
          id="portfolio-heading"
          className="font-display mt-4 font-bold leading-[1.0] text-brand-dark"
          style={{ fontSize: 'var(--text-title)' }}
        >
          {title}
        </h2>
        <p className="measure mt-4 text-base leading-relaxed text-brand-muted">{subtitle}</p>
      </FadeIn>

      {/* Four grout lines rather than four gaps: the block reads as one pane of
          tiling instead of five photographs that happen to be near each other. */}
      <Stagger className="mt-10 grid auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:grid-cols-4">
        <StaggerItem className="col-span-2 row-span-2">
          <button type="button" onClick={() => setOpenIndex(0)} className={TILE_CLASS}>
            <Picture
              slot={featured}
              alt={`${alt} — 1`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
              className={IMG_CLASS}
              fill
              priority={priorityFeatured}
            />
          </button>
        </StaggerItem>

        {thumbs.map((src, i) => (
          <StaggerItem key={src} className="col-span-1 row-span-1">
            <button type="button" onClick={() => setOpenIndex(i + 1)} className={TILE_CLASS}>
              <Picture
                slot={src}
                alt={`${alt} — ${i + 2}`}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 210px"
                className={IMG_CLASS}
                fill
              />
            </button>
          </StaggerItem>
        ))}
      </Stagger>

      <Lightbox
        images={images}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
        alt={alt}
        locale={locale}
      />
    </section>
  );
}
