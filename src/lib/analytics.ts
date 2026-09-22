/**
 * Conversion events, vendor-neutral.
 *
 * The site's only analytics is the Cloudflare beacon, which counts page views
 * and has no custom events. So nothing here talks to a vendor: `track()`
 * pushes onto `window.dataLayer`, the de-facto queue every tag manager reads,
 * and dispatches a `site:track` DOM event for anything else that wants to
 * listen. Wiring a real destination is then a snippet that drains the queue,
 * with no change to the components. No cookies are set by any of this.
 *
 * Server components cannot attach handlers, so they mark elements with
 * `data-track="<event>"` (and optional `data-track-*` properties) and
 * `<TrackClicks>` in the layout picks the clicks up by delegation.
 */

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
] as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[number];

export type AnalyticsProps = Record<string, string | number | boolean | undefined>;

export const TRACK_EVENT_NAME = 'site:track';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function isAnalyticsEvent(value: string): value is AnalyticsEvent {
  return (ANALYTICS_EVENTS as readonly string[]).includes(value);
}

/** Record one event. Safe to call on the server, where it does nothing. */
export function track(event: AnalyticsEvent, props: AnalyticsProps = {}): void {
  if (typeof window === 'undefined') return;
  const payload = { event, ...props };
  (window.dataLayer ??= []).push(payload);
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
