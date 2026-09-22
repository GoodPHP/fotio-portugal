'use client';

import { Suspense, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Locale } from '@/lib/locales';
import { tx } from '@/lib/locales';
import type { BookingOptions } from '@/lib/booking-options';
import { OTHER } from '@/lib/booking-options';
import { CTA } from '@/lib/cta';
import { GUARANTEE, MATCHING, REPLY_TIME, WEATHER } from '@/lib/promises';
import { formatPrice, whatsappBookingLink } from '@/lib/site';
import { track } from '@/lib/analytics';
import { ArrowIcon, CheckMark, WhatsAppIcon } from './Icons';

// ---------------------------------------------------------------------- copy

const UI = {
  title: { en: 'Find your photographer', pt: 'Encontre o seu fotógrafo' },
  stepOf: { en: 'Step {n} of {total}', pt: 'Passo {n} de {total}' },
  where: { en: 'Where are you going?', pt: 'Onde vai ser a sessão?' },
  what: { en: 'What kind of session?', pt: 'Que tipo de sessão?' },
  when: { en: 'When?', pt: 'Quando?' },
  who: { en: 'How many people?', pt: 'Quantas pessoas?' },
  prefs: { en: 'Anything we should know?', pt: 'Há algo que devamos saber?' },
  prefsLead: {
    en: 'All optional. It helps us pick the right photographer.',
    pt: 'Tudo opcional. Ajuda-nos a escolher o fotógrafo certo.',
  },
  contact: { en: 'Where should we reply?', pt: 'Para onde respondemos?' },
  other: { en: 'Other', pt: 'Outro' },
  otherPlace: { en: 'Which place?', pt: 'Que sítio?' },
  otherSession: { en: 'Tell us briefly what you have in mind', pt: 'Diga-nos em poucas palavras o que imagina' },
  from: { en: 'from', pt: 'desde' },
  date: { en: 'Date', pt: 'Data' },
  flexible: { en: 'My dates are flexible', pt: 'As minhas datas são flexíveis' },
  prefLocation: { en: 'Preferred location', pt: 'Local preferido' },
  prefLocationHint: { en: 'e.g. Alfama, a beach, our hotel', pt: 'p. ex. Alfama, uma praia, o nosso hotel' },
  prefTime: { en: 'Preferred time of day', pt: 'Hora do dia preferida' },
  prefPhotographer: { en: 'Photographer preference', pt: 'Preferência de fotógrafo' },
  prefPhotographerHint: {
    en: 'A name, a language, a style…',
    pt: 'Um nome, uma língua, um estilo…',
  },
  prefOccasion: { en: 'Special occasion', pt: 'Ocasião especial' },
  prefOccasionHint: { en: 'Anniversary, a surprise proposal…', pt: 'Aniversário, um pedido surpresa…' },
  prefAccessibility: { en: 'Accessibility needs', pt: 'Necessidades de acessibilidade' },
  prefNotes: { en: 'Anything else', pt: 'Mais alguma coisa' },
  prefNotesHint: {
    en: 'Extra time, a second photographer, express delivery — we quote it before you pay.',
    pt: 'Mais tempo, segundo fotógrafo, entrega expresso — orçamentamos antes de pagar.',
  },
  name: { en: 'Name', pt: 'Nome' },
  phone: { en: 'WhatsApp number', pt: 'Número de WhatsApp' },
  phoneHint: { en: 'With country code, e.g. +44…', pt: 'Com indicativo, p. ex. +351…' },
  email: { en: 'Email', pt: 'E-mail' },
  continue: { en: 'Continue', pt: 'Continuar' },
  back: { en: 'Back', pt: 'Voltar' },
  skip: { en: 'Skip', pt: 'Saltar' },
  sending: { en: 'Checking…', pt: 'A verificar…' },
  summary: { en: 'Your request', pt: 'O seu pedido' },
  edit: { en: 'Change', pt: 'Alterar' },
  flexibleShort: { en: 'Flexible dates', pt: 'Datas flexíveis' },
  doneTitle: {
    en: 'Thanks! We’ll check photographer availability and get back to you shortly.',
    pt: 'Obrigado! Vamos verificar a disponibilidade dos fotógrafos e respondemos em breve.',
  },
  doneWhatsapp: {
    en: 'Prefer to talk now? Carry on over WhatsApp — your details are already in the message.',
    pt: 'Prefere falar já? Continue no WhatsApp — os seus dados já vão na mensagem.',
  },
  reference: { en: 'Reference', pt: 'Referência' },
  failTitle: { en: 'We couldn’t send your request just now.', pt: 'Não conseguimos enviar o seu pedido agora.' },
  failBody: {
    en: 'Nothing is lost: send the same details on WhatsApp instead, or try again.',
    pt: 'Nada se perdeu: envie os mesmos dados pelo WhatsApp, ou tente de novo.',
  },
  retry: { en: 'Try again', pt: 'Tentar de novo' },
  errPlace: { en: 'Choose a place, or tell us which.', pt: 'Escolha um sítio, ou diga-nos qual.' },
  errSession: { en: 'Choose a session, or describe it.', pt: 'Escolha uma sessão, ou descreva-a.' },
  errDate: { en: 'Pick a date, or tick “flexible”.', pt: 'Escolha uma data, ou marque “flexíveis”.' },
  errWho: { en: 'Choose a group size.', pt: 'Escolha o número de pessoas.' },
  errName: { en: 'Enter your name.', pt: 'Indique o seu nome.' },
  errPhone: { en: 'Enter a WhatsApp number.', pt: 'Indique um número de WhatsApp.' },
  errEmail: { en: 'Enter a valid email.', pt: 'Indique um e-mail válido.' },
} as const;

const TIME_OPTIONS = [
  { value: '', label: { en: 'No preference', pt: 'Sem preferência' } },
  { value: 'sunrise', label: { en: 'Sunrise', pt: 'Nascer do sol' } },
  { value: 'morning', label: { en: 'Morning', pt: 'Manhã' } },
  { value: 'afternoon', label: { en: 'Afternoon', pt: 'Tarde' } },
  { value: 'sunset', label: { en: 'Sunset / golden hour', pt: 'Pôr do sol' } },
] as const;

type Copy = { en: string; pt: string };
const t = (copy: Copy, locale: Locale) => copy[locale];

// --------------------------------------------------------------------- steps

type StepId = 'where' | 'what' | 'when' | 'who' | 'prefs' | 'contact';

const STEPS: Record<'full' | 'compact', StepId[]> = {
  full: ['where', 'what', 'when', 'who', 'prefs', 'contact'],
  // The home widget leaves out preferences: it is the short way in, and
  // anything else can be said in the reply.
  compact: ['where', 'what', 'when', 'who', 'contact'],
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** A short reference joining the Telegram alert to the WhatsApp message. */
function makeReference(): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.floor(Math.random() * 1296).toString(36).toUpperCase().padStart(2, '0');
  return `LZ-${stamp}${rand}`;
}

interface Prefill {
  city?: string;
  service?: string;
  photographer?: string;
}

export interface BookingFlowProps {
  options: BookingOptions;
  locale: Locale;
  variant?: 'full' | 'compact';
  /** Read ?city= / ?service= / ?photographer= from the URL. /book only. */
  readQuery?: boolean;
}

/**
 * Checking availability, one question at a time.
 *
 * This replaced a single long form — service, city, date, time, a duration
 * picker, two unpriced add-ons, name, phone, email, notes — which asked for
 * everything at once and read like a contact form. It is now a sequence of
 * short questions, most of them a single tap, in the order a person thinks
 * about a trip: where, what, when, how many. Nothing is paid and nothing is
 * booked: the request is matched to a photographer by hand, and the answer
 * comes back with a confirmed price.
 *
 * Choices are real radio inputs. A pointer tap on one moves to the next
 * step; keyboard selection (arrow keys, which also fire `click`) does not, so
 * a keyboard user is never thrown forward while still choosing.
 *
 * A failed submission says so. The old form showed "Request received!" even
 * when the server reported that nobody had been notified — the one outcome in
 * which the visitor most needed to know to try another way.
 */
export default function BookingFlow(props: BookingFlowProps) {
  if (!props.readQuery) return <Flow {...props} prefill={{}} />;
  // useSearchParams opts the subtree out of static rendering up to the
  // nearest Suspense boundary. The fallback is the same flow without the
  // prefill, so the page is server-rendered with a working form either way.
  return (
    <Suspense fallback={<Flow {...props} prefill={{}} />}>
      <WithQuery {...props} />
    </Suspense>
  );
}

function WithQuery(props: BookingFlowProps) {
  const params = useSearchParams();
  const prefill: Prefill = {
    city: params.get('city') ?? undefined,
    service: params.get('service') ?? undefined,
    photographer: params.get('photographer') ?? undefined,
  };
  return <Flow {...props} prefill={prefill} />;
}

function Flow({ options, locale, variant = 'full', prefill }: BookingFlowProps & { prefill: Prefill }) {
  const id = useId();
  const steps = STEPS[variant];

  const initialPlace = options.places.some((p) => p.slug === prefill.city) ? prefill.city! : '';
  const initialSession =
    options.sessions.find((s) => s.slug === prefill.service || s.localSlug === prefill.service)?.slug ?? '';

  const [place, setPlace] = useState(initialPlace);
  const [otherPlace, setOtherPlace] = useState('');
  const [session, setSession] = useState(initialSession);
  const [otherSession, setOtherSession] = useState('');
  const [date, setDate] = useState('');
  const [flexible, setFlexible] = useState(false);
  const [people, setPeople] = useState('');
  const [prefLocation, setPrefLocation] = useState('');
  const [prefTime, setPrefTime] = useState('');
  const [prefPhotographer, setPrefPhotographer] = useState(prefill.photographer ?? '');
  const [prefOccasion, setPrefOccasion] = useState('');
  const [prefAccessibility, setPrefAccessibility] = useState('');
  const [notes, setNotes] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');

  // Start at the first question the URL has not already answered.
  const firstOpen = steps.findIndex(
    (s) => (s === 'where' && !initialPlace) || (s === 'what' && !initialSession) || (s !== 'where' && s !== 'what'),
  );
  const [stepIndex, setStepIndex] = useState(Math.max(0, firstOpen));
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'failed'>('idle');

  // Both depend on the clock, so both are set after mount: computed during
  // render they would differ between the server's HTML and the first client
  // render and fail hydration.
  const [reference, setReference] = useState('');
  const [today, setToday] = useState('');
  useEffect(() => {
    setReference(makeReference());
    setToday(new Date().toISOString().slice(0, 10));
  }, []);

  const started = useRef(false);
  const markStarted = () => {
    if (started.current) return;
    started.current = true;
    track('booking_started', { variant });
  };

  // Move focus to the new question, so a screen reader announces it and a
  // keyboard user continues from the top of it. Not on first render: the
  // flow sits below the hero on the home page, and stealing focus there
  // would scroll the page on load.
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: false });
  }, [stepIndex, status === 'done']);

  const step = steps[stepIndex];
  const placeName = place === OTHER ? otherPlace.trim() : options.places.find((p) => p.slug === place)?.name ?? '';
  const sessionOption = options.sessions.find((s) => s.slug === session);
  const sessionName = session === OTHER ? otherSession.trim() : sessionOption?.name ?? '';
  const peopleLabel = options.groupSizes.find((g) => g.value === people)?.label ?? '';
  const dateLabel = date ? formatDateShort(date, locale) : flexible ? t(UI.flexibleShort, locale) : '';

  const whatsappHref = whatsappBookingLink(
    {
      where: placeName || undefined,
      session: sessionName || undefined,
      date: date && flexible ? `${dateLabel} (${t(UI.flexibleShort, locale).toLowerCase()})` : dateLabel || undefined,
      people: people ? people.replace('-', '–') : undefined,
      reference: status === 'idle' ? undefined : reference,
    },
    locale,
  );

  function validate(which: StepId): string {
    switch (which) {
      case 'where':
        return !place || (place === OTHER && otherPlace.trim().length < 2) ? t(UI.errPlace, locale) : '';
      case 'what':
        return !session || (session === OTHER && otherSession.trim().length < 2) ? t(UI.errSession, locale) : '';
      case 'when':
        return !date && !flexible ? t(UI.errDate, locale) : '';
      case 'who':
        return !people ? t(UI.errWho, locale) : '';
      case 'contact':
        if (name.trim().length < 2) return t(UI.errName, locale);
        if (phone.replace(/[^0-9]/g, '').length < 6) return t(UI.errPhone, locale);
        if (!EMAIL_RE.test(email.trim())) return t(UI.errEmail, locale);
        return '';
      default:
        return '';
    }
  }

  function next() {
    const problem = validate(step);
    setError(problem);
    if (problem) return;
    track('booking_step_completed', { step, variant });
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  }

  function back() {
    setError('');
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  function goTo(which: StepId) {
    const i = steps.indexOf(which);
    if (i >= 0 && i < stepIndex) {
      setError('');
      setStepIndex(i);
    }
  }

  /** A tap on a choice answers the question; arrow keys only move between answers. */
  function choose(setter: (v: string) => void, value: string, byPointer: number, event?: () => void) {
    markStarted();
    setter(value);
    setError('');
    event?.();
    if (byPointer > 0 && value !== OTHER) {
      track('booking_step_completed', { step, variant });
      setStepIndex((i) => Math.min(i + 1, steps.length - 1));
    }
  }

  async function submit() {
    for (const s of steps) {
      const problem = validate(s);
      if (problem) {
        setError(problem);
        setStepIndex(steps.indexOf(s));
        return;
      }
    }
    setError('');
    setStatus('sending');

    const extra = [
      place === OTHER && otherPlace.trim() ? `Place: ${otherPlace.trim()}` : '',
      session === OTHER && otherSession.trim() ? `Session: ${otherSession.trim()}` : '',
      notes.trim(),
    ]
      .filter(Boolean)
      .join('\n');

    const payload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      citySlug: place,
      serviceSlug: session,
      date: date || undefined,
      flexibleDates: flexible || undefined,
      groupSize: people,
      preferences: {
        location: prefLocation.trim() || undefined,
        time: prefTime ? TIME_OPTIONS.find((o) => o.value === prefTime)?.label.en : undefined,
        photographer: prefPhotographer.trim() || undefined,
        occasion: prefOccasion.trim() || undefined,
        accessibility: prefAccessibility.trim() || undefined,
      },
      remarks: extra || undefined,
      reference,
      source: variant === 'compact' ? 'quick-match' : 'booking',
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
      track('booking_completed', { variant, city: place, service: session, people });
    } catch (e) {
      setStatus('failed');
      track('booking_failed', { variant, reason: e instanceof Error ? e.message : 'network' });
    }
  }

  // ------------------------------------------------------------------ render

  const frame = (children: ReactNode) =>
    variant === 'full' ? (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_22rem]">
        <div className="tile p-6 sm:p-8">{children}</div>
        {summary()}
      </div>
    ) : (
      <div className="tile p-5 sm:p-8">{children}</div>
    );

  function summary() {
    const rows: Array<{ step: StepId; label: string; value: string }> = [
      { step: 'where', label: t(UI.where, locale), value: placeName },
      { step: 'what', label: t(UI.what, locale), value: sessionName },
      { step: 'when', label: t(UI.when, locale), value: dateLabel },
      { step: 'who', label: t(UI.who, locale), value: peopleLabel },
    ];
    return (
      <aside data-surface="dark" className="relative overflow-hidden bg-brand-dark p-7 text-white lg:sticky lg:top-24 lg:self-start">
        <h2 className="font-display text-2xl font-bold text-white">{t(UI.summary, locale)}</h2>
        <dl className="mt-5 border-t border-brand-rule text-sm">
          {rows.map((row) => (
            <div key={row.step} className="flex items-baseline justify-between gap-4 border-b border-brand-rule py-3">
              <dt className="text-brand-muted">{row.label}</dt>
              <dd className="text-right font-medium text-white">
                {row.value ? (
                  <button
                    type="button"
                    onClick={() => goTo(row.step)}
                    disabled={status !== 'idle' || steps.indexOf(row.step) >= stepIndex}
                    className="text-right underline-offset-4 enabled:hover:underline disabled:cursor-default"
                    aria-label={`${t(UI.edit, locale)}: ${row.label} — ${row.value}`}
                  >
                    {row.value}
                  </button>
                ) : (
                  <span aria-hidden="true">—</span>
                )}
              </dd>
            </div>
          ))}
        </dl>
        {sessionOption && (
          <p className="mt-5 text-sm text-brand-muted">
            {sessionOption.name}: {t(UI.from, locale)}{' '}
            <span className="font-display text-lg font-bold text-white">{formatPrice(sessionOption.price, locale)}</span>
          </p>
        )}
        <ul className="mt-6 space-y-3 text-sm text-white">
          {[tx(MATCHING.promise, locale), tx(MATCHING.noPayment, locale), tx(REPLY_TIME, locale), tx(GUARANTEE.title, locale), tx(WEATHER.title, locale)].map(
            (line) => (
              <li key={line} className="flex gap-3">
                <CheckMark className="mt-0.5 h-4 w-4" />
                <span>{line}</span>
              </li>
            ),
          )}
        </ul>
      </aside>
    );
  }

  if (status === 'done') {
    return frame(
      <div className="py-4 text-center sm:py-8" role="status">
        <CheckMark className="mx-auto h-14 w-14" />
        <h2
          ref={headingRef}
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
          className="btn btn-outline mt-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
          data-track="whatsapp_clicked"
          data-track-context="booking-done"
        >
          <WhatsAppIcon className="h-4 w-4" />
          {tx(CTA.chatWhatsapp, locale)}
        </a>
      </div>,
    );
  }

  const heading: Record<StepId, string> = {
    where: t(UI.where, locale),
    what: t(UI.what, locale),
    when: t(UI.when, locale),
    who: t(UI.who, locale),
    prefs: t(UI.prefs, locale),
    contact: t(UI.contact, locale),
  };
  const isLast = stepIndex === steps.length - 1;
  // On the home page the widget's title is the section heading and each
  // question sits under it; on /book the page's h1 is above and the question
  // is the h2.
  const Question = variant === 'compact' ? 'h3' : 'h2';
  const errorId = `${id}-error`;

  return frame(
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (isLast) void submit();
        else next();
      }}
      onFocus={markStarted}
    >
      {variant === 'compact' && (
        <h2 id="find-photographer-heading" className="font-display text-2xl font-bold text-brand-dark sm:text-3xl">
          {t(UI.title, locale)}
        </h2>
      )}

      {/* Progress: a row of tiles, the answered ones filled. */}
      <div className={variant === 'compact' ? 'mt-4' : ''}>
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-brand-muted" aria-live="polite">
          {t(UI.stepOf, locale).replace('{n}', String(stepIndex + 1)).replace('{total}', String(steps.length))}
        </p>
        <div className="mt-2 flex gap-1" aria-hidden="true">
          {steps.map((s, i) => (
            <span key={s} className={`h-1 flex-1 ${i <= stepIndex ? 'bg-brand-orange-deep' : 'bg-brand-rule'}`} />
          ))}
        </div>
      </div>

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${id}-hp`}>Leave empty</label>
        <input
          id={`${id}-hp`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <fieldset className="mt-6" aria-describedby={error ? errorId : undefined}>
        <legend className="contents">
          <Question
            ref={headingRef}
            tabIndex={-1}
            className="font-display text-2xl font-bold text-brand-dark outline-none sm:text-[1.75rem]"
          >
            {heading[step]}
          </Question>
        </legend>

        {step === 'where' && (
          <div className="mt-5">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {[...options.places, { slug: OTHER, name: t(UI.other, locale) }].map((p) => (
                <Choice
                  key={p.slug}
                  name={`${id}-place`}
                  value={p.slug}
                  checked={place === p.slug}
                  onPick={(v, d) => choose(setPlace, v, d, () => track('destination_selected', { city: v, context: 'booking' }))}
                >
                  {p.name}
                </Choice>
              ))}
            </div>
            {place === OTHER && (
              <TextField id={`${id}-other-place`} label={t(UI.otherPlace, locale)} value={otherPlace} onChange={setOtherPlace} autoFocus />
            )}
          </div>
        )}

        {step === 'what' && (
          <div className="mt-5">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {options.sessions.map((s) => (
                <Choice
                  key={s.slug}
                  name={`${id}-session`}
                  value={s.slug}
                  checked={session === s.slug}
                  meta={`${t(UI.from, locale)} ${formatPrice(s.price, locale)}`}
                  onPick={(v, d) => choose(setSession, v, d, () => track('session_selected', { service: v, context: 'booking' }))}
                >
                  {s.name}
                </Choice>
              ))}
              <Choice name={`${id}-session`} value={OTHER} checked={session === OTHER} onPick={(v, d) => choose(setSession, v, d)}>
                {t(UI.other, locale)}
              </Choice>
            </div>
            {session === OTHER && (
              <TextField id={`${id}-other-session`} label={t(UI.otherSession, locale)} value={otherSession} onChange={setOtherSession} autoFocus />
            )}
          </div>
        )}

        {step === 'when' && (
          <div className="mt-5 grid max-w-md gap-4">
            <div>
              <label htmlFor={`${id}-date`} className="field-label">
                {t(UI.date, locale)}
              </label>
              <input
                id={`${id}-date`}
                type="date"
                min={today || undefined}
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setError('');
                }}
                className="field"
              />
            </div>
            <label htmlFor={`${id}-flexible`} className="check-row">
              <input
                id={`${id}-flexible`}
                type="checkbox"
                checked={flexible}
                onChange={(e) => {
                  setFlexible(e.target.checked);
                  setError('');
                }}
                className="checkbox"
              />
              <span className="text-sm font-medium text-brand-dark">{t(UI.flexible, locale)}</span>
            </label>
          </div>
        )}

        {step === 'who' && (
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {options.groupSizes.map((g) => (
              <Choice key={g.value} name={`${id}-people`} value={g.value} checked={people === g.value} onPick={(v, d) => choose(setPeople, v, d)}>
                {g.label}
              </Choice>
            ))}
          </div>
        )}

        {step === 'prefs' && (
          <div className="mt-2">
            <p className="text-sm text-brand-muted">{t(UI.prefsLead, locale)}</p>
            <div className="mt-5 grid gap-x-5 sm:grid-cols-2">
              <TextField id={`${id}-pref-location`} label={t(UI.prefLocation, locale)} placeholder={t(UI.prefLocationHint, locale)} value={prefLocation} onChange={setPrefLocation} />
              <div className="mt-4">
                <label htmlFor={`${id}-pref-time`} className="field-label">
                  {t(UI.prefTime, locale)}
                </label>
                <select id={`${id}-pref-time`} value={prefTime} onChange={(e) => setPrefTime(e.target.value)} className="field">
                  {TIME_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label[locale]}
                    </option>
                  ))}
                </select>
              </div>
              <TextField id={`${id}-pref-photographer`} label={t(UI.prefPhotographer, locale)} placeholder={t(UI.prefPhotographerHint, locale)} value={prefPhotographer} onChange={setPrefPhotographer} />
              <TextField id={`${id}-pref-occasion`} label={t(UI.prefOccasion, locale)} placeholder={t(UI.prefOccasionHint, locale)} value={prefOccasion} onChange={setPrefOccasion} />
            </div>
            <TextField id={`${id}-pref-access`} label={t(UI.prefAccessibility, locale)} value={prefAccessibility} onChange={setPrefAccessibility} multiline />
            <TextField id={`${id}-notes`} label={t(UI.prefNotes, locale)} placeholder={t(UI.prefNotesHint, locale)} value={notes} onChange={setNotes} multiline />
          </div>
        )}

        {step === 'contact' && (
          <div className="mt-2 grid gap-x-5 sm:grid-cols-2">
            <TextField id={`${id}-name`} label={t(UI.name, locale)} value={name} onChange={setName} autoComplete="name" />
            <TextField id={`${id}-phone`} label={t(UI.phone, locale)} placeholder={t(UI.phoneHint, locale)} value={phone} onChange={setPhone} type="tel" autoComplete="tel" />
            <div className="sm:col-span-2">
              <TextField id={`${id}-email`} label={t(UI.email, locale)} value={email} onChange={setEmail} type="email" autoComplete="email" />
            </div>
          </div>
        )}
      </fieldset>

      {error && (
        <p id={errorId} role="alert" className="mt-4 border-l-[3px] border-brand-error pl-3 text-sm font-medium text-brand-error">
          {error}
        </p>
      )}

      {status === 'failed' && (
        <div role="alert" className="mt-6 border border-brand-error bg-brand-tile p-5">
          <p className="font-display text-lg font-semibold text-brand-dark">{t(UI.failTitle, locale)}</p>
          <p className="mt-1 text-sm text-brand-muted">{t(UI.failBody, locale)}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
              data-track="whatsapp_clicked"
              data-track-context="booking-failed"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {tx(CTA.chatWhatsapp, locale)}
            </a>
            <button type="submit" className="btn btn-outline btn-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark">
              {t(UI.retry, locale)}
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {stepIndex > 0 && (
          <button type="button" onClick={back} className="btn btn-outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark">
            {t(UI.back, locale)}
          </button>
        )}
        {status !== 'failed' && (
          <button
            type="submit"
            disabled={status === 'sending'}
            className="btn btn-primary flex-1 sm:flex-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
          >
            {isLast
              ? status === 'sending'
                ? t(UI.sending, locale)
                : tx(CTA.checkAvailability, locale)
              : step === 'prefs' && !prefLocation && !prefTime && !prefPhotographer && !prefOccasion && !prefAccessibility && !notes
                ? t(UI.skip, locale)
                : t(UI.continue, locale)}
            {status !== 'sending' && <ArrowIcon />}
          </button>
        )}
      </div>

      {(variant === 'compact' || isLast) && (
        <p className="mt-5 text-sm leading-relaxed text-brand-muted">
          {tx(MATCHING.promise, locale)} {tx(MATCHING.noPayment, locale)}
        </p>
      )}
    </form>,
  );
}

// ---------------------------------------------------------------- controls

function Choice({
  name,
  value,
  checked,
  meta,
  onPick,
  children,
}: {
  name: string;
  value: string;
  checked: boolean;
  meta?: string;
  onPick: (value: string, byPointer: number) => void;
  children: ReactNode;
}) {
  // A tap on the label reaches the input as a synthetic click whose `detail`
  // differs between engines, so the pointer is detected where it lands.
  const pointer = useRef(false);
  return (
    <label className="choice" onPointerDown={() => (pointer.current = true)}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => undefined}
        onClick={() => {
          onPick(value, pointer.current ? 1 : 0);
          pointer.current = false;
        }}
        className="sr-only"
      />
      <span className="font-medium">{children}</span>
      {meta && <span className="choice-meta">{meta}</span>}
    </label>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  autoComplete,
  autoFocus,
  multiline,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  multiline?: boolean;
}) {
  return (
    <div className="mt-4">
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {multiline ? (
        <textarea id={id} rows={2} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="field resize-y" />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          onChange={(e) => onChange(e.target.value)}
          className="field"
        />
      )}
    </div>
  );
}

function formatDateShort(iso: string, locale: Locale): string {
  const d = new Date(`${iso}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(locale === 'pt' ? 'pt-PT' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(d);
}
