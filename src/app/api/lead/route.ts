import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getCity, getServiceByAnySlug } from '@/lib/catalog';
import { LOCALES } from '@/lib/locales';
import { sendTelegramAlert } from '@/lib/telegram';

export const runtime = 'nodejs';

const LeadSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(6).max(30),
  citySlug: z.string().refine((s) => Boolean(getCity(s)), { message: 'unknown_city' }),
  serviceSlug: z.string().refine((s) => Boolean(getServiceByAnySlug(s)), { message: 'unknown_service' }),
  date: z.string().max(40).optional(),
  time: z.string().max(20).optional(),
  duration: z.string().max(40).optional(),
  addons: z
    .object({
      express: z.boolean().optional(),
      secondPhotographer: z.boolean().optional(),
    })
    .optional(),
  remarks: z.string().max(2000).optional(),
  source: z.enum(['booking', 'contact']).default('contact'),
  locale: z.enum(LOCALES),
  // Spam trap: legitimate clients leave this empty.
  honeypot: z.string().optional(),
});

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

  const city = getCity(data.citySlug);
  const service = getServiceByAnySlug(data.serviceSlug);
  const cityName = city?.name ?? data.citySlug;
  const serviceName = service?.name.en ?? data.serviceSlug;

  const addonList: string[] = [];
  if (data.addons?.express) addonList.push('Express 24h delivery');
  if (data.addons?.secondPhotographer) addonList.push('Second photographer');

  const lines = [
    `<b>📸 New Ylala enquiry</b>`,
    `<b>Type:</b> ${data.source === 'booking' ? 'Booking' : 'Contact'}`,
    `<b>Service:</b> ${escapeHtml(serviceName)}`,
    `<b>City:</b> ${escapeHtml(cityName)}`,
    data.date ? `<b>Date:</b> ${escapeHtml(data.date)}${data.time ? ` ${escapeHtml(data.time)}` : ''}` : null,
    data.duration ? `<b>Duration:</b> ${escapeHtml(data.duration)}` : null,
    addonList.length ? `<b>Add-ons:</b> ${escapeHtml(addonList.join(', '))}` : null,
    '',
    `<b>Name:</b> ${escapeHtml(data.name)}`,
    `<b>Email:</b> ${escapeHtml(data.email)}`,
    `<b>Phone:</b> ${escapeHtml(data.phone)}`,
    data.remarks ? `<b>Notes:</b> ${escapeHtml(data.remarks)}` : null,
    `<b>Language:</b> ${data.locale}`,
  ].filter((l): l is string => l !== null);

  const delivered = await sendTelegramAlert(lines.join('\n'));
  if (!delivered) {
    // The client still proceeds to WhatsApp; report soft failure.
    return NextResponse.json({ ok: false, error: 'notify_failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
