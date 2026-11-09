/**
 * Weekly Google Analytics 4 export, beside the Search Console one.
 *
 *   npm run ga:export
 *
 * Writes CSVs and `summary.md` into `<GA_OUT_DIR>/<today>/`: totals for the
 * last 7 and 28 days against the period before, sessions by channel and day,
 * organic landing pages, every event, and conversion events by channel.
 *
 * Env:
 *   GOOGLE_SA_JSON   the same service account as `gsc:export`; it needs Viewer
 *                    on the GA4 property (Admin → Property access management)
 *   GA_PROPERTY_ID   numeric property id; when unset, the property whose web
 *                    stream carries GA_MEASUREMENT_ID from site.ts is used
 *   GA_OUT_DIR       default ./seo-data/ga
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { GA_MEASUREMENT_ID } from '../../src/lib/site';
import { ymd } from '../gsc/analysis';
import { accessToken, readServiceAccount } from '../gsc/client';
import { CONVERSIONS, rate, suspectDirectSpikes, windows, type DayChannel, type Window } from './report';

const SCOPE = 'https://www.googleapis.com/auth/analytics.readonly';
const ADMIN = 'https://analyticsadmin.googleapis.com/v1beta';
const DATA = 'https://analyticsdata.googleapis.com/v1beta';

type Row = Record<string, string>;

async function main() {
  const token = await accessToken(readServiceAccount(), SCOPE);
  const call = async <T>(url: string, body?: unknown): Promise<T> => {
    const response = await fetch(url, {
      method: body ? 'POST' : 'GET',
      headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!response.ok) throw new Error(`GA ${url.replace(/^https:\/\/[^/]+/, '')} → ${response.status}: ${(await response.text()).slice(0, 300)}`);
    return (await response.json()) as T;
  };

  const property = process.env.GA_PROPERTY_ID ? `properties/${process.env.GA_PROPERTY_ID}` : await findProperty(call);
  console.log(`[ga] ${property}`);

  async function report(range: Window, dimensions: string[], metrics: string[], filter?: unknown): Promise<Row[]> {
    const body = await call<{ rows?: Array<{ dimensionValues: Array<{ value: string }>; metricValues: Array<{ value: string }> }> }>(
      `${DATA}/${property}:runReport`,
      {
        dateRanges: [{ startDate: range.start, endDate: range.end }],
        dimensions: dimensions.map((name) => ({ name })),
        metrics: metrics.map((name) => ({ name })),
        dimensionFilter: filter,
        limit: 10000,
      },
    );
    return (body.rows ?? []).map((r) => {
      const row: Row = {};
      dimensions.forEach((d, i) => (row[d] = r.dimensionValues[i].value));
      metrics.forEach((m, i) => (row[m] = r.metricValues[i].value));
      return row;
    });
  }

  const today = ymd(new Date());
  const week = windows(today, 7);
  const month = windows(today, 28);
  const TOTALS = ['sessions', 'engagedSessions', 'totalUsers', 'screenPageViews'];
  const conversionFilter = { filter: { fieldName: 'eventName', inListFilter: { values: [...CONVERSIONS] } } };
  const organic = { filter: { fieldName: 'sessionDefaultChannelGroup', stringFilter: { value: 'Organic Search' } } };

  const totals = async (w: Window) => {
    const [t] = await report(w, [], TOTALS);
    const conv = await report(w, ['eventName'], ['eventCount'], conversionFilter);
    return { ...Object.fromEntries(TOTALS.map((m) => [m, Number(t?.[m] ?? 0)])), conversions: conv.reduce((s, r) => s + Number(r.eventCount), 0) };
  };
  const t = {
    week: await totals(week.current),
    weekBefore: await totals(week.previous),
    month: await totals(month.current),
    monthBefore: await totals(month.previous),
  };

  const daily = await report(month.current, ['date', 'sessionDefaultChannelGroup'], ['sessions', 'engagedSessions']);
  const channels = await report(month.current, ['sessionDefaultChannelGroup'], ['sessions', 'engagedSessions', 'eventCount']);
  const landing = await report(month.current, ['landingPage'], ['sessions', 'engagedSessions', 'screenPageViews'], organic);
  const events = await report(month.current, ['eventName'], ['eventCount']);
  const convByChannel = await report(month.current, ['eventName', 'sessionDefaultChannelGroup'], ['eventCount'], conversionFilter);
  const convByLanding = await report(month.current, ['eventName', 'landingPage'], ['eventCount'], conversionFilter);

  const outDir = join(process.env.GA_OUT_DIR ?? join(process.cwd(), 'seo-data', 'ga'), today);
  mkdirSync(outDir, { recursive: true });
  const csv = (name: string, rows: Row[]) => {
    const cols = rows.length ? Object.keys(rows[0]) : [];
    const cell = (v: string) => `"${String(v).replace(/"/g, '""')}"`;
    writeFileSync(join(outDir, name), [cols.join(','), ...rows.map((r) => cols.map((c) => cell(r[c])).join(','))].join('\n') + '\n');
  };
  csv('daily-channel.csv', daily);
  csv('channels-28d.csv', channels);
  csv('landing-organic-28d.csv', landing);
  csv('events-28d.csv', events);
  csv('conversions-by-channel-28d.csv', convByChannel);
  csv('conversions-by-landing-28d.csv', convByLanding);

  const dayRows: DayChannel[] = daily.map((r) => ({
    date: `${r.date.slice(0, 4)}-${r.date.slice(4, 6)}-${r.date.slice(6)}`,
    channel: r.sessionDefaultChannelGroup,
    sessions: Number(r.sessions),
    engaged: Number(r.engagedSessions),
  }));
  const spikes = suspectDirectSpikes(dayRows);
  const byNum = (k: string) => (a: Row, b: Row) => Number(b[k]) - Number(a[k]);
  const line = (label: string, w: Window, x: Record<string, number>) =>
    `| ${label} | ${w.start} → ${w.end} | ${x.sessions} | ${x.engagedSessions} (${rate(x.engagedSessions, x.sessions)}) | ${x.totalUsers} | ${x.conversions} |`;

  const md = [
    `# Google Analytics summary — ${property}`,
    '',
    `Collected ${new Date().toISOString()}. Conversions = ${CONVERSIONS.join(', ')}.`,
    '',
    '| Period | Dates | Sessions | Engaged | Users | Conversions |',
    '| --- | --- | --- | --- | --- | --- |',
    line('Last 7 days', week.current, t.week),
    line('Previous 7 days', week.previous, t.weekBefore),
    line('Last 28 days', month.current, t.month),
    line('Previous 28 days', month.previous, t.monthBefore),
    '',
    spikes.length
      ? `Likely bot or test traffic (unengaged Direct spikes, counted above): ${spikes.map((s) => `${s.date} ${s.sessions} sessions`).join('; ')}.`
      : 'No unengaged Direct spikes.',
    '',
    '## Channels (28 days)',
    '',
    '| Channel | Sessions | Engaged |',
    '| --- | --- | --- |',
    ...channels.sort(byNum('sessions')).map((r) => `| ${r.sessionDefaultChannelGroup} | ${r.sessions} | ${r.engagedSessions} (${rate(Number(r.engagedSessions), Number(r.sessions))}) |`),
    '',
    '## Organic landing pages (28 days)',
    '',
    '| Page | Sessions | Engaged | Views |',
    '| --- | --- | --- | --- |',
    ...landing.sort(byNum('sessions')).slice(0, 25).map((r) => `| ${r.landingPage} | ${r.sessions} | ${r.engagedSessions} | ${r.screenPageViews} |`),
    '',
    '## Conversions by channel and landing page (28 days)',
    '',
    '| Event | Channel | Count |',
    '| --- | --- | --- |',
    ...convByChannel.sort(byNum('eventCount')).map((r) => `| ${r.eventName} | ${r.sessionDefaultChannelGroup} | ${r.eventCount} |`),
    '',
    '| Event | Landing page | Count |',
    '| --- | --- | --- |',
    ...convByLanding.sort(byNum('eventCount')).slice(0, 25).map((r) => `| ${r.eventName} | ${r.landingPage} | ${r.eventCount} |`),
    '',
    '## All events (28 days)',
    '',
    '| Event | Count |',
    '| --- | --- |',
    ...events.sort(byNum('eventCount')).map((r) => `| ${r.eventName} | ${r.eventCount} |`),
    '',
  ];
  writeFileSync(join(outDir, 'summary.md'), md.join('\n'));
  console.log(`[ga] wrote ${outDir}`);
}

/** The property whose web stream carries the site's measurement id. */
async function findProperty(call: <T>(url: string) => Promise<T>): Promise<string> {
  if (!GA_MEASUREMENT_ID) throw new Error('Set GA_PROPERTY_ID: GA_MEASUREMENT_ID is empty.');
  const accounts = await call<{ accountSummaries?: Array<{ propertySummaries?: Array<{ property: string }> }> }>(
    `${ADMIN}/accountSummaries?pageSize=200`,
  );
  for (const { property } of (accounts.accountSummaries ?? []).flatMap((a) => a.propertySummaries ?? [])) {
    const streams = await call<{ dataStreams?: Array<{ webStreamData?: { measurementId?: string } }> }>(`${ADMIN}/${property}/dataStreams`);
    if (streams.dataStreams?.some((s) => s.webStreamData?.measurementId === GA_MEASUREMENT_ID)) return property;
  }
  throw new Error(`No GA4 property visible to the service account streams ${GA_MEASUREMENT_ID}. Grant it Viewer, or set GA_PROPERTY_ID.`);
}

main().catch((error: Error) => {
  console.error(`[ga] ${error.message}`);
  process.exit(1);
});
