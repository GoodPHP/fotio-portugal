/**
 * Conversion events, vendor-neutral.
 *
 * `track()` pushes onto `window.dataLayer`, the de-facto queue every tag
 * manager reads, sends the event to Google Analytics when gtag.js is on the
 * page, and dispatches a `site:track` DOM event for anything else that wants
 * to listen. Nothing in this file sets cookies.
 *
 * Server components cannot attach handlers, so they mark elements with
 * `data-track="<event>"` (and optional `data-track-*` properties) and
 * `<TrackClicks>` in the layout picks the clicks up by delegation.
 */

import { rememberedPromo } from './promo';

export const ANALYTICS_EVENTS = [
  'hero_check_availability',
  'cta_check_availability',
  'booking_started',
  'booking_step_completed',
  'booking_completed',
  'booking_failed',
  'whatsapp_clicked',
  'destination_selected',
  'session_selected',
  'pricing_viewed',
  'photographer_viewed',
  'destination_viewed',
  'portfolio_interaction',
  'faq_opened',
  'contact_submitted',
  // GA4's recommended lead event, sent once the server has accepted a request
  // from any form, beside the form's own event above.
  'generate_lead',
  // GA4-style name for a WhatsApp click, sent beside `whatsapp_clicked`.
  'whatsapp_click',
  // Seasonal promotions; see `src/lib/promo.ts`.
  'promo_view',
  'promo_click',
  'gift_card_request',
] as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[number];

export type AnalyticsProps = Record<string, string | number | boolean | undefined>;

export const TRACK_EVENT_NAME = 'site:track';

/**
 * Lead events. Each carries `promo_id` when the visit came through a promo
 * (remembered in sessionStorage by `src/lib/promo.ts`) and the caller has not
 * set one already, so no lead path can forget the attribution.
 */
const LEAD_EVENTS: ReadonlySet<string> = new Set([
  'booking_completed',
  'contact_submitted',
  'whatsapp_clicked',
  'whatsapp_click',
  'generate_lead',
  'gift_card_request',
]);

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function isAnalyticsEvent(value: string): value is AnalyticsEvent {
  return (ANALYTICS_EVENTS as readonly string[]).includes(value);
}

/**
 * gtag.js is loaded `afterInteractive`, so an event recorded on mount (a page
 * view, a banner shown) can run before `window.gtag` exists. Such events wait
 * here and are sent once it does, instead of being dropped.
 */
const pendingGtag: Array<[string, AnalyticsProps]> = [];
let gtagTimer: ReturnType<typeof setInterval> | undefined;
const GTAG_WAIT_MS = 250;
const GTAG_MAX_WAITS = 60;

function sendToGtag(event: string, props: AnalyticsProps): void {
  if (window.gtag) {
    window.gtag('event', event, props);
    return;
  }
  pendingGtag.push([event, props]);
  if (gtagTimer) return;
  let waits = 0;
  gtagTimer = setInterval(() => {
    waits += 1;
    if (!window.gtag && waits < GTAG_MAX_WAITS) return;
    clearInterval(gtagTimer);
    gtagTimer = undefined;
    const queued = pendingGtag.splice(0);
    // No gtag after the wait means analytics is off (preview, local run).
    if (window.gtag) for (const [e, p] of queued) window.gtag('event', e, p);
  }, GTAG_WAIT_MS);
}

/** Record one event. Safe to call on the server, where it does nothing. */
export function track(event: AnalyticsEvent, props: AnalyticsProps = {}): void {
  if (typeof window === 'undefined') return;
  if (LEAD_EVENTS.has(event) && props.promo_id === undefined) {
    const promoId = rememberedPromo();
    if (promoId) props = { ...props, promo_id: promoId };
  }
  const payload = { event, ...props };
  (window.dataLayer ??= []).push(payload);
  sendToGtag(event, props);
  window.dispatchEvent(new CustomEvent(TRACK_EVENT_NAME, { detail: payload }));
}

/**
 * The `data-track` attributes for an element a server component renders.
 * Keys become `data-track-<key>`; `<TrackClicks>` reads them back.
 */
export function trackAttrs(event: AnalyticsEvent, props: Record<string, string | undefined> = {}) {
  const attrs: Record<string, string> = { 'data-track': event };
  for (const [key, value] of Object.entries(props)) {
    if (value !== undefined) attrs[`data-track-${key}`] = value;
  }
  return attrs;
}
