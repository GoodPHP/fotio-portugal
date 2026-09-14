'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { Link } from '@/i18n/navigation';

interface PortfolioStickyCtaProps {
  /** Localized "Book now" label. */
  bookLabel: string;
  /** Prefilled WhatsApp deep link. */
  whatsappHref: string;
  /** Accessible label for the WhatsApp button. */
  whatsappLabel: string;
  /** Scroll offset (px) after which the bar appears. */
  threshold?: number;
}

/**
 * Scroll-aware booking bar pinned to the bottom-right. Appears once the user has
 * scrolled past the hero so the primary CTA stays reachable through the gallery.
 * Respects prefers-reduced-motion.
 */
export default function PortfolioStickyCta({
  bookLabel,
  whatsappHref,
  whatsappLabel,
  threshold = 600,
}: PortfolioStickyCtaProps) {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > threshold);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 24 },
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          {...motionProps}
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5"
        >
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={whatsappLabel}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-brand-dark transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep"
          >
            <MessageCircle className="h-6 w-6" aria-hidden="true" />
          </a>
          <Link
            href="/book"
            className="rounded-chip bg-brand-dark px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-orange-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep"
          >
            {bookLabel}
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
