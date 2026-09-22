import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { type Locale, tx } from '@/lib/locales';
import { publishedServicesByCategory, getCategoryLabel } from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';
import { graph, breadcrumbNode, webPageNode, offerCatalogNode, faqNode } from '@/lib/jsonld';
import { absoluteUrl } from '@/lib/urls';
import { serviceSlot, absoluteOgImage, ogImagePath } from '@/lib/images';
import { FROM_PRICE, GUARANTEE, INCLUDED, MATCHING, WEATHER } from '@/lib/promises';
import JsonLd from '@/components/JsonLd';
import SeoProse from '@/components/SeoProse';
import Breadcrumbs from '@/components/Breadcrumbs';
import PricingCard from '@/components/PricingCard';
import GuaranteeBlock from '@/components/GuaranteeBlock';
import Faq from '@/components/Faq';
import CtaBand from '@/components/CtaBand';
import TrackView from '@/components/TrackView';
import { CheckMark } from '@/components/Icons';
import { serviceHref } from '@/lib/routes';
import { META_TITLE, META_DESCRIPTION, OG_IMAGE_ALT, SEO_PROSE } from './content';

/** The session that fronts the price list on social previews. */
const OG_SERVICE_SLUG = 'family';

const COPY = {
  title: { en: 'Simple, transparent pricing', pt: 'Preços simples e transparentes' },
  eyebrow: { en: 'Pricing', pt: 'Preços' },
  intro: {
    en: 'Every session has a published starting price, and each one says exactly what it covers.',
    pt: 'Cada sessão tem um preço de partida publicado, e cada uma diz exatamente o que cobre.',
  },
  includedTitle: { en: 'Every session includes', pt: 'Todas as sessões incluem' },
  addonsTitle: { en: 'Options, quoted before you pay', pt: 'Opções, orçamentadas antes de pagar' },
  addonsNote: {
    en: 'Priced to your date and place, and confirmed in writing with the rest of the quote — never added afterwards.',
    pt: 'Com preço para a sua data e sítio, confirmado por escrito com o resto do orçamento — nunca acrescentado depois.',
  },
  addons: {
    en: ['Express 24h delivery', 'Second photographer', 'Extended session (1.5× / 2×)'],
    pt: ['Entrega expresso em 24 h', 'Segundo fotógrafo', 'Sessão alargada (1,5× / 2×)'],
  },
  faqTitle: { en: 'Pricing questions', pt: 'Perguntas sobre preços' },
  ctaTitle: { en: 'Know your date? Check availability.', pt: 'Já sabe a data? Veja a disponibilidade.' },
  ctaSub: {
    en: 'Your final price is confirmed in writing before you book. We reply within about 2 hours during the working day.',
    pt: 'O preço final é confirmado por escrito antes de reservar. Respondemos em cerca de 2 horas, durante o dia útil.',
  },
  breadcrumbHome: { en: 'Home', pt: 'Início' },
} as const;

function c(key: Exclude<keyof typeof COPY, 'addons'>, locale: Locale): string {
  return COPY[key][locale];
}

/** Questions about money, answered from the same promises the rest of the site makes. */
function pricingFaqs(locale: Locale) {
  const en = [
    { question: 'Is the price on this page the price I pay?', answer: `${tx(FROM_PRICE.body, 'en')} ${tx(FROM_PRICE.noHiddenFees, 'en')}` },
    { question: 'Do I pay anything to check availability?', answer: `No. ${tx(MATCHING.noPayment, 'en')} ${tx(MATCHING.promise, 'en')}` },
    { question: 'Is there a charge per photo?', answer: 'No. Each session states how many edited photos it includes, and there is no per-image charge or retouching sold separately afterwards.' },
    { question: 'What if it rains?', answer: tx(WEATHER.body, 'en') },
    { question: 'What if the gallery is not what was promised?', answer: tx(GUARANTEE.body, 'en') },
  ];
  const pt = [
    { question: 'O preço desta página é o que pago?', answer: `${tx(FROM_PRICE.body, 'pt')} ${tx(FROM_PRICE.noHiddenFees, 'pt')}` },
    { question: 'Pago alguma coisa para ver disponibilidade?', answer: `Não. ${tx(MATCHING.noPayment, 'pt')} ${tx(MATCHING.promise, 'pt')}` },
    { question: 'Há custo por fotografia?', answer: 'Não. Cada sessão indica quantas fotografias editadas inclui, e não há custo por imagem nem retoque vendido à parte depois.' },
    { question: 'E se chover?', answer: tx(WEATHER.body, 'pt') },
    { question: 'E se a galeria não for o que foi prometido?', answer: tx(GUARANTEE.body, 'pt') },
  ];
  return locale === 'pt' ? pt : en;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  // "Transparent pricing" is a claim, not a query. What people search for is
  // what a photographer costs, so the title carries the floor price.
  return buildMetadata({
    locale,
    route: '/pricing',
    title: tx(META_TITLE, locale),
    description: tx(META_DESCRIPTION, locale),
    ogImage: ogImagePath(serviceSlot(OG_SERVICE_SLUG)),
    ogImageAlt: tx(OG_IMAGE_ALT, locale),
  });
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Only show published services so the pricing table never links to a 404.
  const grouped = publishedServicesByCategory(locale);

  // A price table described only by a BreadcrumbList publishes no prices. The
  // catalogue is built from `grouped`, the same map the table renders, so the
  // markup and the visible figures cannot disagree.
  const faqs = pricingFaqs(locale);
  const pricingUrl = absoluteUrl(locale, '/pricing');
  const catalogueId = `${pricingUrl}#offers`;
  const jsonLd = graph([
    webPageNode({
      url: pricingUrl,
      name: tx(META_TITLE, locale),
      description: tx(META_DESCRIPTION, locale),
      locale,
      type: 'CollectionPage',
      image: absoluteOgImage(ogImagePath(serviceSlot(OG_SERVICE_SLUG))),
      mainEntityId: catalogueId,
    }),
    offerCatalogNode({
      id: catalogueId,
      name: tx(META_TITLE, locale),
      url: pricingUrl,
      locale,
      offers: [...grouped.entries()].flatMap(([category, services]) =>
        services.map((service) => ({
          name: tx(service.name, locale),
          url: absoluteUrl(locale, '/services/[service]', serviceHref(service, locale).params),
          price: service.initialPrice,
          category: getCategoryLabel(category, locale),
        })),
      ),
    }),
    breadcrumbNode([
      { name: c('breadcrumbHome', locale), url: absoluteUrl(locale, '/') },
      { name: c('title', locale), url: pricingUrl },
    ]),
    faqNode(faqs),
  ]);

  return (
    <main>
      <JsonLd data={jsonLd} />
      <TrackView event="pricing_viewed" />

      <div className="mx-auto max-w-[92rem] px-6 pt-8 sm:pt-10">
        <Breadcrumbs items={[{ name: c('breadcrumbHome', locale), href: '/' }, { name: c('title', locale) }]} />
        <header className="mt-8 max-w-3xl">
          <p className="eyebrow">{c('eyebrow', locale)}</p>
          <h1 className="font-display mt-4 font-bold leading-[1.0] text-brand-dark" style={{ fontSize: 'var(--text-title)' }}>
            {c('title', locale)}
          </h1>
          <p className="measure mt-5 text-lg leading-relaxed text-brand-muted">
            {c('intro', locale)} <strong className="font-semibold text-brand-dark">{tx(FROM_PRICE.noHiddenFees, locale)}</strong>
          </p>
        </header>

        {/* What the number means, before any number is shown. */}
        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <section aria-labelledby="from-heading" className="tile p-7 sm:p-8 lg:col-span-7">
            <h2 id="from-heading" className="font-display text-2xl font-bold text-brand-dark">
              {tx(FROM_PRICE.title, locale)}
            </h2>
            <p className="mt-3 leading-relaxed text-brand-muted">{tx(FROM_PRICE.body, locale)}</p>
            <h3 className="mt-7 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-brand-dark">
              {c('addonsTitle', locale)}
            </h3>
            <ul className="mt-3 grid gap-x-6 gap-y-2 text-sm text-brand-dark sm:grid-cols-2">
              {COPY.addons[locale].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-brand-orange-deep" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-brand-muted">{c('addonsNote', locale)}</p>
          </section>
          <section aria-labelledby="included-heading" data-surface="dark" className="bg-brand-dark p-7 text-white sm:p-8 lg:col-span-5">
            <h2 id="included-heading" className="font-display text-2xl font-bold text-white">
              {c('includedTitle', locale)}
            </h2>
            <ul className="mt-5 space-y-3">
              {tx(INCLUDED, locale).map((item) => (
                <li key={item} className="flex items-center gap-3 text-white">
                  <CheckMark className="h-4 w-4" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-16 space-y-14">
          {Array.from(grouped.entries()).map(([category, list]) => (
            <section key={category} aria-labelledby={`cat-${category}`}>
              <h2 id={`cat-${category}`} className="font-display border-b border-brand-rule pb-4 text-2xl font-bold text-brand-dark sm:text-3xl">
                {getCategoryLabel(category, locale)}
              </h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {list.map((s) => (
                  <PricingCard key={s.slug} service={s} locale={locale} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <div className="mt-[var(--space-section)]">
        <GuaranteeBlock locale={locale} />
      </div>

      <Faq headingId="pricing-faq-heading" title={c('faqTitle', locale)} entries={faqs} />

      <CtaBand
        headingId="pricing-cta-heading"
        heading={c('ctaTitle', locale)}
        text={c('ctaSub', locale)}
        locale={locale}
        context="pricing"
      />

      <SeoProse
        headingId="pricing-seo-heading"
        eyebrow={tx(SEO_PROSE.eyebrow, locale)}
        heading={tx(SEO_PROSE.heading, locale)}
        paragraphs={tx(SEO_PROSE.paragraphs, locale)}
        facts={tx(SEO_PROSE.facts, locale)}
      />
    </main>
  );
}
