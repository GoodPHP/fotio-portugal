import type { Localized } from '@/lib/locales';

/**
 * Search-facing copy for the cities hub: SERP title and description, plus the
 * long-form passage that closes the page below the searchable directory.
 *
 * English is authored; French falls back to it via `tx()` until translated.
 */

/** ≤60 chars once the layout appends " | Ylala". */
export const META_TITLE: Localized = {
  en: 'Photographers in 22 Cities Across France',
  fr: 'Photographes dans 22 villes de France',
};

export const META_DESCRIPTION: Localized = {
  en: 'Find a vetted local photographer in Paris, Nice, Bordeaux, Annecy and 18 more French cities. Fixed price before you book, private gallery in 48–72h.',
  fr: 'Trouvez un photographe local vérifié à Paris, Nice, Bordeaux, Annecy et 18 autres villes françaises. Prix fixe avant réservation, galerie en 48–72 h.',
};

export const OG_IMAGE_ALT: Localized = {
  en: 'Paris at the hour our photographers shoot it — one of 22 French cities in the network',
  fr: 'Paris à l’heure où nos photographes la photographient — l’une des 22 villes du réseau',
};

export const SEO_PROSE = {
  eyebrow: { en: 'About our coverage', fr: 'À propos de notre couverture' } as Localized,
  heading: {
    en: 'Local photographers, not photographers who travel in',
    fr: 'Des photographes locaux, pas des photographes de passage',
  } as Localized,
  paragraphs: {
    en: [
      'The directory above covers twenty-two places, and they fall into two groups. Ten are the cities people live and work in — Paris, Lyon, Marseille, Bordeaux, Toulouse, Nice, Lille, Nantes, Strasbourg and Montpellier — where the demand is corporate headshots, family sessions, engagements and weddings booked months ahead. The rest are the places people travel to: Aix-en-Provence, Avignon, Cannes, Saint-Tropez, Annecy, Chamonix, Colmar, Mont-Saint-Michel, Étretat, Biarritz, Carcassonne and Reims.',
      'Every photographer in the network lives in the city they are listed under. That is the whole basis of the thing. A visiting photographer can find a landmark; a resident knows that the Trocadéro is unusable after nine in the morning, that the Étretat cliffs need the tide table more than the weather forecast, and that Colmar in December is a different assignment from Colmar in June.',
      'The same applies to paperwork. Photography rules in France vary by site and by commune: some châteaux and museums require a written authorisation, drone work is restricted almost everywhere, and a commercial shoot on public land in Paris is not the same permission as a private one. A local photographer knows which of those actually apply to your session and what they cost, rather than discovering it on the day.',
      'Each city page shows the sessions available there, the starting prices, the locations worth the walk and the hours that suit them. Pricing does not change between cities — the same session costs the same in Nice as in Lille, and there is no travel supplement inside the city you book.',
    ],
    fr: [
      'Le répertoire ci-dessus couvre vingt-deux lieux, répartis en deux groupes. Dix sont des villes où l’on vit et travaille — Paris, Lyon, Marseille, Bordeaux, Toulouse, Nice, Lille, Nantes, Strasbourg et Montpellier — où la demande porte sur le portrait corporate, la famille, les fiançailles et les mariages réservés des mois à l’avance. Les autres sont des lieux où l’on voyage : Aix-en-Provence, Avignon, Cannes, Saint-Tropez, Annecy, Chamonix, Colmar, le Mont-Saint-Michel, Étretat, Biarritz, Carcassonne et Reims.',
      'Chaque photographe du réseau habite la ville sous laquelle il est référencé. C’est tout le principe. Un photographe de passage sait trouver un monument ; un résident sait que le Trocadéro devient inutilisable après neuf heures, que les falaises d’Étretat dépendent des marées plus que de la météo, et que Colmar en décembre n’a rien à voir avec Colmar en juin.',
      'Il en va de même pour les autorisations. Les règles de prise de vue varient en France selon le site et la commune : certains châteaux et musées exigent une autorisation écrite, le drone est restreint presque partout, et une prise de vue commerciale sur le domaine public parisien n’est pas la même démarche qu’une séance privée. Un photographe local sait lesquelles s’appliquent réellement à votre séance, et ce qu’elles coûtent.',
      'Chaque page ville présente les séances disponibles sur place, les prix de départ, les lieux qui valent le déplacement et les heures qui leur conviennent. Les tarifs ne changent pas d’une ville à l’autre — une même séance coûte le même prix à Nice qu’à Lille — et aucun frais de déplacement ne s’ajoute dans la ville réservée.',
    ],
  } as Localized<string[]>,
  facts: {
    en: [
      { label: 'Cities & destinations', value: '22' },
      { label: 'Metropolitan cities', value: '10' },
      { label: 'Travel destinations', value: '12' },
      { label: 'Travel surcharge', value: 'None' },
    ],
    fr: [
      { label: 'Villes & destinations', value: '22' },
      { label: 'Grandes villes', value: '10' },
      { label: 'Destinations voyage', value: '12' },
      { label: 'Frais de déplacement', value: 'Aucun' },
    ],
  } as Localized<{ label: string; value: string }[]>,
} as const;
