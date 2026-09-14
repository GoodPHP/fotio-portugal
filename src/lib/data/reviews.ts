import type { Review } from '../types';

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Sarah & David',
    citySlug: 'paris',
    cityName: 'Paris',
    stars: 5,
    date: '2026-05-12',
    text: {
      en: 'We were told to be at the Trocadéro at half past six and thought it was excessive. We had the place to ourselves for forty minutes. By the time we left there were three coaches unloading.',
      fr: 'On nous a demandé d’être au Trocadéro à six heures et demie et cela nous a paru excessif. Nous avons eu l’endroit pour nous pendant quarante minutes. En repartant, trois autocars se vidaient.',
    },
    serviceName: { en: 'Proposal', fr: 'Demande en mariage' },
  },
  {
    id: 'r2',
    name: 'Claire M.',
    citySlug: 'lyon',
    cityName: 'Lyon',
    stars: 5,
    date: '2026-04-03',
    text: {
      en: 'Fourteen people photographed in one morning in our own meeting room, and the two colleagues who joined in September match the rest exactly. That was the part I did not expect to work.',
      fr: 'Quatorze personnes photographiées en une matinée dans notre propre salle de réunion, et les deux collègues arrivés en septembre s’accordent exactement au reste. C’est la partie que je n’attendais pas.',
    },
    serviceName: { en: 'Corporate headshots', fr: 'Photo corporate LinkedIn' },
  },
  {
    id: 'r3',
    name: 'Emma & Thomas',
    citySlug: 'annecy',
    cityName: 'Annecy',
    stars: 5,
    date: '2026-07-21',
    text: {
      en: 'We were told plainly that we could not have both the turquoise lake and the empty old town in one session. We did two short ones instead and it was obviously the right call.',
      fr: 'On nous a dit clairement que nous ne pouvions pas avoir à la fois le lac turquoise et la vieille ville vide en une seule séance. Nous en avons fait deux courtes, et c’était visiblement le bon choix.',
    },
    serviceName: { en: 'Couple session', fr: 'Séance couple' },
  },
  {
    id: 'r4',
    name: 'Marc & Julie',
    citySlug: 'bordeaux',
    cityName: 'Bordeaux',
    stars: 5,
    date: '2026-09-28',
    text: {
      en: 'The château was contacted weeks ahead about access and the curfew, and the running order was built around what they actually allowed rather than what we had assumed.',
      fr: 'La propriété a été contactée des semaines à l’avance sur les accès et le couvre-feu, et le déroulé a été construit sur ce qu’elle autorisait réellement plutôt que sur ce que nous supposions.',
    },
    serviceName: { en: 'Wedding', fr: 'Mariage' },
  },
  {
    id: 'r5',
    name: 'Anna K.',
    citySlug: 'mont-saint-michel',
    cityName: 'Mont-Saint-Michel',
    stars: 5,
    date: '2026-03-15',
    text: {
      en: 'We picked the date off a tide table rather than a diary. The water came all the way up to the causeway, exactly as described three months earlier.',
      fr: 'Nous avons choisi la date sur un annuaire des marées plutôt que sur un agenda. L’eau est montée jusqu’à la digue, exactement comme annoncé trois mois plus tôt.',
    },
    serviceName: { en: 'Couple session', fr: 'Séance couple' },
  },
];
