import type { Localized } from '@/lib/locales';

/**
 * Search-facing copy for the booking page: SERP title and description, plus the
 * long-form passage that closes the page below the booking widget.
 *
 * English is authored; French falls back to it via `tx()` until translated.
 */

/** ≤60 chars once the layout appends the brand suffix. */
export const META_TITLE: Localized = {
  en: 'Book a Photo Session in France — Free Quote',
  pt: 'PT_TODO: Book a Photo Session in France — Free Quote',
};

export const META_DESCRIPTION: Localized = {
  en: 'Pick a city, a session and a date, and get a fixed price on WhatsApp in minutes. No deposit to request a quote, and nothing is charged until you confirm.',
  pt: 'PT_TODO: Pick a city, a session and a date, and get a fixed price on',
};

export const OG_IMAGE_ALT: Localized = {
  en: 'A surprise proposal session in Paris, one of the shoots you can book through Ylala',
  pt: 'PT_TODO: A surprise proposal session in Paris, one of the shoots you',
};

export const SEO_PROSE = {
  eyebrow: { en: 'How booking works', pt: 'PT_TODO: How booking works' } as Localized,
  heading: {
    en: 'From this form to a confirmed photographer',
    pt: 'PT_TODO: From this form to a confirmed photographer',
  } as Localized,
  paragraphs: {
    en: [
      'The form above collects four things — city, session type, date and group size — and turns them into a quote. You are not booking a slot at this point and nothing is charged: what you get back is a fixed price and the name of the photographer who would take the session, usually within a couple of hours on a working day.',
      'The price you are quoted is the price you pay. It covers the shoot, the editing, and a private online gallery in full resolution delivered within forty-eight to seventy-two hours, with a licence to print and share it. Extra photographs are not billed separately. The only things that change the figure are ones you choose in advance: a longer session, a second photographer, or express twenty-four-hour delivery.',
      'Once you confirm in writing, the photographer takes over the practical side — where to meet, which hour suits the location, whether an authorisation is needed and who obtains it. They live in the city they shoot, so this is settled from experience rather than researched from somewhere else.',
      'If the weather turns, the session moves at no cost. If you need to cancel, tell us as early as you can and we will work with it. And if the gallery is not what you were promised, you are refunded in full — the guarantee is why the quote can afford to be a fixed number rather than an estimate.',
    ],
    pt: [
    'PT_TODO: The form above collects four things — city, session type, da',
    'PT_TODO: The price you are quoted is the price you pay. It covers the',
    'PT_TODO: Once you confirm in writing, the photographer takes over the',
    'PT_TODO: If the weather turns, the session moves at no cost. If you n',
  ],
  } as Localized<string[]>,
  facts: {
    en: [
      { label: 'Quote turnaround', value: 'Under 2h' },
      { label: 'Deposit for a quote', value: '€0' },
      { label: 'Gallery delivery', value: '48–72h' },
      { label: 'Weather reschedule', value: 'Free' },
    ],
    pt: [
      { label: 'Resposta ao orçamento', value: 'Menos de 2h' },
      { label: 'Sinal para orçamento', value: '0 €' },
      { label: 'Entrega da galeria', value: '48–72h' },
      { label: 'Remarcação por chuva', value: 'Grátis' },
    ],
  } as Localized<{ label: string; value: string }[]>,
} as const;
