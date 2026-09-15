import type { Locale } from './locales';
import type { ServiceLanding } from './data/service-landing';
import type { BlogPost, Service } from './types';

/**
 * Structural checks on authored page copy, shared by `scripts/check-seo.ts`
 * and the unit tests. Pure: each returns the problems it found as sentences,
 * and an empty list means the copy is complete.
 */

export const LANDING_LIMITS = {
  promiseMax: 170,
  audience: [3, 3],
  process: [4, 4],
  prepare: [4, 6],
  faqs: [4, 6],
} as const;

/** Case- and punctuation-insensitive, so "What should I bring?" matches "what should I bring". */
const normalise = (text: string): string => text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();

function countProblem(label: string, name: string, length: number, [min, max]: readonly [number, number]): string | null {
  if (length >= min && length <= max) return null;
  const expected = min === max ? `${min}` : `${min}–${max}`;
  return `${label}: ${name} has ${length}, expected ${expected}`;
}

/**
 * Problems with a service's conversion sections in one language.
 *
 * Text must be authored in `locale` itself: `tx()` would silently render the
 * English to a Portuguese reader, which is exactly the gap this is for.
 */
export function landingProblems(service: Service, landing: ServiceLanding | undefined, locale: Locale): string[] {
  const label = `service ${service.slug} (${locale})`;
  if (!landing) return [`${label}: no entry in service-landing*.ts`];

  const problems: string[] = [];
  const promise = landing.promise[locale];
  if (!promise) problems.push(`${label}: promise has no ${locale} text`);
  else if (promise.length > LANDING_LIMITS.promiseMax) {
    problems.push(`${label}: promise is ${promise.length} chars, over ${LANDING_LIMITS.promiseMax}`);
  }

  const lists = [
    ['audience', landing.audience[locale], LANDING_LIMITS.audience],
    ['process', landing.process[locale], LANDING_LIMITS.process],
    ['prepare', landing.prepare[locale], LANDING_LIMITS.prepare],
  ] as const;
  for (const [name, list, range] of lists) {
    if (!list) problems.push(`${label}: ${name} has no ${locale} text`);
    else {
      const problem = countProblem(label, name, list.length, range);
      if (problem) problems.push(problem);
    }
  }

  const faqCount = countProblem(label, 'faqs', landing.faqs.length, LANDING_LIMITS.faqs);
  if (faqCount) problems.push(faqCount);

  const catalogue = new Set((service.faqs ?? []).map((f) => normalise(f.question[locale] ?? f.question.en)));
  landing.faqs.forEach((faq, i) => {
    const question = faq.question[locale];
    if (!question || !faq.answer[locale]) {
      problems.push(`${label}: faq ${i + 1} has no ${locale} text`);
      return;
    }
    if (catalogue.has(normalise(question))) {
      problems.push(`${label}: faq "${question}" repeats a question already in services.ts`);
    }
  });

  return problems;
}

/**
 * Problems with an article's SERP copy and share card in one language.
 * `hasShareCard` is injected so this stays free of the generated image manifest.
 */
export function articleProblems(
  post: BlogPost,
  locale: Locale,
  { brandSuffix, titleMax, descriptionMax, hasShareCard }: {
    brandSuffix: string;
    titleMax: number;
    descriptionMax: number;
    hasShareCard: (slot: string) => boolean;
  },
): string[] {
  const label = `article ${post.slug} (${locale})`;
  const problems: string[] = [];
  const title = post.title[locale];
  const summary = post.summary[locale];
  if (!title) problems.push(`${label}: title has no ${locale} text`);
  else if (title.length + brandSuffix.length > titleMax) {
    problems.push(`${label}: title is ${title.length + brandSuffix.length} chars with the brand, over ${titleMax}`);
  }
  if (!summary) problems.push(`${label}: summary has no ${locale} text`);
  else if (summary.length > descriptionMax) {
    problems.push(`${label}: summary is ${summary.length} chars, over ${descriptionMax}`);
  }
  if (!hasShareCard(post.cover)) {
    problems.push(`${label}: cover slot "${post.cover}" has no 1200×630 share card — use a cities/* or services/* slot`);
  }
  return problems;
}
