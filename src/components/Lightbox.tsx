'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import type { Locale } from '@/lib/locales';

/**
 * Icons, inline.
 *
 * These three, one star on the portfolio page and one speech bubble on the
 * sticky CTA were the whole of what `lucide-react` was imported for. Inlining
 * them removed the dependency.
 */
const ICON_PROPS = {
  viewBox: '0 0 24 24',
  className: 'h-6 w-6',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const;

const CloseIcon = () => (
  <svg {...ICON_PROPS}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
const PrevIcon = () => (
  <svg {...ICON_PROPS}>
    <path d="m15 18-6-6 6-6" />
  </svg>
);
const NextIcon = () => (
  <svg {...ICON_PROPS}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const LABELS = {
  dialog: { en: 'Gallery', pt: 'PT_TODO: Gallery' },
  close: { en: 'Close', pt: 'PT_TODO: Close' },
  prev: { en: 'Previous', pt: 'PT_TODO: Previous' },
  next: { en: 'Next', pt: 'PT_TODO: Next' },
} as const;

interface LightboxProps {
  images: string[];
  /** Index of the open image, or null when closed. */
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
  /** Base alt text; each image gets a numbered suffix. */
  alt: string;
  locale: Locale;
}

/**
 * Minimalist fullscreen image lightbox: large centered photo, prev/next arrows,
 * counter and close button. Closes on Escape, backdrop click or the X button;
 * arrow keys navigate. Rendered into <body> via a portal and locks page scroll
 * while open.
 *
 * Stays a client component — keyboard handling, focus management and a portal
 * are genuinely client work — but no longer carries an animation library for
 * two fades. The open transition is a CSS keyframe; the close transition is
 * gone, because keeping it meant holding the element mounted after it was
 * logically closed, which is a lot of machinery for 250ms nobody is looking at.
 * `prefers-reduced-motion` is honoured in `globals.css`.
 */
export default function Lightbox({ images, index, onClose, onIndexChange, alt, locale }: LightboxProps) {
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const total = images.length;
  const hasMultiple = total > 1;

  useEffect(() => setMounted(true), []);

  // Keyboard navigation + body scroll lock while open.
  useEffect(() => {
    if (index === null) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
      else if (event.key === 'ArrowLeft') onIndexChange((index! - 1 + total) % total);
      else if (event.key === 'ArrowRight') onIndexChange((index! + 1) % total);
    }

    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [index, total, onClose, onIndexChange]);

  // Move focus to the close button when the lightbox opens.
  useEffect(() => {
    if (index !== null) closeRef.current?.focus();
  }, [index]);

  if (!mounted) return null;

  const btnClass =
    'absolute z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

  if (index === null) return null;

  return createPortal(
    <div
      className="lightbox-overlay fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={LABELS.dialog[locale]}
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        aria-label={LABELS.close[locale]}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className={`${btnClass} right-4 top-4`}
      >
        <CloseIcon />
      </button>

      {hasMultiple && (
        <button
          type="button"
          aria-label={LABELS.prev[locale]}
          onClick={(e) => {
            e.stopPropagation();
            onIndexChange((index - 1 + total) % total);
          }}
          className={`${btnClass} left-4 top-1/2 -translate-y-1/2`}
        >
          <PrevIcon />
        </button>
      )}

      <div
        key={index}
        className="lightbox-figure relative h-[80vh] w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[index]}
          alt={`${alt} — ${index + 1}`}
          fill
          sizes="100vw"
          quality={90}
          priority
          className="object-contain"
        />
      </div>

      {hasMultiple && (
        <button
          type="button"
          aria-label={LABELS.next[locale]}
          onClick={(e) => {
            e.stopPropagation();
            onIndexChange((index + 1) % total);
          }}
          className={`${btnClass} right-4 top-1/2 -translate-y-1/2`}
        >
          <NextIcon />
        </button>
      )}

      {hasMultiple && (
        <span className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-sm text-white/80">
          {index + 1} / {total}
        </span>
      )}
    </div>,
    document.body,
  );
}
