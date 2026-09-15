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

/** The photography calendar: which month, week and hour to book, by region and by session type. */
export const BEST_TIME_PHOTOSHOOT_PORTUGAL: BlogPost = {
  slug: 'best-time-photoshoot-portugal',
  date: '2026-09-15',
  readTime: '9 min',
  cover: 'cities/douro',
  title: localized((c) => c.title),
  summary: localized((c) => c.summary),
  coverAlt: localized((c) => c.coverAlt),
  section: localized((c) => c.section),
  content: localized((c) => c.body),
  faqs,
};
