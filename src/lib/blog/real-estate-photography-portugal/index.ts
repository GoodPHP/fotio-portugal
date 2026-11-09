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

/** Listing photography by the compass: which room at which hour, and what the owner does before the visit. */
export const REAL_ESTATE_PHOTOGRAPHY_PORTUGAL: BlogPost = {
  slug: 'real-estate-photography-portugal',
  date: '2026-11-09',
  readTime: '6 min',
  cover: 'services/real-estate',
  title: localized((c) => c.title),
  summary: localized((c) => c.summary),
  coverAlt: localized((c) => c.coverAlt),
  section: localized((c) => c.section),
  content: localized((c) => c.body),
  faqs,
  relatedServices: ['real-estate'],
};
