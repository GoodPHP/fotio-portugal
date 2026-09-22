/**
 * The handful of glyphs the site draws, inline.
 *
 * Inline rather than from an icon package — `lucide-react` was dropped for
 * exactly this reason — and gathered here because the arrow alone had been
 * pasted into a dozen files, each with a slightly different stroke.
 */

export function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h9m0 0L8.5 4.5M12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="square" />
    </svg>
  );
}

/** A tick in a filled square: the checklist marker, square like everything else. */
export function CheckMark({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center bg-brand-orange-deep text-white ${className}`}
    >
      <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
        <path d="M2.5 6.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function WhatsAppIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm5.8 14.16c-.24.68-1.42 1.32-1.96 1.36-.5.05-.5.42-3.15-.66-2.66-1.08-4.31-3.83-4.44-4.01-.13-.18-1.06-1.41-1.06-2.69 0-1.27.67-1.9.91-2.16.24-.26.52-.32.7-.32.17 0 .35 0 .5.01.16.01.38-.06.59.45.24.59.81 2.04.88 2.19.07.15.12.32.02.51-.09.18-.14.3-.28.46-.14.16-.29.36-.42.48-.14.13-.28.28-.12.55.16.27.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.27.13.43.11.59-.07.16-.18.68-.79.86-1.07.18-.27.36-.22.61-.13.24.09 1.55.73 1.81.86.27.13.45.2.51.31.06.11.06.64-.18 1.32z" />
    </svg>
  );
}
