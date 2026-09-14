import { Link } from '@/i18n/navigation';

interface PortfolioStickyCtaProps {
  /** Localized "Book now" label. */
  bookLabel: string;
  /** Prefilled WhatsApp deep link. */
  whatsappHref: string;
  /** Accessible label for the WhatsApp button. */
  whatsappLabel: string;
}

/**
 * Booking bar pinned to the bottom-right, reachable through the gallery.
 *
 * Was a client component holding a scroll listener, React state and an
 * AnimatePresence transition, so that it could hide until the reader had
 * scrolled 600px. It now simply stays: the bar is the primary call to action
 * on a page people scroll a long way down, and hiding it for the first
 * screenful cost conversions to buy an entrance animation nobody asked for.
 *
 * What is left is two links and no JavaScript. The icon is inline rather than
 * from an icon package — one of the handful of glyphs whose inlining let
 * `lucide-react` be dropped from the dependencies entirely.
 */
export default function PortfolioStickyCta({
  bookLabel,
  whatsappHref,
  whatsappLabel,
}: PortfolioStickyCtaProps) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={whatsappLabel}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-brand-dark transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </a>
      <Link
        href="/book"
        className="rounded-chip bg-brand-dark px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-orange-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep"
      >
        {bookLabel}
      </Link>
    </div>
  );
}
