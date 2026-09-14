import type { BlogPost } from '../../types';
import type { Locale } from '../../locales';
import type { ArticleLocale } from '../types';
import { en } from './en';
import { fr } from './fr';

const CONTENT: Record<Locale, ArticleLocale> = { en, fr };

function localized<T>(pick: (content: ArticleLocale) => T) {
  return { en: pick(CONTENT.en), fr: pick(CONTENT.fr) };
}

const faqs = en.faqs.map((_, i) => ({
  question: localized((c) => (c.faqs[i] ?? en.faqs[i]).question),
  answer: localized((c) => (c.faqs[i] ?? en.faqs[i]).answer),
}));

/**
 * Pillar article on French photography permits — the reference every city page
 * defers to rather than restating a rule that would be wrong somewhere.
 */
export const PHOTOGRAPHY_PERMITS_FRANCE: BlogPost = {
  slug: 'photography-permits-france',
  date: '2026-09-08',
  readTime: '10 min',
  author: 'Camille Aubert',
  cover: '/images/cities/paris.jpg',
  title: localized((c) => c.title),
  summary: localized((c) => c.summary),
  coverAlt: localized((c) => c.coverAlt),
  section: localized((c) => c.section),
  content: localized((c) => c.body),
  faqs,
};
