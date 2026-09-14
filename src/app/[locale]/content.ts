import type { Localized } from '@/lib/locales';

/**
 * Search-facing copy for the home page: the SERP title and description, and the
 * long-form editorial passage that closes the page.
 *
 * Kept out of `page.tsx` for the same reason the About page keeps its own
 * content module — the layout file should not double as a copy deck. The hero
 * strings stay in `messages/*.json` because the header renders them through
 * `next-intl`; everything here is authored prose that no translation pipeline
 * touches.
 *
 * English is authored; French falls back to it via `tx()` until translated.
 */

/**
 * ≤60 chars, brand included.
 *
 * Every other page lets the layout's `%s | <brand>` template append the brand,
 * but a template does not apply to the page in the same segment as the layout
 * that declares it — so the home page carries the brand itself, and
 * `buildMetadata` recognises it and does not add a second one.
 */
export const META_TITLE: Localized = {
  en: 'Book a Photographer in France — 22 Cities | Ylala',
  pt: 'PT_TODO: Book a Photographer in France — 22 Cities | Ylala',
};

/** 150–160 chars: what it is, what it costs, why click. */
export const META_DESCRIPTION: Localized = {
  en: 'Vetted local photographers in 22 French cities and destinations. The price is fixed in writing before you book, and your private gallery lands in 48–72 hours.',
  pt: 'PT_TODO: Vetted local photographers in 22 French cities and destinati',
};

export const OG_IMAGE_ALT: Localized = {
  en: 'A Ylala photographer’s frame from Paris, one of the 22 French cities we cover',
  pt: 'PT_TODO: A Ylala photographer’s frame from Paris, one of the 22 Frenc',
};

export const SEO_PROSE = {
  eyebrow: { en: 'Why Ylala', pt: 'PT_TODO: Why Ylala' } as Localized,
  heading: {
    en: 'Photography in France, booked in the sensible order',
    pt: 'PT_TODO: Photography in France, booked in the sensible order',
  } as Localized,
  paragraphs: {
    en: [
      'Hiring a photographer in a country you are only visiting usually means a week of email, a quote that arrives last, and a portfolio you have no way to verify. Ylala inverts that order. You choose the city and the kind of session, you see the price before you commit to anything, and the photographer who answers already lives and works where you will be standing.',
      'The network covers twenty-two French cities and destinations: Paris, Lyon, Marseille, Bordeaux, Toulouse, Nice, Lille, Nantes and Strasbourg, alongside Annecy, Chamonix, Colmar, Étretat, Mont-Saint-Michel, Saint-Tropez, Biarritz and Carcassonne. Every photographer is reviewed on published work before joining, and each one shoots the place they live in — the only reliable way to know what a location looks like at eight in the morning in October.',
      'Sessions run from a forty-five-minute portrait or surprise proposal to a full wedding day, and take in couples, families, maternity, corporate headshots, conferences, real estate and food. The fee is agreed in writing beforehand, covers the editing, and includes a private online gallery delivered within forty-eight to seventy-two hours. Nothing is billed per extra photograph.',
      'If the weather turns, we move the session at no cost. If the gallery is not what you were promised, you are refunded in full.',
    ],
    pt: [
    'PT_TODO: Hiring a photographer in a country you are only visiting usu',
    'PT_TODO: The network covers twenty-two French cities and destinations',
    'PT_TODO: Sessions run from a forty-five-minute portrait or surprise p',
    'PT_TODO: If the weather turns, we move the session at no cost. If the',
  ],
  } as Localized<string[]>,
  facts: {
    en: [
      { label: 'Cities covered', value: '12' },
      { label: 'Session types', value: '22' },
      { label: 'Gallery delivery', value: '48–72h' },
      { label: 'Deposit to enquire', value: '€0' },
    ],
    pt: [
      { label: 'Cidades cobertas', value: '12' },
      { label: 'Tipos de sessão', value: '22' },
      { label: 'Entrega da galeria', value: '48–72h' },
      { label: 'Sinal para orçamento', value: '0 €' },
    ],
  } as Localized<{ label: string; value: string }[]>,
} as const;
