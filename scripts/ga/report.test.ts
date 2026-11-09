import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suspectDirectSpikes, windows } from './report';

test('windows end yesterday and do not overlap', () => {
  const w = windows('2026-11-09', 7);
  assert.deepEqual(w.current, { start: '2026-11-02', end: '2026-11-08' });
  assert.deepEqual(w.previous, { start: '2026-10-26', end: '2026-11-01' });
});

test('an unengaged Direct spike is flagged, a normal day is not', () => {
  const rows = [
    { date: '2026-11-05', channel: 'Direct', sessions: 2, engaged: 1 },
    { date: '2026-11-06', channel: 'Direct', sessions: 1, engaged: 0 },
    { date: '2026-11-07', channel: 'Direct', sessions: 48, engaged: 0 },
    { date: '2026-11-07', channel: 'Organic Search', sessions: 40, engaged: 0 },
  ];
  assert.deepEqual(suspectDirectSpikes(rows).map((r) => r.date), ['2026-11-07']);
});
