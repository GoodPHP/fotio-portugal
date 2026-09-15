'use client';

import { useId, useState } from 'react';
import type { Locale } from '@/lib/locales';
import { SITE_NAME, whatsappLink } from '@/lib/site';

export interface LeadFormServiceOption {
  slug: string;
  name: string;
}
export interface LeadFormCityOption {
  slug: string;
  name: string;
}

interface LeadFormProps {
  services: LeadFormServiceOption[];
  cities: LeadFormCityOption[];
  locale: Locale;
}

const UI = {
  name: { en: 'Full name', pt: 'Nome completo' },
  email: { en: 'Email', pt: 'E-mail' },
  phone: { en: 'Phone', pt: 'Telemóvel' },
  service: { en: 'Service (optional)', pt: 'Serviço (opcional)' },
  city: { en: 'City (optional)', pt: 'Cidade (opcional)' },
  message: { en: 'Message', pt: 'Mensagem' },
  choose: { en: 'Select…', pt: 'Seleccionar…' },
  submit: { en: 'Send request', pt: 'Enviar pedido' },
  sending: { en: 'Sending…', pt: 'A enviar…' },
  successTitle: { en: 'Request sent!', pt: 'Pedido enviado!' },
  successBody: { en: 'We will reply within a few hours. For an instant reply, message us on WhatsApp.', pt: 'Respondemos dentro de poucas horas. Para resposta imediata, escreva-nos no WhatsApp.' },
  whatsapp: { en: 'Continue on WhatsApp', pt: 'Continuar no WhatsApp' },
  errName: { en: 'Enter your name (min. 2 characters).', pt: 'Indique o seu nome (mín. 2 caracteres).' },
  errEmail: { en: 'Enter a valid email address.', pt: 'Indique um endereço de e-mail válido.' },
  errPhone: { en: 'Enter a valid phone number.', pt: 'Indique um número de telemóvel válido.' },
  errMessage: { en: 'Write a short message.', pt: 'Escreva uma mensagem curta.' },
  errSubmit: { en: 'Something went wrong. Try again or message us on WhatsApp.', pt: 'Ocorreu um erro. Tente de novo ou escreva-nos no WhatsApp.' },
  waService: { en: 'Service', pt: 'Serviço' },
  waCity: { en: 'City', pt: 'Cidade' },
} as const;

/**
 * Opening line of the WhatsApp message, per reader.
 *
 * This greeted every visitor in Italian, on a site served in English and
 * French only. It survived because nothing renders the string: it is handed
 * straight to WhatsApp, so it never appeared in a page, a test or a
 * screenshot. `scripts/check-brand.ts` now fails the build on the phrasing.
 */
const GREETING: Record<Locale, (sender: string) => string> = {
  en: (sender) => `Hi ${SITE_NAME}! I’m ${sender}.`,
  pt: (sender) => `Olá ${SITE_NAME}! Chamo-me ${sender}.`,
};

function t(key: keyof typeof UI, locale: Locale): string {
  return (UI[key] as Record<Locale, string>)[locale] ?? UI[key].en;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function LeadForm({ services, cities, locale }: LeadFormProps) {
  const baseId = useId();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceSlug, setServiceSlug] = useState('');
  const [citySlug, setCitySlug] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (name.trim().length < 2) next.name = t('errName', locale);
    if (!EMAIL_RE.test(email.trim())) next.email = t('errEmail', locale);
    if (phone.trim().length < 6) next.phone = t('errPhone', locale);
    if (message.trim().length < 3) next.message = t('errMessage', locale);
    return next;
  }

  function buildWhatsAppMessage(): string {
    const svc = services.find((s) => s.slug === serviceSlug)?.name;
    const city = cities.find((c) => c.slug === citySlug)?.name;
    const parts = [GREETING[locale](name)];
    if (svc) parts.push(`${t('waService', locale)}: ${svc}.`);
    if (city) parts.push(`${t('waCity', locale)}: ${city}.`);
    if (message.trim()) parts.push(message.trim());
    return parts.join(' ');
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError('');
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          citySlug: citySlug || cities[0]?.slug,
          serviceSlug: serviceSlug || services[0]?.slug,
          remarks: message.trim(),
          source: 'contact',
          locale,
          honeypot,
        }),
      });
      // 502 = notify failed but submission was understood: still show success path.
      if (res.ok || res.status === 502) {
        setDone(true);
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
      <div className="tile p-8 text-center sm:p-10">
        <div className="mx-auto flex size-14 items-center justify-center bg-brand-orange-deep text-white">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-7">
            <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
          </svg>
        </div>
        <h3 className="font-display mt-6 text-2xl font-bold text-brand-dark">{t('successTitle', locale)}</h3>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-brand-muted">{t('successBody', locale)}</p>
        <a
          href={whatsappLink(buildWhatsAppMessage())}
          target="_blank"
          rel="noopener noreferrer"
          className="btn mt-7 bg-[#25D366] text-brand-dark hover:bg-[#1FB855] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
        >
          {t('whatsapp', locale)}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="tile p-6 sm:p-8">
      {/* Honeypot: visually hidden, off-screen, not announced. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${baseId}-hp`}>Leave this field empty</label>
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

      {/*
        Every control is the shared `.field` primitive, and the invalid state is
        styled from `aria-invalid` in globals.css rather than from a second
        class list here. The attribute has to be set for assistive technology
        regardless, so styling from it means the two can never disagree — which
        they did, with fields that looked fine and announced themselves invalid.
      */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id={`${baseId}-name`} label={t('name', locale)} error={errors.name}>
          <input
            id={`${baseId}-name`}
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={Boolean(errors.name)}
            className="field"
          />
        </Field>
        <Field id={`${baseId}-phone`} label={t('phone', locale)} error={errors.phone}>
          <input
            id={`${baseId}-phone`}
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            className="field"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field id={`${baseId}-email`} label={t('email', locale)} error={errors.email}>
          <input
            id={`${baseId}-email`}
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(errors.email)}
            className="field"
          />
        </Field>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id={`${baseId}-service`} label={t('service', locale)}>
          <select
            id={`${baseId}-service`}
            value={serviceSlug}
            onChange={(e) => setServiceSlug(e.target.value)}
            className="field"
          >
            <option value="">{t('choose', locale)}</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>{s.name}</option>
            ))}
          </select>
        </Field>
        <Field id={`${baseId}-city`} label={t('city', locale)}>
          <select
            id={`${baseId}-city`}
            value={citySlug}
            onChange={(e) => setCitySlug(e.target.value)}
            className="field"
          >
            <option value="">{t('choose', locale)}</option>
            {cities.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field id={`${baseId}-message`} label={t('message', locale)} error={errors.message}>
          <textarea
            id={`${baseId}-message`}
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-invalid={Boolean(errors.message)}
            className="field resize-y"
          />
        </Field>
      </div>

      {formError && (
        <p
          role="alert"
          aria-live="assertive"
          className="mt-5 border-l-[3px] border-brand-error bg-brand-error/8 px-4 py-3 text-sm font-medium text-brand-error"
        >
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn btn-primary mt-7 w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark sm:w-auto"
      >
        {submitting ? t('sending', locale) : t('submit', locale)}
        {!submitting && (
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h9m0 0L8.5 4.5M12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="square" />
          </svg>
        )}
      </button>
    </form>
  );
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
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {children}
      <p aria-live="polite" className="min-h-5">
        {error && <span className="text-sm text-brand-error">{error}</span>}
      </p>
    </div>
  );
}
