import { test } from 'node:test';
import assert from 'node:assert/strict';
import { articleProblems, landingProblems } from './landing-check';
import type { ServiceLanding } from './data/service-landing';
import type { BlogPost, Service } from './types';

const point = (n: number) => ({ title: `Title ${n}`, text: `Text ${n}` });
const both = <T,>(value: T) => ({ en: value, pt: value });

const service: Service = {
  slug: 'portrait',
  name: both('Portrait'),
  category: 'individual',
  initialPrice: 150,
  durationMinutes: 60,
  editedPhotos: 25,
  deliverables: both(['25 photographs']),
  faqs: [{ question: both('What should I bring?'), answer: both('Plain tops.') }],
};

const faq = (n: number) => ({ question: both(`Question ${n}?`), answer: both(`Answer ${n}.`) });

const complete: ServiceLanding = {
  promise: both('A portrait you will use.'),
  audience: both([point(1), point(2), point(3)]),
  process: both([point(1), point(2), point(3), point(4)]),
  prepare: both(['a', 'b', 'c', 'd']),
  faqs: [faq(1), faq(2), faq(3), faq(4)],
};

test('complete landing copy has no problems in either language', () => {
  assert.deepEqual(landingProblems(service, complete, 'en'), []);
  assert.deepEqual(landingProblems(service, complete, 'pt'), []);
});

test('reports a service with no landing entry', () => {
  assert.deepEqual(landingProblems(service, undefined, 'en'), ['service portrait (en): no entry in service-landing*.ts']);
});

test('does not accept English standing in for missing Portuguese', () => {
  const englishOnly: ServiceLanding = { ...complete, prepare: { en: ['a', 'b', 'c', 'd'] } };
  assert.deepEqual(landingProblems(service, englishOnly, 'pt'), ['service portrait (pt): prepare has no pt text']);
});

test('reports wrong section sizes', () => {
  const short: ServiceLanding = { ...complete, audience: both([point(1)]), faqs: [faq(1)] };
  assert.deepEqual(landingProblems(service, short, 'en'), [
    'service portrait (en): audience has 1, expected 3',
    'service portrait (en): faqs has 1, expected 4–6',
  ]);
});

test('reports a FAQ that repeats a catalogue question, ignoring case and punctuation', () => {
  const repeated: ServiceLanding = {
    ...complete,
    faqs: [faq(1), faq(2), faq(3), { question: both('what should i bring'), answer: both('x') }],
  };
  assert.match(landingProblems(service, repeated, 'en').join('\n'), /repeats a question already in services\.ts/);
});

test('reports an over-long promise', () => {
  const long: ServiceLanding = { ...complete, promise: both('x'.repeat(171)) };
  assert.deepEqual(landingProblems(service, long, 'en'), ['service portrait (en): promise is 171 chars, over 170']);
});

const post: BlogPost = {
  slug: 'guide',
  title: both('A guide'),
  date: '2026-09-15',
  readTime: '5 min',
  summary: both('Summary'),
  content: both('Body'),
  cover: 'cities/lisboa',
  coverAlt: both('Alt'),
};
const limits = { brandSuffix: ' · Brand', titleMax: 20, descriptionMax: 10, hasShareCard: () => true };

test('an article within limits with a share card has no problems', () => {
  assert.deepEqual(articleProblems(post, 'en', limits), []);
});

test('reports an article title over the limit once the brand is appended, and a missing share card', () => {
  const long = { ...post, title: both('A much longer guide title') };
  assert.deepEqual(articleProblems(long, 'en', { ...limits, hasShareCard: () => false }), [
    'article guide (en): title is 33 chars with the brand, over 20',
    'article guide (en): cover slot "cities/lisboa" has no 1200×630 share card — use a cities/* or services/* slot',
  ]);
});
