/**
 * Pure functions for the weekly cycle: read a saved pull back, classify
 * sitemap URLs, and compare this week's pull with last week's. No I/O, so
 * they are tested directly (`weekly.test.ts`).
 */
import { addDays, sum, type DatedRow, type Metrics, type Window } from './analysis';

/** RFC 4180 enough for the CSVs `export.ts` and `inspect.ts` write. */
export function parseCsv(text: string): Array<Record<string, string>> {
  const records: string[][] = [];
  let field = '';
  let record: string[] = [];
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        quoted = false;
      } else {
        field += c;
      }
    } else if (c === '"') {
      quoted = true;
    } else if (c === ',') {
      record.push(field);
      field = '';
    } else if (c === '\n') {
      record.push(field);
      records.push(record);
      record = [];
      field = '';
    } else if (c !== '\r') {
      field += c;
    }
  }
  if (field || record.length) {
    record.push(field);
    records.push(record);
  }
  const [header, ...rows] = records;
  if (!header) return [];
  return rows.filter((r) => r.some(Boolean)).map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ''])));
}

export type UrlType = 'home' | 'city' | 'service' | 'leaf' | 'article' | 'other';

/**
 * EN paths are unprefixed, PT paths live under /pt with their own slugs:
 * /services ↔ /pt/fotografo, /cities ↔ /pt/cidades, /blog ↔ /pt/blog.
 */
export function classifyUrl(url: string): UrlType {
  const parts = new URL(url).pathname.split('/').filter(Boolean);
  if (parts[0] === 'pt') parts.shift();
  const [section] = parts;
  if (parts.length === 0) return 'home';
  if ((section === 'services' || section === 'fotografo') && parts.length === 3) return 'leaf';
  if ((section === 'services' || section === 'fotografo') && parts.length === 2) return 'service';
  if ((section === 'cities' || section === 'cidades') && parts.length === 2) return 'city';
  if (section === 'blog' && parts.length === 2) return 'article';
  return 'other';
}

export interface Inspection {
  url: string;
  type: string;
  verdict: string;
  coverage: string;
  lastCrawl: string;
  googleCanonical: string;
}

export const isIndexed = (i: Inspection) => i.verdict === 'PASS';

/** Indexed / total per URL type, plus coverage-state counts. */
export function indexSummary(rows: Inspection[]) {
  const byType = new Map<string, { indexed: number; total: number }>();
  const byCoverage = new Map<string, number>();
  for (const r of rows) {
    const t = byType.get(r.type) ?? { indexed: 0, total: 0 };
    t.total++;
    if (isIndexed(r)) t.indexed++;
    byType.set(r.type, t);
    byCoverage.set(r.coverage, (byCoverage.get(r.coverage) ?? 0) + 1);
  }
  const indexed = rows.filter(isIndexed).length;
  return { indexed, total: rows.length, byType, byCoverage };
}

/** URLs that entered or left the index between two inspections. */
export function indexChanges(before: Inspection[], after: Inspection[]) {
  const was = new Map(before.map((r) => [r.url, r]));
  const gained: Inspection[] = [];
  const lost: Inspection[] = [];
  const added: Inspection[] = [];
  for (const r of after) {
    const prev = was.get(r.url);
    if (!prev) added.push(r);
    if (isIndexed(r) && (!prev || !isIndexed(prev))) gained.push(r);
    if (!isIndexed(r) && prev && isIndexed(prev)) lost.push(r);
  }
  const now = new Set(after.map((r) => r.url));
  const removed = before.filter((r) => !now.has(r.url));
  return { gained, lost, added, removed };
}

/** The last `days` complete days ending at `end`, and the same length before. */
export function weekWindows(end: string, days = 7): { current: Window; previous: Window } {
  const current = { start: addDays(end, -(days - 1)), end };
  return { current, previous: { start: addDays(current.start, -days), end: addDays(current.start, -1) } };
}

export function totalsIn(daily: DatedRow[], w: Window): Metrics {
  return sum(daily.filter((r) => r.date >= w.start && r.date <= w.end));
}

export interface Row {
  key: string;
  clicks: number;
  impressions: number;
  position: number;
}

export interface Move {
  key: string;
  before: Row | undefined;
  after: Row | undefined;
  deltaImpressions: number;
  /** Positive means better (moved up). Undefined when either side is missing. */
  deltaPosition: number | undefined;
}

/** Rows that changed most in impressions between two periods, largest first. */
export function movers(before: Row[], after: Row[], limit = 15): Move[] {
  const was = new Map(before.map((r) => [r.key, r]));
  const now = new Map(after.map((r) => [r.key, r]));
  const keys = new Set([...was.keys(), ...now.keys()]);
  const moves: Move[] = [];
  for (const key of keys) {
    const b = was.get(key);
    const a = now.get(key);
    const deltaImpressions = (a?.impressions ?? 0) - (b?.impressions ?? 0);
    const deltaPosition = a && b ? b.position - a.position : undefined;
    moves.push({ key, before: b, after: a, deltaImpressions, deltaPosition });
  }
  return moves
    .filter((m) => m.deltaImpressions !== 0 || (m.deltaPosition ?? 0) !== 0)
    .sort((x, y) => Math.abs(y.deltaImpressions) - Math.abs(x.deltaImpressions))
    .slice(0, limit);
}

/** Keys present now that the earlier period did not have. */
export function newKeys(before: Row[], after: Row[]): Row[] {
  const was = new Set(before.map((r) => r.key));
  return after.filter((r) => !was.has(r.key)).sort((a, b) => b.impressions - a.impressions);
}
