'use client';

import { useId, useState } from 'react';
import type { Locale } from '@/lib/locales';
import { whatsappLink } from '@/lib/site';

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
  name: { en: 'Full name', fr: 'Nom complet' },
  email: { en: 'Email', fr: 'E-mail' },
  phone: { en: 'Phone', fr: 'Téléphone' },
  service: { en: 'Service (optional)', fr: 'Service (optionnel)' },
  city: { en: 'City (optional)', fr: 'Ville (optionnelle)' },
  message: { en: 'Message', fr: 'Message' },
  choose: { en: 'Select…', fr: 'Sélectionner…' },
  submit: { en: 'Send request', fr: 'Envoyer la demande' },
  sending: { en: 'Sending…', fr: 'Envoi…' },
  successTitle: { en: 'Request sent!', fr: 'Demande envoyée !' },
  successBody: { en: 'We will reply within a few hours. For an instant reply, message us on WhatsApp.', fr: 'Nous répondrons sous quelques heures. Pour une réponse immédiate, écrivez-nous sur WhatsApp.' },
  whatsapp: { en: 'Continue on WhatsApp', fr: 'Continuer sur WhatsApp' },
  errName: { en: 'Enter your name (min. 2 characters).', fr: 'Saisissez votre nom (min. 2 caractères).' },
  errEmail: { en: 'Enter a valid email address.', fr: 'Saisissez une adresse e-mail valide.' },
  errPhone: { en: 'Enter a valid phone number.', fr: 'Saisissez un numéro de téléphone valide.' },
  errMessage: { en: 'Write a short message.', fr: 'Écrivez un court message.' },
  errSubmit: { en: 'Something went wrong. Try again or message us on WhatsApp.', fr: 'Une erreur est survenue. Réessayez ou écrivez-nous sur WhatsApp.' },
} as const;

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
    const parts = [`Ciao Ylala, sono ${name}.`];
    if (svc) parts.push(`Service: ${svc}.`);
    if (city) parts.push(`City: ${city}.`);
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
      <div className="rounded-card border border-brand-rule bg-white p-8 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-chip bg-brand-orange/10 text-brand-orange-deep">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-7">
            <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-5 font-display text-2xl font-bold">{t('successTitle', locale)}</h3>
        <p className="mx-auto mt-3 max-w-md text-brand-muted">{t('successBody', locale)}</p>
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
    <form onSubmit={handleSubmit} noValidate className="rounded-card border border-brand-rule bg-white p-6 sm:p-8">
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

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id={`${baseId}-name`} label={t('name', locale)} error={errors.name}>
          <input
            id={`${baseId}-name`}
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={Boolean(errors.name)}
            className={inputClass(Boolean(errors.name))}
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
            className={inputClass(Boolean(errors.phone))}
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
            className={inputClass(Boolean(errors.email))}
          />
        </Field>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id={`${baseId}-service`} label={t('service', locale)}>
          <select
            id={`${baseId}-service`}
            value={serviceSlug}
            onChange={(e) => setServiceSlug(e.target.value)}
            className={inputClass(false)}
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
            className={inputClass(false)}
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
            className={`${inputClass(Boolean(errors.message))} resize-y`}
          />
        </Field>
      </div>

      {formError && (
        <p role="alert" aria-live="assertive" className="mt-5 rounded-chip bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 inline-flex w-full items-center justify-center rounded-chip bg-brand-dark px-8 py-4 text-base font-semibold text-white transition hover:bg-brand-orange-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/50 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitting ? t('sending', locale) : t('submit', locale)}
      </button>
    </form>
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
