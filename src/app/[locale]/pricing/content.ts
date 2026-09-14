import type { Localized } from '@/lib/locales';

/**
 * Search-facing copy for the pricing page: SERP title and description, plus the
 * long-form passage that closes the page below the price table.
 *
 * English is authored; French falls back to it via `tx()` until translated.
 */

/** ≤60 chars once the layout appends the brand suffix. */
export const META_TITLE: Localized = {
  en: 'Photo Session Prices in France — From €150',
  pt: 'PT_TODO: Photo Session Prices in France — From €150',
};

export const META_DESCRIPTION: Localized = {
  en: 'What a photographer costs in France: from €150 for a portrait to €2,200 for a wedding day. Editing and a private gallery included, no hidden extras.',
  pt: 'PT_TODO: What a photographer costs in France: from €150 for a portrai',
};

export const OG_IMAGE_ALT: Localized = {
  en: 'A family session photographed by the Ylala network, priced from a fixed published rate',
  pt: 'PT_TODO: A family session photographed by the Ylala network, priced f',
};

export const SEO_PROSE = {
  eyebrow: { en: 'How pricing works', pt: 'PT_TODO: How pricing works' } as Localized,
  heading: {
    en: 'What the number covers, and what moves it',
    pt: 'PT_TODO: What the number covers, and what moves it',
  } as Localized,
  paragraphs: {
    en: [
      'Every figure in the table is a starting price for that session type, and it is the same in all twenty-two cities: a portrait in Lille costs what a portrait in Nice costs. Prices run from €150 for a short portrait or a surprise proposal to €2,200 for a full wedding day, with couples, families, maternity and corporate work in between.',
      'The price covers the photographer’s time on the shoot, the selection, the colour and light editing, and a private online gallery in full resolution with a personal licence to print and share. There is no charge per additional photograph, no retouching sold as an upgrade, and no travel supplement inside the city you booked.',
      'Three things move the number, and all three are agreed before the shoot rather than after it. Length: a session run at one-and-a-half or two times the standard duration is priced accordingly. A second photographer, which most full wedding days want and few other sessions need. And express delivery, if you need the gallery in twenty-four hours rather than the usual forty-eight to seventy-two.',
      'What does not move it is anything discovered on the day. If a location turns out to need a paid authorisation, we say so when you book, not when you arrive. Enquiring costs nothing and requires no deposit, the quote is confirmed in writing, and if you are not satisfied with the work you are refunded in full.',
    ],
    pt: [
    'PT_TODO: Every figure in the table is a starting price for that sessi',
    'PT_TODO: The price covers the photographer’s time on the shoot, the s',
    'PT_TODO: Three things move the number, and all three are agreed befor',
    'PT_TODO: What does not move it is anything discovered on the day. If',
  ],
  } as Localized<string[]>,
  facts: {
    en: [
      { label: 'From', value: '€150' },
      { label: 'Full wedding day', value: '€2,200' },
      { label: 'Per extra photo', value: '€0' },
      { label: 'Deposit to enquire', value: '€0' },
    ],
    pt: [
      { label: 'Desde', value: '150 €' },
      { label: 'Dia completo de casamento', value: '2 200 €' },
      { label: 'Por fotografia extra', value: '0 €' },
      { label: 'Sinal para orçamento', value: '0 €' },
    ],
  } as Localized<{ label: string; value: string }[]>,
} as const;
