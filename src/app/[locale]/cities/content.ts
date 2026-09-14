import type { Localized } from '@/lib/locales';

/**
 * Search-facing copy for the cities hub: SERP title and description, plus the
 * long-form passage that closes the page below the searchable directory.
 *
 * English is authored; French falls back to it via `tx()` until translated.
 */

/** ≤60 chars once the layout appends the brand suffix. */
export const META_TITLE: Localized = {
  en: 'Photographers in 22 Cities Across France',
  pt: 'PT_TODO: Photographers in 22 Cities Across France',
};

export const META_DESCRIPTION: Localized = {
  en: 'Find a vetted local photographer in Paris, Nice, Bordeaux, Annecy and 18 more French cities. Fixed price before you book, private gallery in 48–72h.',
  pt: 'PT_TODO: Find a vetted local photographer in Paris, Nice, Bordeaux, A',
};

export const OG_IMAGE_ALT: Localized = {
  en: 'Paris at the hour our photographers shoot it — one of 22 French cities in the network',
  pt: 'PT_TODO: Paris at the hour our photographers shoot it — one of 22 Fre',
};

export const SEO_PROSE = {
  eyebrow: { en: 'About our coverage', pt: 'PT_TODO: About our coverage' } as Localized,
  heading: {
    en: 'Local photographers, not photographers who travel in',
    pt: 'PT_TODO: Local photographers, not photographers who travel in',
  } as Localized,
  paragraphs: {
    en: [
      'The directory above covers twenty-two places, and they fall into two groups. Ten are the cities people live and work in — Paris, Lyon, Marseille, Bordeaux, Toulouse, Nice, Lille, Nantes, Strasbourg and Montpellier — where the demand is corporate headshots, family sessions, engagements and weddings booked months ahead. The rest are the places people travel to: Aix-en-Provence, Avignon, Cannes, Saint-Tropez, Annecy, Chamonix, Colmar, Mont-Saint-Michel, Étretat, Biarritz, Carcassonne and Reims.',
      'Every photographer in the network lives in the city they are listed under. That is the whole basis of the thing. A visiting photographer can find a landmark; a resident knows that the Trocadéro is unusable after nine in the morning, that the Étretat cliffs need the tide table more than the weather forecast, and that Colmar in December is a different assignment from Colmar in June.',
      'The same applies to paperwork. Photography rules in France vary by site and by commune: some châteaux and museums require a written authorisation, drone work is restricted almost everywhere, and a commercial shoot on public land in Paris is not the same permission as a private one. A local photographer knows which of those actually apply to your session and what they cost, rather than discovering it on the day.',
      'Each city page shows the sessions available there, the starting prices, the locations worth the walk and the hours that suit them. Pricing does not change between cities — the same session costs the same in Nice as in Lille, and there is no travel supplement inside the city you book.',
    ],
    pt: [
    'PT_TODO: The directory above covers twenty-two places, and they fall',
    'PT_TODO: Every photographer in the network lives in the city they are',
    'PT_TODO: The same applies to paperwork. Photography rules in France v',
    'PT_TODO: Each city page shows the sessions available there, the start',
  ],
  } as Localized<string[]>,
  facts: {
    en: [
      { label: 'Cities & destinations', value: '12' },
      { label: 'Cities', value: '6' },
      { label: 'Travel destinations', value: '6' },
      { label: 'Travel surcharge', value: 'None' },
    ],
    pt: [
      { label: 'Cidades & destinos', value: '12' },
      { label: 'Cidades', value: '6' },
      { label: 'Destinos de viagem', value: '6' },
      { label: 'Suplemento de deslocação', value: 'Nenhum' },
    ],
  } as Localized<{ label: string; value: string }[]>,
} as const;
