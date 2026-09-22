'use client';

import { useEffect, useState } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import { WhatsAppIcon } from './Icons';

interface MobileCtaBarProps {
  checkLabel: string;
  whatsappLabel: string;
  whatsappHref: string;
}

/** Pages that already are the conversion, where the bar would only cover the form. */
const HIDDEN_ON = new Set(['/book', '/contact']);

/**
 * The two actions, pinned to the bottom of a phone screen.
 *
 * Most visitors arrive on a phone from a search or a social link and scroll a
 * long way; the header's button scrolls away with the first screenful. This
 * keeps both actions under the thumb on every page except the ones that are
 * themselves the form. It replaces `PortfolioStickyCta`, which floated over
 * three page types only and covered content on the rest of them.
 *
 * It steps aside while a text field has focus: on a phone the on-screen
 * keyboard pushes a fixed bar up into the middle of the form being typed in.
 * Above `md` it is not rendered at all — the sticky header carries the action.
 */
export default function MobileCtaBar({ checkLabel, whatsappLabel, whatsappHref }: MobileCtaBarProps) {
  const pathname = usePathname();
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const isField = (el: EventTarget | null) =>
      el instanceof HTMLElement && el.matches('input:not([type=checkbox]):not([type=radio]), textarea, select');
    const onFocusIn = (e: FocusEvent) => setTyping(isField(e.target));
    const onFocusOut = () => setTyping(false);
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);
    return () => {
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
    };
  }, []);

  if (HIDDEN_ON.has(pathname)) return null;

  return (
    <div
      data-mobile-cta
      className={`fixed inset-x-0 bottom-0 z-40 flex border-t border-brand-rule bg-brand-sand/95 p-3 backdrop-blur-md transition-transform duration-200 md:hidden ${
        typing ? 'translate-y-full' : ''
      }`}
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-outline mr-3 min-h-12 flex-none px-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
        data-track="whatsapp_clicked"
        data-track-context="mobile-bar"
      >
        <WhatsAppIcon className="h-5 w-5" />
        <span>{whatsappLabel}</span>
      </a>
      <Link
        href="/book"
        className="btn btn-primary min-h-12 flex-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
        data-track="cta_check_availability"
        data-track-context="mobile-bar"
      >
        {checkLabel}
      </Link>
    </div>
  );
}
