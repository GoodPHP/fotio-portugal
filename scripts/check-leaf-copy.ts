/**
 * Every `service × city` page carries authored copy, in every language it is
 * served in, and that copy is its own.
 *
 * "Its own" is measured, not asserted: a page's main column is split into
 * four-word shingles and must be at least 70% unique against every other page
 * on the site — the other leaves, and the city, service and blog pages whose
 * facts the leaves draw on. That is the number text.ru and its relatives
 * report, and the number a reviewer will check.
 *
 * Also enforced, per page: the SERP limits, a city in the title, unique titles
 * and descriptions, no unfilled tokens, no prices typed into the copy (they
 * are tokens, filled from the catalogue), and no brand name (the layout adds
 * it; `check-brand.ts` forbids it anywhere else).
 *
 *   npx tsx scripts/check-leaf-copy.ts                 # the whole matrix
 *   npx tsx scripts/check-leaf-copy.ts --city lisboa   # one place, while writing it
 *   npx tsx scripts/check-leaf-copy.ts --report        # every page's score
 */
import { LOCALES, tx, type Locale } from '../src/lib/locales';
import { CITIES, SERVICES, BLOG_POSTS, leafExists, localizedCityName } from '../src/lib/catalog';
import { generateProgrammaticContent, getSeoMetadata, leafPageText } from '../src/lib/content';
import { LEAF_COPY } from '../src/lib/data/leaf-copy';
import { leafCopyKey, unknownLeafTokens, type LeafCopy } from '../src/lib/leaf-copy';
import { SERVICE_SEO } from '../src/lib/data/service-seo';
import { SERVICE_LANDING } from '../src/lib/data/service-landing';
import { SITE_NAME } from '../src/lib/site';
import { TITLE_MAX, DESCRIPTION_MAX } from '../src/lib/seo-text';
import { uniquenessReport, type TextPage } from '../src/lib/uniqueness';
import type { City, Service } from '../src/lib/types';

const UNIQUE_MIN = 0.7;
const BRAND_SUFFIX = ` | ${SITE_NAME}`;
const DESCRIPTION_MIN = 130;
const LENGTH_MIN = { intro: 350, where: 400, when: 300, answer: 150 } as const;
const FAQ_COUNT = 3;
/** A price typed into copy: "€200", "200 €", "200€". Prices are `{price}`. */
const TYPED_PRICE = /€\s?\d|\d\s?€/u;

const args = process.argv.slice(2);
const onlyCity = args.includes('--city') ? args[args.indexOf('--city') + 1] : undefined;
const showReport = args.includes('--report');

if (onlyCity && !CITIES.some((c) => c.slug === onlyCity)) {
  console.error(`[check-leaf-copy] unknown city "${onlyCity}"`);
  process.exit(1);
}

const failures: string[] = [];
const fail = (msg: string) => failures.push(msg);

interface Leaf {
  id: string;
  city: City;
  service: Service;
  locale: Locale;
}

const leaves: Leaf[] = [];
for (const locale of LOCALES) {
  for (const service of SERVICES) {
    for (const city of CITIES) {
      if (!leafExists(service, city.slug, locale)) continue;
      leaves.push({ id: `${locale}:${service.slug}/${city.slug}`, city, service, locale });
    }
  }
}
const checked = leaves.filter((leaf) => !onlyCity || leaf.city.slug === onlyCity);

// ------------------------------------------------------------ copy present
for (const locale of LOCALES) {
  for (const key of Object.keys(LEAF_COPY[locale])) {
    const [serviceId, citySlug] = key.split('--');
    const service = SERVICES.find((s) => s.slug === serviceId);
    if (!service) fail(`${locale}: copy for unknown service "${serviceId}" (${key})`);
    else if (!leafExists(service, citySlug, locale)) fail(`${locale}: copy for ${key}, which is not a page in ${locale}`);
  }
}

// ------------------------------------------------------- per-page contents
const titles = new Map<string, string>();
const descriptions = new Map<string, string>();

function checkCopy(leaf: Leaf, raw: LeafCopy): void {
  const { id, city, locale } = leaf;
  const content = generateProgrammaticContent(city, leaf.service, locale);

  const strings: Array<[string, string]> = [
    ['title', raw.title],
    ['description', raw.description],
    ['intro', raw.intro],
    ['where', raw.where],
    ['when', raw.when],
    ...raw.faqs.flatMap((faq, i): Array<[string, string]> => [
      [`faq ${i + 1} question`, faq.question],
      [`faq ${i + 1} answer`, faq.answer],
    ]),
  ];
  for (const [field, text] of strings) {
    for (const token of unknownLeafTokens(text)) fail(`${id}: ${field} has unknown token ${token}`);
    if (text.includes(SITE_NAME)) fail(`${id}: ${field} names the brand — the layout adds it`);
    if (TYPED_PRICE.test(text)) fail(`${id}: ${field} types a price — use {price}`);
    if (/\s{2,}|^\s|\s$/u.test(text)) fail(`${id}: ${field} has stray whitespace`);
  }

  // Lengths are measured after the tokens are filled — what the reader sees.
  for (const section of content.sections) {
    const min = LENGTH_MIN[section.id as keyof typeof LENGTH_MIN];
    if (min && section.body.length < min) fail(`${id}: ${section.id} is ${section.body.length} chars, under ${min}`);
  }
  if (content.customFAQs.length !== FAQ_COUNT) fail(`${id}: ${content.customFAQs.length} FAQs, expected ${FAQ_COUNT}`);
  for (const faq of content.customFAQs) {
    if (faq.answer.length < LENGTH_MIN.answer) fail(`${id}: answer to "${faq.question}" is under ${LENGTH_MIN.answer} chars`);
  }

  const meta = getSeoMetadata(city, leaf.service, locale);
  const rendered = meta.title + BRAND_SUFFIX;
  if (rendered.length > TITLE_MAX) fail(`${id}: title is ${rendered.length} chars with the brand, over ${TITLE_MAX}`);
  if (meta.description.length > DESCRIPTION_MAX || meta.description.length < DESCRIPTION_MIN) {
    fail(`${id}: description is ${meta.description.length} chars, outside ${DESCRIPTION_MIN}–${DESCRIPTION_MAX}`);
  }
  const place = localizedCityName(city, locale);
  if (!meta.title.includes(place)) fail(`${id}: title does not name "${place}"`);

  const titleClash = titles.get(`${locale}:${meta.title}`);
  if (titleClash) fail(`${id}: same title as ${titleClash}`);
  titles.set(`${locale}:${meta.title}`, id);
  const descriptionClash = descriptions.get(`${locale}:${meta.description}`);
  if (descriptionClash) fail(`${id}: same description as ${descriptionClash}`);
  descriptions.set(`${locale}:${meta.description}`, id);
}

for (const leaf of leaves) {
  const raw = LEAF_COPY[leaf.locale][leafCopyKey(leaf.service.slug, leaf.city.slug)];
  const inScope = !onlyCity || leaf.city.slug === onlyCity;
  if (!raw) {
    if (inScope) fail(`${leaf.id}: no authored copy (the page would render from the template, noindex)`);
    continue;
  }
  // Titles and descriptions are compared across the whole matrix, so every
  // authored page is registered even when only one city is being reported.
  if (inScope) checkCopy(leaf, raw);
  else {
    const meta = getSeoMetadata(leaf.city, leaf.service, leaf.locale);
    titles.set(`${leaf.locale}:${meta.title}`, leaf.id);
    descriptions.set(`${leaf.locale}:${meta.description}`, leaf.id);
  }
}

// -------------------------------------------------------------- uniqueness
const joinAll = (parts: Array<string | undefined>) => parts.filter(Boolean).join('\n');

function cityPageText(city: City, locale: Locale): string {
  return joinAll([
    tx(city.lede, locale),
    tx(city.narrative, locale),
    tx(city.seasonality, locale),
    ...city.spots.flatMap((spot) => [
      spot.name,
      tx(spot.bestTime, locale),
      tx(spot.permitCost, locale),
      tx(spot.description, locale),
      ...(spot.light ?? []).map((note) => `${tx(note.season, locale)}: ${tx(note.note, locale)}`),
    ]),
    ...city.faqs.flatMap((faq) => [tx(faq.question, locale), tx(faq.answer, locale)]),
  ]);
}

function servicePageText(service: Service, locale: Locale): string {
  const seo = SERVICE_SEO[service.slug];
  const landing = SERVICE_LANDING[service.slug];
  return joinAll([
    service.description && tx(service.description, locale),
    ...tx(service.deliverables, locale),
    ...(service.faqs ?? []).flatMap((faq) => [tx(faq.question, locale), tx(faq.answer, locale)]),
    ...(seo ? tx(seo.paragraphs, locale) : []),
    landing && tx(landing.promise, locale),
    ...(landing ? tx(landing.audience, locale).flatMap((p) => [p.title, p.text]) : []),
    ...(landing ? tx(landing.process, locale).flatMap((p) => [p.title, p.text]) : []),
    ...(landing ? tx(landing.prepare, locale) : []),
    ...(landing?.faqs ?? []).flatMap((faq) => [tx(faq.question, locale), tx(faq.answer, locale)]),
  ]);
}

interface ScoredRow {
  id: string;
  vsCorpus: number;
  vsNearest: number;
  nearest?: string;
}
const scored: ScoredRow[] = [];

for (const locale of LOCALES) {
  const leafPages: TextPage[] = leaves
    .filter((leaf) => leaf.locale === locale)
    .map((leaf) => ({
      id: leaf.id,
      text: leafPageText(generateProgrammaticContent(leaf.city, leaf.service, locale)),
    }));
  const corpus: TextPage[] = [
    ...leafPages,
    ...CITIES.map((city) => ({ id: `${locale}:city/${city.slug}`, text: cityPageText(city, locale) })),
    ...SERVICES.map((service) => ({ id: `${locale}:service/${service.slug}`, text: servicePageText(service, locale) })),
    ...BLOG_POSTS.map((post) => ({ id: `${locale}:blog/${post.slug}`, text: tx(post.content, locale) })),
  ];

  const measured = leafPages.filter((page) => {
    const leaf = leaves.find((l) => l.id === page.id)!;
    return (!onlyCity || leaf.city.slug === onlyCity) && LEAF_COPY[locale][leafCopyKey(leaf.service.slug, leaf.city.slug)];
  });
  for (const row of uniquenessReport(measured, corpus)) {
    scored.push(row);
    if (row.vsCorpus < UNIQUE_MIN) {
      fail(
        `${row.id}: ${(row.vsCorpus * 100).toFixed(1)}% unique, under ${UNIQUE_MIN * 100}% ` +
          `(most shared with ${row.nearest}, ${((1 - row.vsNearest) * 100).toFixed(1)}% of the page)`,
      );
    }
  }
}

// ------------------------------------------------------------------ report
const pct = (n: number) => `${(n * 100).toFixed(1)}%`;
if (showReport) {
  for (const row of [...scored].sort((a, b) => a.vsCorpus - b.vsCorpus)) {
    console.log(`${pct(row.vsCorpus).padStart(6)}  ${pct(row.vsNearest).padStart(6)}  ${row.id}  ← ${row.nearest ?? '—'}`);
  }
}

const scope = onlyCity ? `${onlyCity}: ` : '';
if (failures.length) {
  console.error(`[check-leaf-copy] ${scope}${failures.length} problem(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
const values = scored.map((r) => r.vsCorpus).sort((a, b) => a - b);
console.log(
  `[check-leaf-copy] ok — ${scope}${checked.length} pages with authored copy, ` +
    `uniqueness min ${pct(values[0] ?? 1)}, median ${pct(values[Math.floor(values.length / 2)] ?? 1)}`,
);
