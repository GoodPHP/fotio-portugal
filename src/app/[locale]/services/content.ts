import type { Localized } from '@/lib/locales';

/**
 * Search-facing copy for the services hub: SERP title and description, plus the
 * long-form passage that closes the page below the filterable catalogue.
 *
 * English is authored; French falls back to it via `tx()` until translated.
 */

/** ≤60 chars once the layout appends " | Ylala". */
export const META_TITLE: Localized = {
  en: 'Photography Services in France — Fixed Prices',
  fr: 'Services photo en France — prix fixes',
};

export const META_DESCRIPTION: Localized = {
  en: '33 session types across France: portraits, couples, families, weddings, corporate and food. The price is agreed before you book, the gallery lands in 48–72h.',
  fr: '33 types de séance partout en France : portrait, couple, famille, mariage, corporate, food. Prix fixé avant toute réservation, galerie livrée en 48 à 72 h.',
};

export const OG_IMAGE_ALT: Localized = {
  en: 'A Ylala portrait session — one of thirty-three photography services available across France',
  fr: 'Une séance portrait Ylala — l’un des trente-trois services photo disponibles en France',
};

export const SEO_PROSE = {
  eyebrow: { en: 'About these services', fr: 'À propos de ces services' } as Localized,
  heading: {
    en: 'One catalogue, one price list, thirty-three kinds of session',
    fr: 'Un catalogue, une grille tarifaire, trente-trois types de séance',
  } as Localized,
  paragraphs: {
    en: [
      'The catalogue above is the whole of what the network shoots, grouped into nine families: portrait and personal branding, couples and engagements, family and newborn, weddings and elopements, travel and holidays, business and corporate, commercial and food, fashion and lookbook, and the sessions that fit nowhere else — christenings, school photography, birthdays, hen parties.',
      'Each service carries a starting price, and that price is the number you pay. It covers the photographer’s time on the shoot, the selection and the colour work afterwards, and a private online gallery in full resolution with a personal licence to print and post. There is no per-image charge, no retouching upsell and no travel supplement inside the city you booked.',
      'What separates the categories is mostly time and coordination rather than equipment. A forty-five-minute portrait or a surprise proposal needs one photographer and a location scouted at the right hour. A wedding day needs a schedule agreed weeks ahead, often a second shooter, and someone who has already worked the venue. Corporate headshots need consistency across a team rather than a single flattering frame, which is a different craft again.',
      'Every service page lists what is included, how long the session runs, how many edited photographs you receive and what the options cost. If you are unsure which one fits, describe the occasion and we will point you at the right category — enquiring costs nothing and needs no deposit.',
    ],
    fr: [
      'Le catalogue ci-dessus représente tout ce que le réseau photographie, réparti en neuf familles : portrait et image de marque, couple et fiançailles, famille et naissance, mariage et elopement, voyage et vacances, entreprise et corporate, commercial et gastronomie, mode et lookbook, et les séances qui n’entrent nulle part ailleurs — baptêmes, photo scolaire, anniversaires, EVJF.',
      'Chaque service affiche un prix de départ, et ce prix est celui que vous payez. Il couvre le temps du photographe sur la séance, la sélection et l’étalonnage, puis une galerie privée en pleine résolution assortie d’une licence personnelle d’impression et de publication. Aucun supplément par image, aucune retouche vendue en option, aucun frais de déplacement dans la ville réservée.',
      'Ce qui sépare les catégories tient au temps et à la coordination plus qu’au matériel. Un portrait de quarante-cinq minutes ou une demande en mariage demande un photographe et un lieu repéré à la bonne heure. Une journée de mariage demande un déroulé arrêté des semaines à l’avance, souvent un second photographe, et quelqu’un qui connaît déjà le lieu. Un portrait corporate demande une cohérence sur toute une équipe, ce qui est encore un autre métier.',
      'Chaque page de service précise ce qui est inclus, la durée de la séance, le nombre de photos retouchées livrées et le coût des options. En cas de doute, décrivez l’occasion et nous vous orientons vers la bonne catégorie — la demande est gratuite et sans acompte.',
    ],
  } as Localized<string[]>,
  facts: {
    en: [
      { label: 'Session types', value: '33' },
      { label: 'Categories', value: '9' },
      { label: 'Cities covered', value: '22' },
      { label: 'Gallery delivery', value: '48–72h' },
    ],
    fr: [
      { label: 'Types de séance', value: '33' },
      { label: 'Catégories', value: '9' },
      { label: 'Villes couvertes', value: '22' },
      { label: 'Livraison galerie', value: '48–72 h' },
    ],
  } as Localized<{ label: string; value: string }[]>,
} as const;
