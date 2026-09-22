import { NextResponse } from 'next/server';
import { getCity, getServiceByAnySlug } from '@/lib/catalog';
import { LeadSchema, OTHER } from '@/lib/lead-schema';
import { SITE_NAME } from '@/lib/site';
import { sendTelegramAlert } from '@/lib/telegram';

export const runtime = 'nodejs';

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot filled -> silently accept without notifying (don't tip off bots).
  if (data.honeypot && data.honeypot.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const city = data.citySlug ? getCity(data.citySlug) : undefined;
  const service = data.serviceSlug ? getServiceByAnySlug(data.serviceSlug) : undefined;
  const cityName = city?.name ?? (data.citySlug === OTHER ? 'Other (see notes)' : '—');
  const serviceName = service?.name.en ?? (data.serviceSlug === OTHER ? 'Other (see notes)' : '—');

  const addonList: string[] = [];
  if (data.addons?.express) addonList.push('Express 24h delivery');
  if (data.addons?.secondPhotographer) addonList.push('Second photographer');

  const prefs = data.preferences ?? {};
  const prefLines: Array<[string, string | undefined]> = [
    ['Preferred location', prefs.location],
    ['Preferred time', prefs.time],
    ['Photographer', prefs.photographer],
    ['Occasion', prefs.occasion],
    ['Accessibility', prefs.accessibility],
  ];

  const sourceLabel = { booking: 'Booking', 'quick-match': 'Home widget', contact: 'Contact' }[data.source];
  const dateLine = data.date
    ? `${escapeHtml(data.date)}${data.time ? ` ${escapeHtml(data.time)}` : ''}${data.flexibleDates ? ' (flexible)' : ''}`
    : data.flexibleDates
      ? 'Flexible'
      : null;

  const lines = [
    `<b>New ${SITE_NAME} enquiry</b>${data.reference ? ` · ${escapeHtml(data.reference)}` : ''}`,
    `<b>Type:</b> ${sourceLabel}`,
    `<b>Service:</b> ${escapeHtml(serviceName)}`,
    `<b>City:</b> ${escapeHtml(cityName)}`,
    dateLine ? `<b>Date:</b> ${dateLine}` : null,
    data.groupSize ? `<b>People:</b> ${escapeHtml(data.groupSize)}` : null,
    data.duration ? `<b>Duration:</b> ${escapeHtml(data.duration)}` : null,
    addonList.length ? `<b>Add-ons:</b> ${escapeHtml(addonList.join(', '))}` : null,
    ...prefLines.map(([label, value]) => (value ? `<b>${label}:</b> ${escapeHtml(value)}` : null)),
    '',
    `<b>Name:</b> ${escapeHtml(data.name)}`,
    `<b>Email:</b> ${escapeHtml(data.email)}`,
    `<b>Phone:</b> ${escapeHtml(data.phone)}`,
    data.remarks ? `<b>Notes:</b> ${escapeHtml(data.remarks)}` : null,
    `<b>Language:</b> ${data.locale}`,
  ].filter((l): l is string => l !== null);

  const delivered = await sendTelegramAlert(lines.join('\n'));
  if (!delivered) {
    // Nobody has received this enquiry. The client says so and offers the
    // same details as a prefilled WhatsApp message instead of a false success.
    return NextResponse.json({ ok: false, error: 'notify_failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
