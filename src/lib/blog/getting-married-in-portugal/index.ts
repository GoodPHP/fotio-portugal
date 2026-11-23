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

/** Marrying in Portugal from abroad: the civil process as the registry publishes it, and the symbolic alternative. */
export const GETTING_MARRIED_IN_PORTUGAL: BlogPost = {
  slug: 'getting-married-in-portugal',
  date: '2026-11-23',
  readTime: '7 min',
  cover: 'services/destination-wedding',
  title: localized((c) => c.title),
  summary: localized((c) => c.summary),
  coverAlt: localized((c) => c.coverAlt),
  section: localized((c) => c.section),
  content: localized((c) => c.body),
  faqs,
  cluster: 'portugal',
  relatedCities: ['lisboa', 'algarve', 'sintra', 'evora'],
  relatedServices: ['destination-wedding', 'wedding', 'elopement'],
};
