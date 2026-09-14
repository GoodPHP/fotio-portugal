import type { Localized } from '@/lib/locales';

/**
 * Search-facing copy for the contact page: SERP title and description, plus the
 * long-form passage that closes the page below the form.
 *
 * English is authored; French falls back to it via `tx()` until translated.
 */

/** ≤60 chars once the layout appends the brand suffix. */
export const META_TITLE: Localized = {
  en: 'Contact a Photographer in France — Reply in 2h',
  pt: 'PT_TODO: Contact a Photographer in France — Reply in 2h',
};

export const META_DESCRIPTION: Localized = {
  en: 'Ask about a shoot in any of 22 French cities. Reply within two hours by email or WhatsApp, a written quote, and no deposit to ask the question.',
  pt: 'PT_TODO: Ask about a shoot in any of 22 French cities. Reply within t',
};

export const OG_IMAGE_ALT: Localized = {
  en: 'Lyon, one of the 22 French cities you can enquire about through the Ylala network',
  pt: 'PT_TODO: Lyon, one of the 22 French cities you can enquire about thro',
};

export const SEO_PROSE = {
  eyebrow: { en: 'Before you write', pt: 'PT_TODO: Before you write' } as Localized,
  heading: {
    en: 'What to tell us, and what happens next',
    pt: 'PT_TODO: What to tell us, and what happens next',
  } as Localized,
  paragraphs: {
    en: [
      'Four things get you a real answer instead of a follow-up question: the city, the kind of session, a date or a rough window, and how many people will be in front of the camera. Anything else is useful but optional — a location you have in mind, photographs whose look you like, a time of day that has to work around a ceremony or a toddler’s nap.',
      'What comes back is a written quote with a fixed price, the name of the photographer who would take the session, and their read on what you asked for: whether the location works at that hour, whether it needs an authorisation, and what the alternative is if it does not. If we cannot cover the date, we say so straight away rather than holding the enquiry open.',
      'We reply within two hours during the working day, and WhatsApp is the fastest route if you are already travelling and need an answer between one thing and the next. Nothing in this stage costs anything and nothing commits you: there is no deposit to ask a question, and no charge until a session is confirmed in writing.',
      'For anything outside the standard catalogue — a multi-day assignment, several cities in one trip, a company shoot across offices, or a session for a venue that has its own rules — write rather than use the booking form. Those are quoted individually and are easier to get right in a sentence or two of description.',
    ],
    pt: [
    'PT_TODO: Four things get you a real answer instead of a follow-up que',
    'PT_TODO: What comes back is a written quote with a fixed price, the n',
    'PT_TODO: We reply within two hours during the working day, and WhatsA',
    'PT_TODO: For anything outside the standard catalogue — a multi-day as',
  ],
  } as Localized<string[]>,
  facts: {
    en: [
      { label: 'Typical reply', value: 'Under 2h' },
      { label: 'Cities covered', value: '12' },
      { label: 'Deposit to enquire', value: '€0' },
      { label: 'Quote format', value: 'In writing' },
    ],
    pt: [
      { label: 'Resposta habitual', value: 'Menos de 2h' },
      { label: 'Cidades cobertas', value: '12' },
      { label: 'Sinal para orçamento', value: '0 €' },
      { label: 'Orçamento', value: 'Por escrito' },
    ],
  } as Localized<{ label: string; value: string }[]>,
} as const;
