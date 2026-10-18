/**
 * Pure functions over Search Console rows: period comparison and the
 * opportunity lists the weekly cycle starts from. No I/O, so they are tested
 * directly (`analysis.test.ts`).
 */

export interface Metrics {
  clicks: number;
  impressions: number;
  /** Clicks / impressions, recomputed from the sums — never an average of CTRs. */
  ctr: number;
  /** Impression-weighted mean position. */
  position: number;
}

export interface DatedRow {
  date: string;
  clicks: number;
  impressions: number;
  position: number;
}

/** YYYY-MM-DD, in UTC. */
export function ymd(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function addDays(isoDate: string, days: number): string {
  const d = new Date(`${isoDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return ymd(d);
}

export interface Window {
  start: string;
  end: string;
}

/**
 * The comparison windows, ending `lagDays` before `today` because the most
 * recent days are still incomplete in Search Console.
 */
export function comparisonWindows(today: string, lagDays = 3, length = 28) {
  const end = addDays(today, -lagDays);
  const current: Window = { start: addDays(end, -(length - 1)), end };
  const previous: Window = { start: addDays(current.start, -length), end: addDays(current.start, -1) };
  // Same weekdays a year earlier (364 days), so weekly seasonality lines up.
  const yearAgo: Window = { start: addDays(current.start, -364), end: addDays(current.end, -364) };
  return { current, previous, yearAgo };
}

export function sum(rows: Array<{ clicks: number; impressions: number; position: number }>): Metrics {
  let clicks = 0;
  let impressions = 0;
  let weighted = 0;
  for (const r of rows) {
    clicks += r.clicks;
    impressions += r.impressions;
    weighted += r.position * r.impressions;
  }
  return {
    clicks,
    impressions,
    ctr: impressions ? clicks / impressions : 0,
    position: impressions ? weighted / impressions : 0,
  };
}

export function inWindow(rows: DatedRow[], w: Window): DatedRow[] {
  return rows.filter((r) => r.date >= w.start && r.date <= w.end);
}

export interface KeyedRow {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface Opportunity {
  kind: 'low-ctr' | 'striking-distance' | 'defend-top3' | 'cannibalization';
  query: string;
  pages: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  note: string;
}

/**
 * Expected CTR by rounded position. Deliberately conservative and only used
 * to rank snippets against each other, not as a promise of what a fix earns.
 */
const BASELINE_CTR = [0, 0.28, 0.15, 0.1, 0.07, 0.05, 0.04, 0.03, 0.025, 0.02, 0.018];

export function baselineCtr(position: number): number {
  const p = Math.max(1, Math.round(position));
  return p < BASELINE_CTR.length ? BASELINE_CTR[p] : 0.01;
}

/**
 * Opportunities from `query × page` rows of one period.
 * `minImpressions` keeps single-digit noise out of the lists.
 */
export function findOpportunities(rows: KeyedRow[], minImpressions = 50): Opportunity[] {
  const out: Opportunity[] = [];
  const byQuery = new Map<string, KeyedRow[]>();
  for (const r of rows) {
    const [query] = r.keys;
    const list = byQuery.get(query) ?? [];
    list.push(r);
    byQuery.set(query, list);
  }

  for (const [query, list] of byQuery) {
    const total = sum(list);
    if (total.impressions < minImpressions) continue;
    const pages = [...list].sort((a, b) => b.impressions - a.impressions).map((r) => r.keys[1]);
    const base = { query, pages, ...total };

    const significant = list.filter((r) => r.impressions >= total.impressions * 0.2);
    if (significant.length > 1) {
      out.push({ ...base, kind: 'cannibalization', note: `${significant.length} URLs each take ≥20% of impressions` });
    }
    if (total.position <= 3) {
      out.push({ ...base, kind: 'defend-top3', note: 'top-3 position: protect, watch for drops' });
    } else if (total.position <= 20) {
      out.push({ ...base, kind: 'striking-distance', note: 'position 4–20: content and internal links' });
    }
    if (total.position <= 10 && total.ctr < baselineCtr(total.position) * 0.5) {
      out.push({ ...base, kind: 'low-ctr', note: `CTR under half the ~${(baselineCtr(total.position) * 100).toFixed(0)}% usual at this position: snippet or intent` });
    }
  }
  return out.sort((a, b) => b.impressions - a.impressions);
}

export function pctChange(now: number, before: number): string {
  if (before === 0) return now === 0 ? '0%' : 'n/a';
  const change = ((now - before) / before) * 100;
  return `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
}
