import { test } from 'node:test';
import assert from 'node:assert/strict';
import { classifyUrl, indexChanges, indexSummary, movers, newKeys, parseCsv, totalsIn, weekWindows, type Inspection } from './weekly';

test('CSV parser reads quoted fields, escaped quotes and commas', () => {
  const rows = parseCsv('query,clicks\n"a, ""b""",3\n"c",0\n');
  assert.deepEqual(rows, [
    { query: 'a, "b"', clicks: '3' },
    { query: 'c', clicks: '0' },
  ]);
  assert.deepEqual(parseCsv('url,type\n'), []);
});

test('URL types follow the EN and PT route shapes', () => {
  const o = 'https://example.com';
  assert.equal(classifyUrl(`${o}`), 'home');
  assert.equal(classifyUrl(`${o}/pt`), 'home');
  assert.equal(classifyUrl(`${o}/services`), 'other');
  assert.equal(classifyUrl(`${o}/services/wedding`), 'service');
  assert.equal(classifyUrl(`${o}/pt/fotografo/casamento`), 'service');
  assert.equal(classifyUrl(`${o}/services/wedding/evora`), 'leaf');
  assert.equal(classifyUrl(`${o}/pt/fotografo/casamento/evora`), 'leaf');
  assert.equal(classifyUrl(`${o}/cities/evora`), 'city');
  assert.equal(classifyUrl(`${o}/pt/cidades/evora`), 'city');
  assert.equal(classifyUrl(`${o}/blog/a-guide`), 'article');
  assert.equal(classifyUrl(`${o}/pricing`), 'other');
});

const inspection = (url: string, verdict: string, type = 'leaf'): Inspection => ({
  url,
  type,
  verdict,
  coverage: verdict === 'PASS' ? 'Submitted and indexed' : 'Discovered - currently not indexed',
  lastCrawl: '',
  googleCanonical: '',
});

test('index summary counts per type and coverage state', () => {
  const s = indexSummary([inspection('/a', 'PASS'), inspection('/b', 'NEUTRAL'), inspection('/c', 'PASS', 'city')]);
  assert.equal(s.indexed, 2);
  assert.equal(s.total, 3);
  assert.deepEqual(s.byType.get('leaf'), { indexed: 1, total: 2 });
  assert.equal(s.byCoverage.get('Discovered - currently not indexed'), 1);
});

test('index changes: gained, lost, added to and removed from the sitemap', () => {
  const before = [inspection('/a', 'NEUTRAL'), inspection('/b', 'PASS'), inspection('/gone', 'PASS')];
  const after = [inspection('/a', 'PASS'), inspection('/b', 'NEUTRAL'), inspection('/new', 'PASS')];
  const c = indexChanges(before, after);
  assert.deepEqual(c.gained.map((r) => r.url), ['/a', '/new']);
  assert.deepEqual(c.lost.map((r) => r.url), ['/b']);
  assert.deepEqual(c.added.map((r) => r.url), ['/new']);
  assert.deepEqual(c.removed.map((r) => r.url), ['/gone']);
});

test('week windows are adjacent and seven days long', () => {
  assert.deepEqual(weekWindows('2026-10-15'), {
    current: { start: '2026-10-09', end: '2026-10-15' },
    previous: { start: '2026-10-02', end: '2026-10-08' },
  });
  const daily = [
    { date: '2026-10-08', clicks: 1, impressions: 10, position: 20 },
    { date: '2026-10-09', clicks: 2, impressions: 30, position: 10 },
  ];
  assert.equal(totalsIn(daily, weekWindows('2026-10-15').current).impressions, 30);
});

test('movers rank by impression change; position delta is positive when it improved', () => {
  const before = [
    { key: 'q1', clicks: 0, impressions: 10, position: 20 },
    { key: 'q2', clicks: 0, impressions: 5, position: 8 },
  ];
  const after = [
    { key: 'q1', clicks: 1, impressions: 40, position: 12 },
    { key: 'q3', clicks: 0, impressions: 7, position: 30 },
  ];
  const m = movers(before, after);
  assert.deepEqual(m.map((x) => x.key), ['q1', 'q3', 'q2']);
  assert.equal(m[0].deltaPosition, 8);
  assert.equal(m[1].deltaPosition, undefined);
  assert.deepEqual(newKeys(before, after).map((r) => r.key), ['q3']);
});
