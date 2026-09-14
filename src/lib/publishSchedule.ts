import { CITIES, SERVICES } from './data';
import { CURATED_LEAVES } from './curated';

/**
 * Deterministic "drip" publishing schedule.
 *
 * Curated `service × city` leaves are assigned a fixed publish timestamp inside
 * the window `[start, start + windowDays]`, derived purely from their position
 * in the curated list. Cities, services and articles are not scheduled at all
 * and are live from the start. No database: publication is a pure function of
 * `(page identity, current time)`, evaluated server-side in the sitemap, in
 * page components (`notFound()` before the slot), and in internal-link lists.
 *
 * Config (server env, all optional):
 *   ROLLOUT_ENABLED      'true' forces gating on, 'false' forces it off.
 *                        Unset → on in production, off elsewhere (dev/preview
 *                        always show every page).
 *   ROLLOUT_START        ISO date the drip begins (default 2026-09-14, UTC).
 *                        Set this to the actual launch date. The default is
 *                        the date the Portuguese catalogue landed, so leaving
 *                        it unset on a later deploy releases a larger share on
 *                        day one than intended.
 *   ROLLOUT_WINDOW_DAYS  Days over which all pages release (default 45).
 *
 * Since every route became `force-static`, the drip releases its next batch on
 * the next build rather than on the next revalidation — so a daily scheduled
 * rebuild is what keeps it moving.
 */

const DEFAULT_START = '2026-09-14';
const DEFAULT_WINDOW_DAYS = 45;
const DAY_MS = 24 * 60 * 60 * 1000;

function resolveEnabled(): boolean {
  const flag = process.env.ROLLOUT_ENABLED;
  if (flag === 'true') return true;
  if (flag === 'false') return false;
  return process.env.NODE_ENV === 'production';
}

function resolveStartMs(): number {
  const raw = process.env.ROLLOUT_START?.trim() || DEFAULT_START;
  // Date-only ISO strings parse as UTC midnight; anchor explicitly to be safe.
  const ms = Date.parse(raw.includes('T') ? raw : `${raw}T00:00:00Z`);
  return Number.isNaN(ms) ? Date.parse(`${DEFAULT_START}T00:00:00Z`) : ms;
}

function resolveWindowMs(): number {
  const parsed = Number.parseInt(process.env.ROLLOUT_WINDOW_DAYS ?? '', 10);
  const days = Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_WINDOW_DAYS;
  return days * DAY_MS;
}

const ENABLED = resolveEnabled();
const START_MS = resolveStartMs();
const WINDOW_MS = resolveWindowMs();

function serviceKey(slug: string): string {
  return `service:${slug}`;
}
function cityKey(slug: string): string {
  return `city:${slug}`;
}
function blogKey(slug: string): string {
  return `blog:${slug}`;
}
function leafKey(serviceSlug: string, citySlug: string): string {
  return `leaf:${serviceSlug}/${citySlug}`;
}

/**
 * The pages that are dripped: the curated `service × city` leaves, and only
 * those.
 *
 * Cities, services and articles all go live at launch. They are individually
 * authored and distinct from one another, so there is nothing to stagger — a
 * site whose home page links to one city on its first day is worse than one
 * that links to twenty-two, and Google has no reason to object to either.
 *
 * The leaves are the pages worth releasing gradually. They are the numerous
 * ones, they share a shape, and a few hundred appearing at once is the pattern
 * that reads as a bulk drop rather than a site being written.
 *
 * Keys are locale-agnostic on purpose: English and French unlock together, so
 * a live page never advertises an alternate that would 404.
 */
function buildOrder(): string[] {
  const serviceSlugs = new Set(SERVICES.map((s) => s.slug));
  const citySlugs = new Set(CITIES.map((c) => c.slug));
  const order: string[] = [];
  const seen = new Set<string>();

  for (const leaf of CURATED_LEAVES) {
    if (!serviceSlugs.has(leaf.service) || !citySlugs.has(leaf.city)) continue;
    const key = leafKey(leaf.service, leaf.city);
    if (seen.has(key)) continue;
    seen.add(key);
    order.push(key);
  }
  return order;
}

const ORDER = buildOrder();

/** key → publish epoch ms, evenly distributed by index across the window. */
const SCHEDULE: ReadonlyMap<string, number> = (() => {
  const map = new Map<string, number>();
  const total = ORDER.length;
  for (let i = 0; i < total; i++) {
    const offset = total > 0 ? Math.floor((i / total) * WINDOW_MS) : 0;
    map.set(ORDER[i], START_MS + offset);
  }
  return map;
})();

function nowMs(now?: Date): number {
  return (now ?? new Date()).getTime();
}

function publishedAtKey(key: string, now?: Date): boolean {
  if (!ENABLED) return true;
  const t = SCHEDULE.get(key);
  // Unknown keys (e.g. always-live hub paths) are treated as published.
  return t === undefined ? true : t <= nowMs(now);
}

export function isServicePublished(slug: string, now?: Date): boolean {
  return publishedAtKey(serviceKey(slug), now);
}

export function isCityPublished(slug: string, now?: Date): boolean {
  return publishedAtKey(cityKey(slug), now);
}

export function isBlogPostPublished(slug: string, now?: Date): boolean {
  return publishedAtKey(blogKey(slug), now);
}

/**
 * A tailored leaf follows its scheduled slot. A non-tailored long-tail leaf
 * (not in the schedule, never in the sitemap, ISR-only) unlocks once BOTH its
 * parent service and city are published — keeping orphan pages from 404-ing
 * forever without leaking them into the drip.
 */
export function isLeafPublished(serviceSlug: string, citySlug: string, now?: Date): boolean {
  if (!ENABLED) return true;
  const t = SCHEDULE.get(leafKey(serviceSlug, citySlug));
  if (t !== undefined) return t <= nowMs(now);
  return isServicePublished(serviceSlug, now) && isCityPublished(citySlug, now);
}

/** Generic lookup for callers that already hold a schedule key. */
export function isPublishedKey(key: string, now?: Date): boolean {
  return publishedAtKey(key, now);
}

/**
 * Publish date for a scheduled key, for use as a sitemap `<lastmod>`. Capped at
 * "now" (a lastmod must never be in the future). Unknown/always-live keys fall
 * back to the rollout start (site launch).
 */
function publishDateForKey(key: string, now?: Date): Date {
  const slot = SCHEDULE.get(key) ?? START_MS;
  return new Date(Math.min(slot, nowMs(now)));
}

export function servicePublishDate(slug: string, now?: Date): Date {
  return publishDateForKey(serviceKey(slug), now);
}

export function cityPublishDate(slug: string, now?: Date): Date {
  return publishDateForKey(cityKey(slug), now);
}

export function blogPublishDate(slug: string, now?: Date): Date {
  return publishDateForKey(blogKey(slug), now);
}

export function leafPublishDate(serviceSlug: string, citySlug: string, now?: Date): Date {
  return publishDateForKey(leafKey(serviceSlug, citySlug), now);
}

/**
 * Most recent already-published slot, capped at "now" — used as `<lastmod>` for
 * always-live hub pages (home, /services, /cities, …) so they reflect the date the
 * newest dripped page they link to went live. Falls back to the rollout start.
 */
export function latestPublishDate(now?: Date): Date {
  const ceil = nowMs(now);
  let latest = START_MS;
  for (const slot of SCHEDULE.values()) {
    if (slot <= ceil && slot > latest) latest = slot;
  }
  return new Date(Math.min(latest, ceil));
}

/** Whether gating is active at all (false in dev/preview or when disabled). */
export function isRolloutEnabled(): boolean {
  return ENABLED;
}
