/**
 * Pure helpers for the weekly Google Analytics export: date windows and the
 * figures the summary prints. No network here, so it is unit-tested.
 */
import { addDays } from '../gsc/analysis';

export interface Window {
  start: string;
  end: string;
}

/** Last `days` complete days ending yesterday, and the same length before it. */
export function windows(today: string, days: number): { current: Window; previous: Window } {
  const end = addDays(today, -1);
  const start = addDays(end, -(days - 1));
  return { current: { start, end }, previous: { start: addDays(start, -days), end: addDays(start, -1) } };
}

/** The events that mean a visitor tried to book or get in touch. */
export const CONVERSIONS = ['booking_started', 'booking_completed', 'whatsapp_clicked', 'contact_submitted'] as const;

export interface DayChannel {
  date: string;
  channel: string;
  sessions: number;
  engaged: number;
}

/**
 * Days whose Direct sessions are mostly unengaged and far above the usual
 * level: almost always a bot or a test run, not people. Reported so a spike
 * is not read as growth.
 */
export function suspectDirectSpikes(rows: DayChannel[], minSessions = 10): DayChannel[] {
  const direct = rows.filter((r) => r.channel === 'Direct');
  const sorted = direct.map((r) => r.sessions).sort((a, b) => a - b);
  const median = sorted.length ? sorted[Math.floor(sorted.length / 2)] : 0;
  return direct.filter((r) => r.sessions >= minSessions && r.sessions > 3 * Math.max(median, 1) && r.engaged / r.sessions < 0.2);
}

export const rate = (part: number, whole: number) => (whole ? `${((part / whole) * 100).toFixed(0)}%` : '—');
