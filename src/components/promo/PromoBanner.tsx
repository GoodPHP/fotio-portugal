'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/locales';
import { track } from '@/lib/analytics';
import { PROMO_IDS, bannerShowsOn, isWithin } from '@/lib/promo';
import PromoLink from './PromoLink';

/**
 * A thin, closable strip above the masthead, 20 Nov – 1 Jan, on the pages
 * visitors land on (`bannerShowsOn`). Rendered only in the browser, so it is
 * never in the prerendered HTML and turns itself off after its dates. Closing
 * it is remembered in localStorage.
 */

const CLOSED_KEY = 'xmas26_banner_closed';

const COPY = {
  en: {
    label: 'Christmas offer',
    text: 'Christmas & New Year proposals and gift cards — request your date',
    gift: 'Gift card',
    bf: 'Black Friday until 30 Nov, 23:59 (Lisbon): −15% on gift cards and on shoots booked for January–March 2027',
    bfCta: 'Gift card',
    close: 'Close',
  },
  pt: {
    label: 'Campanha de Natal',
    text: 'Pedidos de casamento no Natal e Ano Novo e vales-presente — peça a sua data',
    gift: 'Vale-presente',
    bf: 'Black Friday até 30 nov., 23:59 (Lisboa): −15% em vales-presente e em sessões marcadas para janeiro–março de 2027',
    bfCta: 'Vale-presente',
    close: 'Fechar',
  },
} as const;

const linkClass =
  'font-semibold text-white underline decoration-white/50 underline-offset-2 hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

export default function PromoBanner({ locale }: { locale: Locale }) {
  // Only a trigger to re-check on client navigation; the list is matched
  // against the reader's URL, because this hook can return the route key.
  const routeKey = usePathname();
  const [state, setState] = useState({ show: false, bf: false, gift: false });
  const c = COPY[locale];

  useEffect(() => {
    let closed = false;
    try {
      closed = window.localStorage.getItem(CLOSED_KEY) === '1';
    } catch {
      /* storage blocked: show the banner */
    }
    const show = !closed && isWithin('banner') && bannerShowsOn(window.location.pathname);
    const bf = isWithin('blackFriday');
    setState({ show, bf, gift: isWithin('gift') });
    if (show) track('promo_view', { promo_id: bf ? PROMO_IDS.blackFriday : PROMO_IDS.proposal, placement: 'banner' });
  }, [routeKey]);

  if (!state.show) return null;

  const close = () => {
    try {
      window.localStorage.setItem(CLOSED_KEY, '1');
    } catch {
      /* ignore: it still closes for this page */
    }
    setState((s) => ({ ...s, show: false }));
  };

  return (
    <div role="region" aria-label={c.label} data-promo-banner data-surface="dark" className="bg-brand-dark text-sm text-white">
      <div className="mx-auto flex max-w-[92rem] items-center gap-3 px-6 py-2">
        <p className="min-w-0 flex-1 leading-snug">
          {state.bf ? (
            <>
              <span data-promo="bf26">{c.bf}</span>{' '}
              <PromoLink href="/gift-card" promoId={PROMO_IDS.blackFriday} placement="banner" className={linkClass}>
                {c.bfCta}
              </PromoLink>
            </>
          ) : (
            <>
              <PromoLink href="/services/christmas-proposal" promoId={PROMO_IDS.proposal} placement="banner" className={linkClass}>
                {c.text}
              </PromoLink>
              {state.gift && (
                <>
                  <span aria-hidden="true"> · </span>
                  <PromoLink href="/gift-card" promoId={PROMO_IDS.gift} placement="banner" className={linkClass}>
                    {c.gift}
                  </PromoLink>
                </>
              )}
            </>
          )}
        </p>
        <button
          type="button"
          onClick={close}
          aria-label={c.close}
          className="-mr-2 flex h-9 w-9 shrink-0 items-center justify-center text-white/70 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
        >
          <svg aria-hidden="true" viewBox="0 0 12 12" className="h-3 w-3" fill="none">
            <path d="M1 1l10 10M11 1 1 11" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
