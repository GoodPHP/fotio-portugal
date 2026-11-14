'use client';

import { Suspense, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Locale } from '@/lib/locales';
import { tx } from '@/lib/locales';
import type { BookingOptions } from '@/lib/booking-options';
import { parseContact } from '@/lib/contact-input';
import { CTA } from '@/lib/cta';
import { GUARANTEE, MATCHING, REPLY_TIME, WEATHER } from '@/lib/promises';
import { whatsappBookingLink } from '@/lib/site';
import { track } from '@/lib/analytics';
import { ArrowIcon, CheckMark, WhatsAppIcon } from './Icons';

const UI = {
  name: { en: 'Name', pt: 'Nome' },
  contact: { en: 'Phone or email', pt: 'Telefone ou e-mail' },
  contactHint: { en: '+44… or you@email.com', pt: '+351… ou o.seu@email.pt' },
  details: { en: 'What do you have in mind?', pt: 'O que tem em mente?' },
  detailsHint: {
    en: 'Place, date, type of session, how many people…',
    pt: 'Local, data, tipo de sessão, quantas pessoas…',
  },
  budget: { en: 'Budget', pt: 'Orçamento' },
  budgetHint: { en: 'e.g. €300', pt: 'p. ex. 300 €' },
  optional: { en: 'optional', pt: 'opcional' },
  sending: { en: 'Sending…', pt: 'A enviar…' },
  promises: { en: 'What happens next', pt: 'O que acontece a seguir' },
  doneTitle: {
    en: 'Thanks! We’ll check photographer availability and get back to you shortly.',
    pt: 'Obrigado! Vamos verificar a disponibilidade dos fotógrafos e respondemos em breve.',
  },
  doneWhatsapp: {
    en: 'Prefer to talk now? Carry on over WhatsApp.',
    pt: 'Prefere falar já? Continue no WhatsApp.',
  },
  reference: { en: 'Reference', pt: 'Referência' },
  failTitle: { en: 'We couldn’t send your request just now.', pt: 'Não conseguimos enviar o seu pedido agora.' },
  failBody: {
    en: 'Nothing is lost: send it on WhatsApp instead, or try again.',
    pt: 'Nada se perdeu: envie-o pelo WhatsApp, ou tente de novo.',
  },
  retry: { en: 'Try again', pt: 'Tentar de novo' },
  errName: { en: 'Enter your name.', pt: 'Indique o seu nome.' },
  errContact: {
    en: 'Enter a phone number (with country code) or an email.',
    pt: 'Indique um telefone (com indicativo) ou um e-mail.',
  },
} as const;

type Copy = { en: string; pt: string };
const t = (copy: Copy, locale: Locale) => copy[locale];

const MIN_NAME_LENGTH = 2;
const MAX_DETAILS_LENGTH = 2000;
const MAX_BUDGET_LENGTH = 100;

type Status = 'idle' | 'sending' | 'done' | 'failed';

interface Prefill {
  city?: string;
  service?: string;
  photographer?: string;
}

export interface QuickRequestFormProps {
  options: BookingOptions;
  locale: Locale;
}

/** A short reference joining the Telegram alert to the WhatsApp message. */
function makeReference(): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.floor(Math.random() * 1296).toString(36).toUpperCase().padStart(2, '0');
  return `LZ-${stamp}${rand}`;
}

/**
 * The /book form: a name, one way to reply, and — if they like — a few words
 * and a budget.
 *
 * It replaced a six-step wizard (place, session, date, group size,
 * preferences, then name + WhatsApp + email). Everything the wizard asked can
 * be said in the description or settled in the reply; the only thing we
 * cannot do without is a way to answer. `?city=` / `?service=` /
 * `?photographer=` from links elsewhere on the site still travel with the
 * request, so the context of the click is not lost.
 */
export default function QuickRequestForm(props: QuickRequestFormProps) {
  // useSearchParams opts the subtree out of static rendering up to the
  // nearest Suspense boundary; the fallback is the same form without prefill.
  return (
    <Suspense fallback={<Form {...props} prefill={{}} />}>
      <WithQuery {...props} />
    </Suspense>
  );
}

function WithQuery(props: QuickRequestFormProps) {
  const params = useSearchParams();
  const prefill: Prefill = {
    city: params.get('city') ?? undefined,
    service: params.get('service') ?? undefined,
    photographer: params.get('photographer') ?? undefined,
  };
  return <Form {...props} prefill={prefill} />;
}

function Form({ options, locale, prefill }: QuickRequestFormProps & { prefill: Prefill }) {
  const id = useId();
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [details, setDetails] = useState('');
  const [budget, setBudget] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<{ name?: string; contact?: string }>({});
  const [status, setStatus] = useState<Status>('idle');

  // Clock-dependent, so set after mount to keep hydration stable.
  const [reference, setReference] = useState('');
  useEffect(() => setReference(makeReference()), []);

  const started = useRef(false);
  const markStarted = () => {
    if (started.current) return;
    started.current = true;
    track('booking_started', { variant: 'simple' });
  };

  const doneRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (status === 'done') doneRef.current?.focus();
  }, [status]);

  const place = options.places.find((p) => p.slug === prefill.city);
  const session = options.sessions.find((s) => s.slug === prefill.service || s.localSlug === prefill.service);
  const whatsappHref = whatsappBookingLink(
    {
      where: place?.name,
      session: session?.name,
      reference: status === 'idle' ? undefined : reference,
    },
    locale,
  );

  async function submit() {
    const parsedContact = parseContact(contact);
    const nextErrors = {
      name: name.trim().length < MIN_NAME_LENGTH ? t(UI.errName, locale) : undefined,
      contact: parsedContact ? undefined : t(UI.errContact, locale),
    };
    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.contact || !parsedContact) return;

    setStatus('sending');
    const remarks = [details.trim(), prefill.photographer ? `Photographer: ${prefill.photographer}` : '']
      .filter(Boolean)
      .join('\n');
    const payload = {
      name: name.trim(),
      ...parsedContact,
      citySlug: place?.slug,
      serviceSlug: session?.slug,
      budget: budget.trim() || undefined,
      remarks: remarks || undefined,
      reference,
      source: 'booking',
      locale,
      honeypot,
    };

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('done');
      track('booking_completed', { variant: 'simple', city: place?.slug, service: session?.slug });
    } catch (e) {
      setStatus('failed');
      track('booking_failed', { variant: 'simple', reason: e instanceof Error ? e.message : 'network' });
    }
  }

  const promises = (
    <aside data-surface="dark" className="relative overflow-hidden bg-brand-dark p-7 text-white lg:sticky lg:top-24 lg:self-start">
      <h2 className="font-display text-2xl font-bold text-white">{t(UI.promises, locale)}</h2>
      <ul className="mt-6 space-y-3 text-sm text-white">
        {[MATCHING.promise, MATCHING.noPayment, REPLY_TIME, GUARANTEE.title, WEATHER.title].map((copy) => {
          const line = tx(copy, locale);
          return (
            <li key={line} className="flex gap-3">
              <CheckMark className="mt-0.5 h-4 w-4" />
              <span>{line}</span>
            </li>
          );
        })}
      </ul>
    </aside>
  );

  const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark';

  if (status === 'done') {
    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_22rem]">
        <div className="tile p-6 py-10 text-center sm:p-8 sm:py-12" role="status">
          <CheckMark className="mx-auto h-14 w-14" />
          <h2
            ref={doneRef}
            tabIndex={-1}
            className="font-display mx-auto mt-6 max-w-xl text-2xl font-bold text-brand-dark outline-none sm:text-3xl"
          >
            {t(UI.doneTitle, locale)}
          </h2>
          <p className="mx-auto mt-3 max-w-md leading-relaxed text-brand-muted">{tx(REPLY_TIME, locale)}</p>
          {reference && (
            <p className="mt-4 inline-block border border-brand-rule px-3 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-brand-muted">
              {t(UI.reference, locale)}: {reference}
            </p>
          )}
          <p className="mx-auto mt-8 max-w-md text-sm text-brand-muted">{t(UI.doneWhatsapp, locale)}</p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn-outline mt-4 ${focusRing}`}
            data-track="whatsapp_clicked"
            data-track-context="booking-done"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {tx(CTA.chatWhatsapp, locale)}
          </a>
        </div>
        {promises}
      </div>
    );
  }

  const optional = <span className="font-normal text-brand-muted"> ({t(UI.optional, locale)})</span>;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_22rem]">
      <form
        noValidate
        className="tile p-6 sm:p-8"
        onFocus={markStarted}
        onSubmit={(e) => {
          e.preventDefault();
          void submit();
        }}
      >
        {/* Honeypot */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor={`${id}-hp`}>Leave empty</label>
          <input id={`${id}-hp`} type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </div>

        <div className="grid gap-x-5 sm:grid-cols-2">
          <Field id={`${id}-name`} label={t(UI.name, locale)} required error={errors.name}>
            <input
              id={`${id}-name`}
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? `${id}-name-error` : undefined}
              className="field"
            />
          </Field>
          <Field id={`${id}-contact`} label={t(UI.contact, locale)} required error={errors.contact}>
            <input
              id={`${id}-contact`}
              type="text"
              autoComplete="email"
              required
              placeholder={t(UI.contactHint, locale)}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              aria-invalid={Boolean(errors.contact)}
              aria-describedby={errors.contact ? `${id}-contact-error` : undefined}
              className="field"
            />
          </Field>
        </div>

        <Field id={`${id}-details`} label={<>{t(UI.details, locale)}{optional}</>}>
          <textarea
            id={`${id}-details`}
            rows={4}
            maxLength={MAX_DETAILS_LENGTH}
            placeholder={t(UI.detailsHint, locale)}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="field resize-y"
          />
        </Field>

        <div className="sm:max-w-xs">
          <Field id={`${id}-budget`} label={<>{t(UI.budget, locale)}{optional}</>}>
            <input
              id={`${id}-budget`}
              type="text"
              maxLength={MAX_BUDGET_LENGTH}
              placeholder={t(UI.budgetHint, locale)}
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="field"
            />
          </Field>
        </div>

        {status === 'failed' && (
          <div role="alert" className="mt-6 border border-brand-error bg-brand-tile p-5">
            <p className="font-display text-lg font-semibold text-brand-dark">{t(UI.failTitle, locale)}</p>
            <p className="mt-1 text-sm text-brand-muted">{t(UI.failBody, locale)}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-primary btn-sm ${focusRing}`}
                data-track="whatsapp_clicked"
                data-track-context="booking-failed"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {tx(CTA.chatWhatsapp, locale)}
              </a>
              <button type="submit" className={`btn btn-outline btn-sm ${focusRing}`}>
                {t(UI.retry, locale)}
              </button>
            </div>
          </div>
        )}

        {status !== 'failed' && (
          <button type="submit" disabled={status === 'sending'} className={`btn btn-primary mt-8 w-full sm:w-auto ${focusRing}`}>
            {status === 'sending' ? t(UI.sending, locale) : tx(CTA.checkAvailability, locale)}
            {status !== 'sending' && <ArrowIcon />}
          </button>
        )}
      </form>
      {promises}
    </div>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: ReactNode;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-4">
      <label htmlFor={id} className="field-label">
        {label}
        {required && (
          <span aria-hidden="true" className="text-brand-orange-deep">
            {' '}*
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 border-l-[3px] border-brand-error pl-3 text-sm font-medium text-brand-error">
          {error}
        </p>
      )}
    </div>
  );
}
