'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { Locale } from '@/lib/locales';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const LABELS = {
  dialog: { en: 'Gallery', fr: 'Galerie' },
  close: { en: 'Close', fr: 'Fermer' },
  prev: { en: 'Previous', fr: 'Précédent' },
  next: { en: 'Next', fr: 'Suivant' },
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
 * while open. Respects prefers-reduced-motion.
 */
export default function Lightbox({ images, index, onClose, onIndexChange, alt, locale }: LightboxProps) {
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

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

  const overlayMotion = reduceMotion
    ? {}
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.25 } };

  const imageMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, scale: 0.98 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.4, ease: EASE_OUT_EXPO },
      };

  const btnClass =
    'absolute z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

  return createPortal(
    <AnimatePresence>
      {index !== null && (
        <motion.div
          {...overlayMotion}
          role="dialog"
          aria-modal="true"
          aria-label={LABELS.dialog[locale]}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md sm:p-8"
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
            <X className="h-6 w-6" aria-hidden="true" />
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
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>
          )}

          <motion.div
            key={index}
            {...imageMotion}
            className="relative h-[80vh] w-[90vw]"
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
          </motion.div>

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
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
          )}

          {hasMultiple && (
            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-sm text-white/80">
              {index + 1} / {total}
            </span>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
