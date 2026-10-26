import type { BlogPost } from '../../types';
import type { Locale } from '../../locales';
import type { ArticleLocale } from '../types';
import { en } from './en';
import { pt } from './pt';

const CONTENT: Record<Locale, ArticleLocale> = { en, pt };

function localized<T>(pick: (content: ArticleLocale) => T) {
  return { en: pick(CONTENT.en), pt: pick(CONTENT.pt) };
}

const faqs = en.faqs.map((_, i) => ({
  question: localized((c) => (c.faqs[i] ?? en.faqs[i]).question),
  answer: localized((c) => (c.faqs[i] ?? en.faqs[i]).answer),
}));

/** Lisbon's photo locations in the order the light allows: hills in the morning, the river in the evening. */
export const LISBON_PHOTOSHOOT_LOCATIONS: BlogPost = {
  slug: 'lisbon-photoshoot-locations',
  date: '2026-10-26',
  readTime: '7 min',
  cover: 'cities/lisboa',
  title: localized((c) => c.title),
  summary: localized((c) => c.summary),
  coverAlt: localized((c) => c.coverAlt),
  section: localized((c) => c.section),
  content: localized((c) => c.body),
  faqs,
  cluster: 'lisbon',
  relatedCities: ['lisboa', 'sintra', 'cascais'],
  relatedServices: ['lisbon-photoshoot', 'couple', 'proposal', 'family'],
};
