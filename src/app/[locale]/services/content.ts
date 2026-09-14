import type { Localized } from '@/lib/locales';

/**
 * Search-facing copy for the services hub: SERP title and description, plus the
 * long-form passage that closes the page below the filterable catalogue.
 *
 * English is authored; French falls back to it via `tx()` until translated.
 */

/** ≤60 chars once the layout appends the brand suffix. */
export const META_TITLE: Localized = {
  en: 'Photography Services in France — Fixed Prices',
  pt: 'PT_TODO: Photography Services in France — Fixed Prices',
};

export const META_DESCRIPTION: Localized = {
  en: '33 session types across France: portraits, couples, families, weddings, corporate and food. The price is agreed before you book, the gallery lands in 48–72h.',
  pt: 'PT_TODO: 33 session types across France: portraits, couples, families',
};

export const OG_IMAGE_ALT: Localized = {
  en: 'A Ylala portrait session — one of thirty-three photography services available across France',
  pt: 'PT_TODO: A Ylala portrait session — one of thirty-three photography s',
};

export const SEO_PROSE = {
  eyebrow: { en: 'About these services', pt: 'PT_TODO: About these services' } as Localized,
  heading: {
    en: 'One catalogue, one price list, thirty-three kinds of session',
    pt: 'PT_TODO: One catalogue, one price list, thirty-three kinds of session',
  } as Localized,
  paragraphs: {
    en: [
      'The catalogue above is the whole of what the network shoots, grouped into nine families: portrait and personal branding, couples and engagements, family and newborn, weddings and elopements, travel and holidays, business and corporate, commercial and food, fashion and lookbook, and the sessions that fit nowhere else — christenings, school photography, birthdays, hen parties.',
      'Each service carries a starting price, and that price is the number you pay. It covers the photographer’s time on the shoot, the selection and the colour work afterwards, and a private online gallery in full resolution with a personal licence to print and post. There is no per-image charge, no retouching upsell and no travel supplement inside the city you booked.',
      'What separates the categories is mostly time and coordination rather than equipment. A forty-five-minute portrait or a surprise proposal needs one photographer and a location scouted at the right hour. A wedding day needs a schedule agreed weeks ahead, often a second shooter, and someone who has already worked the venue. Corporate headshots need consistency across a team rather than a single flattering frame, which is a different craft again.',
      'Every service page lists what is included, how long the session runs, how many edited photographs you receive and what the options cost. If you are unsure which one fits, describe the occasion and we will point you at the right category — enquiring costs nothing and needs no deposit.',
    ],
    pt: [
    'PT_TODO: The catalogue above is the whole of what the network shoots,',
    'PT_TODO: Each service carries a starting price, and that price is the',
    'PT_TODO: What separates the categories is mostly time and coordinatio',
    'PT_TODO: Every service page lists what is included, how long the sess',
  ],
  } as Localized<string[]>,
  facts: {
    en: [
      { label: 'Session types', value: '22' },
      { label: 'Categories', value: '9' },
      { label: 'Cities covered', value: '12' },
      { label: 'Gallery delivery', value: '48–72h' },
    ],
    pt: [
      { label: 'Tipos de sessão', value: '22' },
      { label: 'Categorias', value: '9' },
      { label: 'Cidades cobertas', value: '12' },
      { label: 'Entrega da galeria', value: '48–72h' },
    ],
  } as Localized<{ label: string; value: string }[]>,
} as const;
