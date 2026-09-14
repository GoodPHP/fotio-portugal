'use client';

import { Suspense, useEffect, useId, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Locale } from '@/lib/locales';
import { SITE_NAME, formatPrice, whatsappLink } from '@/lib/site';

export interface BookingServiceOption {
  slug: string;
  name: string;
  price: number;
}
export interface BookingCityOption {
  slug: string;
  name: string;
}

interface BookingWidgetProps {
  services: BookingServiceOption[];
  cities: BookingCityOption[];
  locale: Locale;
}

const DURATION_OPTIONS = [
  { value: 'standard', label: { en: 'Standard', pt: 'PT_TODO: Standard' } },
  { value: 'extended', label: { en: 'Extended', pt: 'PT_TODO: Extended' } },
  { value: 'fullday', label: { en: 'Full day', pt: 'PT_TODO: Full day' } },
] as const;

const UI = {
  service: { en: 'Service', pt: 'PT_TODO: Service' },
  from: { en: 'from', pt: 'PT_TODO: from' },
  city: { en: 'City', pt: 'PT_TODO: City' },
  date: { en: 'Date', pt: 'PT_TODO: Date' },
  time: { en: 'Time (optional)', pt: 'PT_TODO: Time (optional)' },
  duration: { en: 'Session duration', pt: 'PT_TODO: Session duration' },
  addons: { en: 'Add-ons', pt: 'PT_TODO: Add-ons' },
  express: { en: 'Express 24h delivery', pt: 'PT_TODO: Express 24h delivery' },
  second: { en: 'Second photographer', pt: 'PT_TODO: Second photographer' },
  name: { en: 'Full name', pt: 'PT_TODO: Full name' },
  email: { en: 'Email', pt: 'PT_TODO: Email' },
  phone: { en: 'Phone', pt: 'PT_TODO: Phone' },
  remarks: { en: 'Notes (optional)', pt: 'PT_TODO: Notes (optional)' },
  quoteTitle: { en: 'Tailored quote', pt: 'PT_TODO: Tailored quote' },
  quoteBody: {
    en: 'We reply on WhatsApp within minutes with a price tailored to your session.',
    pt: 'PT_TODO: We reply on WhatsApp within minutes with a price tailored to',
  },
  perk1: { en: 'No obligation', pt: 'PT_TODO: No obligation' },
  perk2: { en: 'Personalised price', pt: 'PT_TODO: Personalised price' },
  perk3: { en: 'Fast reply', pt: 'PT_TODO: Fast reply' },
  reference: { en: 'Reference', pt: 'PT_TODO: Reference' },
  submit: { en: 'Send request', pt: 'PT_TODO: Send request' },
  sending: { en: 'Sending…', pt: 'PT_TODO: Sending…' },
  successTitle: { en: 'Request received!', pt: 'PT_TODO: Request received!' },
  successBody: { en: 'We are opening WhatsApp to confirm the details with you.', pt: 'PT_TODO: We are opening WhatsApp to confirm the details with you.' },
  whatsapp: { en: 'Open WhatsApp', pt: 'PT_TODO: Open WhatsApp' },
  errName: { en: 'Enter your name.', pt: 'PT_TODO: Enter your name.' },
  errEmail: { en: 'Invalid email.', pt: 'PT_TODO: Invalid email.' },
  errPhone: { en: 'Invalid phone.', pt: 'PT_TODO: Invalid phone.' },
  errDate: { en: 'Choose a date.', pt: 'PT_TODO: Choose a date.' },
  errSubmit: { en: 'Submission error. Try again or use WhatsApp.', pt: 'PT_TODO: Submission error. Try again or use WhatsApp.' },
} as const;

/**
 * Opening line of the WhatsApp message, per reader.
 *
 * Was Italian, on an English/French site. Nothing renders this string; it is
 * handed straight to WhatsApp, which is why it went unnoticed for so long.
 * The booking reference follows the greeting so an enquiry can be matched to
 * the Telegram alert raised by the same submission.
 */
const GREETING: Record<Locale, (reference: string) => string> = {
  en: (reference) => `Hi ${SITE_NAME}! [${reference}]`,
  pt: (reference) => `Olá ${SITE_NAME}! [${reference}]`,
};

function t(key: keyof typeof UI, locale: Locale): string {
  return (UI[key] as Record<Locale, string>)[locale] ?? UI[key].en;
}

function durationLabel(value: string, locale: Locale): string {
  const opt = DURATION_OPTIONS.find((o) => o.value === value);
  if (!opt) return value;
  return (opt.label as Record<Locale, string>)[locale] ?? opt.label.en;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function makeReference(): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.floor(Math.random() * 1296).toString(36).toUpperCase().padStart(2, '0');
  return `FI-${stamp}${rand}`;
}

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
}

function BookingWidgetInner({ services, cities, locale }: BookingWidgetProps) {
  const baseId = useId();
  const searchParams = useSearchParams();
  const prefillService = searchParams.get('service') ?? '';
  const prefillCity = searchParams.get('city') ?? '';

  const initialService =
    services.find((s) => s.slug === prefillService)?.slug ?? services[0]?.slug ?? '';
  const initialCity = cities.find((c) => c.slug === prefillCity)?.slug ?? cities[0]?.slug ?? '';

  const [serviceSlug, setServiceSlug] = useState(initialService);
  const [citySlug, setCitySlug] = useState(initialCity);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [durationPref, setDurationPref] = useState<string>(DURATION_OPTIONS[0].value);
  const [express, setExpress] = useState(false);
  const [secondPhotographer, setSecondPhotographer] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [remarks, setRemarks] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  // Generated after mount so SSR and the client's first render match. makeReference()
  // uses Date.now()/Math.random(), so running it during render (incl. useState's lazy
  // initializer, which also runs on the server) produces a hydration mismatch.
  const [reference, setReference] = useState('');
  useEffect(() => {
    setReference(makeReference());
  }, []);

  const selectedService = services.find((s) => s.slug === serviceSlug);

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (name.trim().length < 2) next.name = t('errName', locale);
    if (!EMAIL_RE.test(email.trim())) next.email = t('errEmail', locale);
    if (phone.trim().length < 6) next.phone = t('errPhone', locale);
    if (!date) next.date = t('errDate', locale);
    return next;
  }

  function buildWhatsAppMessage(): string {
    const svc = selectedService?.name ?? serviceSlug;
    const city = cities.find((c) => c.slug === citySlug)?.name ?? citySlug;
    const extras: string[] = [];
    if (express) extras.push(t('express', locale));
    if (secondPhotographer) extras.push(t('second', locale));
    const parts = [
      GREETING[locale](reference),
      `${svc} — ${city}`,
      date ? `${date}${time ? ` ${time}` : ''}` : '',
      `${t('duration', locale)}: ${durationLabel(durationPref, locale)}`,
      extras.length ? `Extra: ${extras.join(', ')}` : '',
      `${name}`,
    ].filter(Boolean);
    return parts.join('\n');
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError('');
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setSubmitting(true);
    const payload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      citySlug,
      serviceSlug,
      date,
      time: time || undefined,
      duration: durationLabel(durationPref, locale),
      addons: { express, secondPhotographer },
      remarks: remarks.trim() || undefined,
      source: 'booking' as const,
      locale,
      honeypot,
    };
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      // Open WhatsApp on success OR soft-failure (502 notify failed).
      if (res.ok || res.status === 502) {
        setDone(true);
        if (typeof window !== 'undefined') {
          window.open(whatsappLink(buildWhatsAppMessage()), '_blank', 'noopener,noreferrer');
        }
      } else {
        setFormError(t('errSubmit', locale));
      }
    } catch {
      setFormError(t('errSubmit', locale));
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-card border border-brand-rule bg-white p-8 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-chip bg-brand-orange/10 text-brand-orange-deep">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-7">
            <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-5 font-display text-2xl font-bold">{t('successTitle', locale)}</h3>
        <p className="mx-auto mt-3 max-w-md text-brand-muted">{t('successBody', locale)}</p>
        <p className="mt-2 font-mono text-sm text-brand-muted">{t('reference', locale)}: {reference}</p>
        <a
          href={whatsappLink(buildWhatsAppMessage())}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-chip bg-[#25D366] px-6 py-3 font-semibold text-brand-dark transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/50"
        >
          {t('whatsapp', locale)}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_22rem]">
      <div className="rounded-card border border-brand-rule bg-white p-6 sm:p-8">
        {/* Honeypot */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor={`${baseId}-hp`}>Leave empty</label>
          <input
            id={`${baseId}-hp`}
            type="text"
            name="honeypot"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field id={`${baseId}-service`} label={t('service', locale)}>
            <select id={`${baseId}-service`} value={serviceSlug} onChange={(e) => setServiceSlug(e.target.value)} className={inputClass(false)}>
              {services.map((s) => (
                <option key={s.slug} value={s.slug}>{s.name} — {t('from', locale)} {formatPrice(s.price, locale)}</option>
              ))}
            </select>
          </Field>
          <Field id={`${baseId}-city`} label={t('city', locale)}>
            <select id={`${baseId}-city`} value={citySlug} onChange={(e) => setCitySlug(e.target.value)} className={inputClass(false)}>
              {cities.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </Field>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field id={`${baseId}-date`} label={t('date', locale)} error={errors.date}>
            <input
              id={`${baseId}-date`}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              aria-invalid={Boolean(errors.date)}
              className={inputClass(Boolean(errors.date))}
            />
          </Field>
          <Field id={`${baseId}-time`} label={t('time', locale)}>
            <input id={`${baseId}-time`} type="time" value={time} onChange={(e) => setTime(e.target.value)} className={inputClass(false)} />
          </Field>
        </div>

        <fieldset className="mt-6">
          <legend className="mb-2 text-sm font-medium text-brand-dark">{t('duration', locale)}</legend>
          <div role="radiogroup" className="flex gap-2">
            {DURATION_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={durationPref === opt.value}
                onClick={() => setDurationPref(opt.value)}
                className={`flex-1 rounded-card-sm px-4 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/50 ${
                  durationPref === opt.value
                    ? 'bg-brand-dark text-white shadow'
                    : 'bg-brand-sand/50 text-brand-dark ring-1 ring-brand-rule hover:ring-brand-orange/40'
                }`}
              >
                {durationLabel(opt.value, locale)}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-6">
          <legend className="mb-2 text-sm font-medium text-brand-dark">{t('addons', locale)}</legend>
          <div className="space-y-2">
            <CheckboxRow id={`${baseId}-express`} checked={express} onChange={setExpress} label={t('express', locale)} />
            <CheckboxRow id={`${baseId}-second`} checked={secondPhotographer} onChange={setSecondPhotographer} label={t('second', locale)} />
          </div>
        </fieldset>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field id={`${baseId}-name`} label={t('name', locale)} error={errors.name}>
            <input id={`${baseId}-name`} type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={Boolean(errors.name)} className={inputClass(Boolean(errors.name))} />
          </Field>
          <Field id={`${baseId}-phone`} label={t('phone', locale)} error={errors.phone}>
            <input id={`${baseId}-phone`} type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} aria-invalid={Boolean(errors.phone)} className={inputClass(Boolean(errors.phone))} />
          </Field>
        </div>

        <div className="mt-5">
          <Field id={`${baseId}-email`} label={t('email', locale)} error={errors.email}>
            <input id={`${baseId}-email`} type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={Boolean(errors.email)} className={inputClass(Boolean(errors.email))} />
          </Field>
        </div>

        <div className="mt-5">
          <Field id={`${baseId}-remarks`} label={t('remarks', locale)}>
            <textarea id={`${baseId}-remarks`} rows={3} value={remarks} onChange={(e) => setRemarks(e.target.value)} className={`${inputClass(false)} resize-y`} />
          </Field>
        </div>
      </div>

      {/* Sticky trust panel */}
      <aside className="lg:sticky lg:top-6 lg:self-start">
        <div data-surface="dark" className="rounded-card bg-brand-dark p-6 text-white">
          <h2 className="font-display text-2xl font-bold text-white">{t('quoteTitle', locale)}</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/70">{t('quoteBody', locale)}</p>
          <ul className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm text-white/80">
            {(['perk1', 'perk2', 'perk3'] as const).map((key) => (
              <li key={key} className="flex items-center gap-2">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-4 shrink-0 text-brand-orange-deep">
                  <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t(key, locale)}
              </li>
            ))}
          </ul>
          {reference && (
            <p className="mt-4 font-mono text-xs text-brand-muted">{t('reference', locale)}: {reference}</p>
          )}

          {formError && (
            <p role="alert" aria-live="assertive" className="mt-4 rounded-chip bg-red-500/20 px-4 py-3 text-sm font-medium text-red-100">
              {formError}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-5 inline-flex w-full items-center justify-center rounded-chip bg-brand-orange-deep px-8 py-4 text-base font-semibold text-white transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? t('sending', locale) : t('submit', locale)}
          </button>
        </div>
      </aside>
    </form>
  );
}

export default function BookingWidget(props: BookingWidgetProps) {
  return (
    <Suspense fallback={null}>
      <BookingWidgetInner {...props} />
    </Suspense>
  );
}

function inputClass(hasError: boolean): string {
  return `w-full rounded-card-sm border bg-brand-sand/40 px-4 py-3 text-base text-neutral-900 outline-none transition focus:bg-white focus:ring-2 ${
    hasError
      ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
      : 'border-brand-rule focus:border-brand-orange-deep focus:ring-brand-orange/30'
  }`;
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-brand-dark">
        {label}
      </label>
      {children}
      <p aria-live="polite" className="min-h-5">
        {error && <span className="text-sm text-red-600">{error}</span>}
      </p>
    </div>
  );
}

function CheckboxRow({
  id,
  checked,
  onChange,
  label,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-center gap-3 rounded-card-sm border px-4 py-3 transition ${
        checked ? 'border-brand-orange/50 bg-brand-orange/5' : 'border-brand-rule bg-brand-sand/40 hover:border-brand-orange/30'
      }`}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-5 rounded border-black/20 text-brand-orange-deep focus:ring-brand-orange/40"
      />
      <span className="text-sm font-medium text-neutral-800">{label}</span>
    </label>
  );
}
