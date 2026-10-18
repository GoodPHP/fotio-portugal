import { test } from 'node:test';
import assert from 'node:assert/strict';
import { comparisonWindows, findOpportunities, pctChange, sum } from './analysis';

test('windows end before the reporting lag and do not overlap', () => {
  const { current, previous, yearAgo } = comparisonWindows('2026-10-18');
  assert.deepEqual(current, { start: '2026-09-18', end: '2026-10-15' });
  assert.deepEqual(previous, { start: '2026-08-21', end: '2026-09-17' });
  assert.deepEqual(yearAgo, { start: '2025-09-19', end: '2025-10-16' });
});

test('CTR and position are recomputed from sums, position weighted by impressions', () => {
  const m = sum([
    { clicks: 10, impressions: 100, position: 2 },
    { clicks: 0, impressions: 300, position: 10 },
  ]);
  assert.equal(m.ctr, 10 / 400);
  assert.equal(m.position, (2 * 100 + 10 * 300) / 400);
});

test('opportunities: cannibalization, striking distance and low CTR', () => {
  const row = (query: string, page: string, clicks: number, impressions: number, position: number) => ({
    keys: [query, page],
    clicks,
    impressions,
    ctr: clicks / impressions,
    position,
  });
  const found = findOpportunities([
    row('q-split', '/a', 1, 100, 6),
    row('q-split', '/b', 1, 100, 7),
    row('q-top', '/a', 50, 200, 1.5),
    row('q-noise', '/a', 0, 10, 5),
  ]);
  const kinds = (q: string) => found.filter((o) => o.query === q).map((o) => o.kind).sort();
  assert.deepEqual(kinds('q-split'), ['cannibalization', 'low-ctr', 'striking-distance']);
  assert.deepEqual(kinds('q-top'), ['defend-top3']);
  assert.deepEqual(kinds('q-noise'), []);
});

test('percentage change handles a zero baseline', () => {
  assert.equal(pctChange(5, 0), 'n/a');
  assert.equal(pctChange(0, 0), '0%');
  assert.equal(pctChange(110, 100), '+10.0%');
});
