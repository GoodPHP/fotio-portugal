'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import type { Locale } from '@/lib/locales';
import { parseContact } from '@/lib/contact-input';
import { formatPrice, whatsappLink, SITE_NAME } from '@/lib/site';
import { track } from '@/lib/analytics';
import { PROMO_IDS, isWithin, rememberPromo, type GiftType } from '@/lib/promo';
import type { GiftCardOption } from '@/lib/gift-card';
import { ArrowIcon, CheckMark, WhatsAppIcon } from '../Icons';

const UI = {
  buyerName: { en: 'Your name', pt: 'O seu nome' },
  buyerContact: { en: 'Your email or WhatsApp number', pt: 'O seu e-mail ou número de WhatsApp' },
  buyerContactHint: { en: 'you@email.com or +44…', pt: 'o.seu@email.pt ou +351…' },
  recipientName: { en: 'Recipient’s name', pt: 'Nome de quem recebe' },
  option: { en: 'Gift card for', pt: 'Vale-presente para' },
  from: { en: 'from', pt: 'desde' },
  delivery: { en: 'Who should we send the card to?', pt: 'A quem enviamos o vale?' },
  toBuyer: { en: 'Send it to me', pt: 'Enviar para mim' },
  toRecipient: { en: 'Send it to the recipient on a date', pt: 'Enviar a quem recebe, numa data' },
  sendDate: { en: 'Date to send it', pt: 'Data de envio' },
  recipientContact: { en: 'Recipient’s email', pt: 'E-mail de quem recebe' },
  message: { en: 'Message on the card', pt: 'Mensagem no vale' },
  messageHint: { en: 'Merry Christmas! Let’s go to Lisbon…', pt: 'Feliz Natal! Vamos a Lisboa…' },
  optional: { en: 'optional', pt: 'opcional' },
  submit: { en: 'Request the gift card', pt: 'Pedir o vale-presente' },
  sending: { en: 'Sending…', pt: 'A enviar…' },
  doneTitleEmail: { en: 'Thank you! We’ll email your gift card within 24 hours.', pt: 'Obrigado! Enviamos o seu vale-presente por e-mail em 24 horas.' },
  doneTitlePhone: { en: 'Thank you! We’ll send your gift card on WhatsApp within 24 hours.', pt: 'Obrigado! Enviamos o seu vale-presente pelo WhatsApp em 24 horas.' },
  doneBody: {
    en: 'It is a printable PDF card, valid for 12 months. The recipient picks the place and the date later.',
    pt: 'É um vale em PDF, para imprimir, válido durante 12 meses. Quem recebe escolhe o sítio e a data depois.',
  },
  failTitle: { en: 'We couldn’t send your request just now.', pt: 'Não conseguimos enviar o seu pedido agora.' },
  failBody: { en: 'Nothing is lost: send it on WhatsApp instead, or try again.', pt: 'Nada se perdeu: envie-o pelo WhatsApp, ou tente de novo.' },
  retry: { en: 'Try again', pt: 'Tentar de novo' },
  whatsapp: { en: 'Send on WhatsApp', pt: 'Enviar pelo WhatsApp' },
  errName: { en: 'Enter your name.', pt: 'Indique o seu nome.' },
  errContact: { en: 'Enter an email or a WhatsApp number with country code.', pt: 'Indique um e-mail ou um número de WhatsApp com indicativo.' },
  errRecipient: { en: 'Enter the recipient’s name.', pt: 'Indique o nome de quem recebe.' },
  errDate: { en: 'Choose the date to send it.', pt: 'Escolha a data de envio.' },
  waIntro: { en: `Hi ${SITE_NAME}! I’d like a gift card.`, pt: `Olá ${SITE_NAME}! Gostaria de um vale-presente.` },
} as const;

type Copy = { en: string; pt: string };
const t = (copy: Copy, locale: Locale) => copy[locale];

type Status = 'idle' | 'sending' | 'done' | 'failed';

/**
 * The gift card request. No online payment: the request goes to `/api/lead`
 * like every other form, and the PDF card is made and sent by hand.
 */
export default function GiftCardForm({ options, locale }: { options: GiftCardOption[]; locale: Locale }) {
  const id = useId();
  const [buyerName, setBuyerName] = useState('');
  const [contact, setContact] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [type, setType] = useState<GiftType>(options[0]?.type ?? 'couple');
  const [delivery, setDelivery] = useState<'buyer' | 'recipient'>('buyer');
  const [sendDate, setSendDate] = useState('');
  const [recipientContact, setRecipientContact] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [sentByEmail, setSentByEmail] = useState(true);
  const [today, setToday] = useState('');

  // The page is a gift card promo page: a lead started here is attributed to it.
  useEffect(() => {
    rememberPromo(PROMO_IDS.gift);
    setToday(new Date().toISOString().slice(0, 10));
  }, []);

  const doneRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (status === 'done') doneRef.current?.focus();
  }, [status]);

  const chosen = options.find((o) => o.type === type);
  const whatsappHref = whatsappLink(
    [
      t(UI.waIntro, locale),
      chosen ? `${t(UI.option, locale)}: ${chosen.name}` : '',
      recipientName.trim() ? `${t(UI.recipientName, locale)}: ${recipientName.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n'),
  );

  async function submit() {
    const parsedContact = parseContact(contact);
    const next = {
      buyerName: buyerName.trim().length < 2 ? t(UI.errName, locale) : undefined,
      contact: parsedContact ? undefined : t(UI.errContact, locale),
      recipientName: recipientName.trim().length < 1 ? t(UI.errRecipient, locale) : undefined,
      sendDate: delivery === 'recipient' && !sendDate ? t(UI.errDate, locale) : undefined,
    };
    setErrors(next);
    if (Object.values(next).some(Boolean) || !parsedContact) return;

    // During Black Friday the request is attributed to it, so the alert says
    // the discount applies.
    const promoId = isWithin('blackFriday') ? PROMO_IDS.blackFriday : PROMO_IDS.gift;

    setStatus('sending');
    const payload = {
      name: buyerName.trim(),
      ...parsedContact,
      serviceSlug: type,
      source: 'gift-card',
      promoId,
      gift: {
        type,
        recipientName: recipientName.trim(),
        delivery,
        sendDate: delivery === 'recipient' ? sendDate : undefined,
        recipientContact: delivery === 'recipient' ? recipientContact.trim() || undefined : undefined,
        message: message.trim() || undefined,
      },
      preferences: { occasion: 'Gift card' },
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
      setSentByEmail('email' in parsedContact);
      setStatus('done');
      track('gift_card_request', { promo_id: promoId, gift_type: type, delivery });
      track('generate_lead', { promo_id: promoId, gift_type: type, form: 'gift_card' });
    } catch {
      setStatus('failed');
    }
  }

  const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark';
  const optional = <span className="font-normal text-brand-muted"> ({t(UI.optional, locale)})</span>;

  if (status === 'done') {
    return (
      <div className="tile p-6 py-10 text-center sm:p-8 sm:py-12" role="status">
        <CheckMark className="mx-auto h-14 w-14" />
        <h2
          ref={doneRef}
          tabIndex={-1}
          className="font-display mx-auto mt-6 max-w-xl text-2xl font-bold text-brand-dark outline-none sm:text-3xl"
        >
          {t(sentByEmail ? UI.doneTitleEmail : UI.doneTitlePhone, locale)}
        </h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-brand-muted">{t(UI.doneBody, locale)}</p>
      </div>
    );
  }

  return (
    <form
      noValidate
      className="tile p-6 sm:p-8"
      data-gift-form
      onSubmit={(e) => {
        e.preventDefault();
        void submit();
      }}
    >
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${id}-hp`}>Leave empty</label>
        <input id={`${id}-hp`} type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      <fieldset>
        <legend className="field-label">{t(UI.option, locale)}</legend>
        <div className="mt-2 grid gap-3 sm:grid-cols-3">
          {options.map((o) => (
            <label
              key={o.type}
              className={`flex cursor-pointer flex-col gap-1 border p-4 transition-colors ${
                type === o.type ? 'border-brand-orange-deep bg-brand-cream' : 'border-brand-rule hover:border-brand-rule-strong'
              }`}
            >
              <span className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`${id}-type`}
                  value={o.type}
                  checked={type === o.type}
                  onChange={() => setType(o.type)}
                  className="accent-brand-orange-deep"
                />
                <span className="font-display font-semibold text-brand-dark">{o.name}</span>
              </span>
              <span className="text-sm text-brand-muted">
                {t(UI.from, locale)} {formatPrice(o.price, locale)}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-x-5 sm:grid-cols-2">
        <Field id={`${id}-buyer`} label={t(UI.buyerName, locale)} required error={errors.buyerName}>
          <input id={`${id}-buyer`} type="text" autoComplete="name" value={buyerName} onChange={(e) => setBuyerName(e.target.value)} aria-invalid={Boolean(errors.buyerName)} className="field" />
        </Field>
        <Field id={`${id}-contact`} label={t(UI.buyerContact, locale)} required error={errors.contact}>
          <input
            id={`${id}-contact`}
            type="text"
            autoComplete="email"
            placeholder={t(UI.buyerContactHint, locale)}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            aria-invalid={Boolean(errors.contact)}
            className="field"
          />
        </Field>
      </div>

      <Field id={`${id}-recipient`} label={t(UI.recipientName, locale)} required error={errors.recipientName}>
        <input id={`${id}-recipient`} type="text" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} aria-invalid={Boolean(errors.recipientName)} className="field" />
      </Field>

      <fieldset className="mt-4">
        <legend className="field-label">{t(UI.delivery, locale)}</legend>
        <div className="mt-2 flex flex-col gap-2">
          {(['buyer', 'recipient'] as const).map((value) => (
            <label key={value} className="flex cursor-pointer items-center gap-2 text-brand-dark">
              <input
                type="radio"
                name={`${id}-delivery`}
                value={value}
                checked={delivery === value}
                onChange={() => setDelivery(value)}
                className="accent-brand-orange-deep"
              />
              {t(value === 'buyer' ? UI.toBuyer : UI.toRecipient, locale)}
            </label>
          ))}
        </div>
      </fieldset>

      {delivery === 'recipient' && (
        <div className="grid gap-x-5 sm:grid-cols-2">
          <Field id={`${id}-date`} label={t(UI.sendDate, locale)} required error={errors.sendDate}>
            <input id={`${id}-date`} type="date" min={today || undefined} value={sendDate} onChange={(e) => setSendDate(e.target.value)} aria-invalid={Boolean(errors.sendDate)} className="field" />
          </Field>
          <Field id={`${id}-rcontact`} label={<>{t(UI.recipientContact, locale)}{optional}</>}>
            <input id={`${id}-rcontact`} type="email" value={recipientContact} onChange={(e) => setRecipientContact(e.target.value)} maxLength={200} className="field" />
          </Field>
        </div>
      )}

      <Field id={`${id}-message`} label={<>{t(UI.message, locale)}{optional}</>}>
        <textarea
          id={`${id}-message`}
          rows={3}
          maxLength={1000}
          placeholder={t(UI.messageHint, locale)}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="field resize-y"
        />
      </Field>

      {status === 'failed' && (
        <div role="alert" className="mt-6 border border-brand-error bg-brand-tile p-5">
          <p className="font-display text-lg font-semibold text-brand-dark">{t(UI.failTitle, locale)}</p>
          <p className="mt-1 text-sm text-brand-muted">{t(UI.failBody, locale)}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={`btn btn-primary btn-sm ${focusRing}`} data-track="whatsapp_clicked" data-track-context="gift-card-failed">
              <WhatsAppIcon className="h-4 w-4" />
              {t(UI.whatsapp, locale)}
            </a>
            <button type="submit" className={`btn btn-outline btn-sm ${focusRing}`}>
              {t(UI.retry, locale)}
            </button>
          </div>
        </div>
      )}

      {status !== 'failed' && (
        <button type="submit" disabled={status === 'sending'} className={`btn btn-primary mt-8 w-full sm:w-auto ${focusRing}`}>
          {status === 'sending' ? t(UI.sending, locale) : t(UI.submit, locale)}
          {status !== 'sending' && <ArrowIcon />}
        </button>
      )}
    </form>
  );
}

function Field({ id, label, required, error, children }: { id: string; label: ReactNode; required?: boolean; error?: string; children: ReactNode }) {
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
