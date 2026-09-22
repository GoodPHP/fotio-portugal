'use client';

import { useEffect } from 'react';
import { isAnalyticsEvent, track, type AnalyticsProps } from '@/lib/analytics';

/**
 * One delegated listener for every `data-track` element on the page.
 *
 * Server components mark their links instead of becoming client components
 * to attach an onClick. Clicks on any `wa.me` link are recorded as
 * `whatsapp_clicked` even when unmarked, so no WhatsApp entry point can be
 * missed by forgetting an attribute. FAQ disclosures report `faq_opened`
 * through the `toggle` event, which does not bubble and is caught on capture.
 */
export default function TrackClicks() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as Element | null;
      const el = target?.closest?.('[data-track], a[href*="wa.me/"]');
      if (!el) return;

      const props: AnalyticsProps = { path: window.location.pathname };
      for (const { name, value } of Array.from(el.attributes)) {
        if (name.startsWith('data-track-')) props[name.slice('data-track-'.length)] = value;
      }

      const declared = el.getAttribute('data-track');
      const isWhatsApp = el instanceof HTMLAnchorElement && el.href.includes('wa.me/');
      if (declared && isAnalyticsEvent(declared)) track(declared, props);
      if (isWhatsApp && declared !== 'whatsapp_clicked') track('whatsapp_clicked', props);
    }

    function onToggle(event: Event) {
      const el = event.target;
      if (!(el instanceof HTMLDetailsElement) || !el.open || !el.classList.contains('disclosure')) return;
      const question = el.querySelector('summary')?.textContent?.trim().slice(0, 120);
      track('faq_opened', { question, path: window.location.pathname });
    }

    document.addEventListener('click', onClick);
    document.addEventListener('toggle', onToggle, true);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('toggle', onToggle, true);
    };
  }, []);

  return null;
}
