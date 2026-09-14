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
 * Every other page lets the layout's `%s | Ylala` template append the brand,
 * but a template does not apply to the page in the same segment as the layout
 * that declares it — so the home page carries the brand itself, and
 * `buildMetadata` recognises it and does not add a second one.
 */
export const META_TITLE: Localized = {
  en: 'Book a Photographer in France — 22 Cities | Ylala',
  fr: 'Photographe en France — 22 villes | Ylala',
};

/** 150–160 chars: what it is, what it costs, why click. */
export const META_DESCRIPTION: Localized = {
  en: 'Vetted local photographers in 22 French cities and destinations. The price is fixed in writing before you book, and your private gallery lands in 48–72 hours.',
  fr: 'Photographes locaux vérifiés dans 22 villes et destinations françaises. Prix fixé par écrit avant toute réservation, galerie privée livrée en 48 à 72 heures.',
};

export const OG_IMAGE_ALT: Localized = {
  en: 'A Ylala photographer’s frame from Paris, one of the 22 French cities we cover',
  fr: 'Une image d’un photographe Ylala à Paris, l’une des 22 villes françaises couvertes',
};

export const SEO_PROSE = {
  eyebrow: { en: 'Why Ylala', fr: 'Pourquoi Ylala' } as Localized,
  heading: {
    en: 'Photography in France, booked in the sensible order',
    fr: 'La photographie en France, réservée dans le bon ordre',
  } as Localized,
  paragraphs: {
    en: [
      'Hiring a photographer in a country you are only visiting usually means a week of email, a quote that arrives last, and a portfolio you have no way to verify. Ylala inverts that order. You choose the city and the kind of session, you see the price before you commit to anything, and the photographer who answers already lives and works where you will be standing.',
      'The network covers twenty-two French cities and destinations: Paris, Lyon, Marseille, Bordeaux, Toulouse, Nice, Lille, Nantes and Strasbourg, alongside Annecy, Chamonix, Colmar, Étretat, Mont-Saint-Michel, Saint-Tropez, Biarritz and Carcassonne. Every photographer is reviewed on published work before joining, and each one shoots the place they live in — the only reliable way to know what a location looks like at eight in the morning in October.',
      'Sessions run from a forty-five-minute portrait or surprise proposal to a full wedding day, and take in couples, families, maternity, corporate headshots, conferences, real estate and food. The fee is agreed in writing beforehand, covers the editing, and includes a private online gallery delivered within forty-eight to seventy-two hours. Nothing is billed per extra photograph.',
      'If the weather turns, we move the session at no cost. If the gallery is not what you were promised, you are refunded in full.',
    ],
    fr: [
      'Engager un photographe dans un pays où l’on ne fait que passer, c’est d’ordinaire une semaine d’e-mails, un devis qui arrive en dernier et un portfolio invérifiable. Ylala inverse cet ordre. Vous choisissez la ville et le type de séance, vous voyez le prix avant de vous engager, et le photographe qui vous répond vit et travaille déjà là où vous serez.',
      'Le réseau couvre vingt-deux villes et destinations françaises : Paris, Lyon, Marseille, Bordeaux, Toulouse, Nice, Lille, Nantes et Strasbourg, mais aussi Annecy, Chamonix, Colmar, Étretat, le Mont-Saint-Michel, Saint-Tropez, Biarritz et Carcassonne. Chaque photographe est examiné sur travaux publiés avant d’être admis, et photographie la ville où il habite — la seule façon fiable de savoir à quoi ressemble un lieu à huit heures du matin en octobre.',
      'Les séances vont du portrait ou de la demande en mariage de quarante-cinq minutes à une journée de mariage complète, et couvrent le couple, la famille, la grossesse, le portrait corporate, l’événement, l’immobilier et la gastronomie. Le tarif est fixé par écrit à l’avance, comprend la retouche et une galerie privée livrée sous quarante-huit à soixante-douze heures. Aucune photo supplémentaire n’est facturée.',
      'Si le temps tourne, la séance est déplacée sans frais. Si la galerie n’est pas celle qui vous a été promise, vous êtes remboursé intégralement.',
    ],
  } as Localized<string[]>,
  facts: {
    en: [
      { label: 'Cities covered', value: '22' },
      { label: 'Session types', value: '33' },
      { label: 'Gallery delivery', value: '48–72h' },
      { label: 'Deposit to enquire', value: '€0' },
    ],
    fr: [
      { label: 'Villes couvertes', value: '22' },
      { label: 'Types de séance', value: '33' },
      { label: 'Livraison galerie', value: '48–72 h' },
      { label: 'Acompte pour un devis', value: '0 €' },
    ],
  } as Localized<{ label: string; value: string }[]>,
} as const;
