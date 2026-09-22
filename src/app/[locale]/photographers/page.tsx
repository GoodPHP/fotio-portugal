import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/lib/locales';
import { PHOTOGRAPHERS, hasPhotographers } from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';
import { absoluteUrl } from '@/lib/urls';
import { graph, breadcrumbNode, itemListNode, webPageNode } from '@/lib/jsonld';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import PhotographerCard from '@/components/PhotographerCard';
import CtaBand from '@/components/CtaBand';
import HowItWorks from '@/components/HowItWorks';

export const dynamic = 'force-static';

const COPY = {
  title: { en: 'Photographers in Portugal', pt: 'Fotógrafos em Portugal' },
  eyebrow: { en: 'The network', pt: 'A rede' },
  intro: {
    en: 'Local professionals who know their place and its light. Tell us a preference when you check availability, or let us match you.',
    pt: 'Profissionais locais que conhecem o seu sítio e a sua luz. Indique uma preferência quando pedir disponibilidade, ou deixe-nos escolher.',
  },
  description: {
    en: 'Meet the local professional photographers you can book across Portugal: where they work, the sessions they photograph and the languages they speak.',
    pt: 'Conheça os fotógrafos profissionais locais que pode reservar em Portugal: onde trabalham, as sessões que fotografam e as línguas que falam.',
  },
  home: { en: 'Home', pt: 'Início' },
  ctaTitle: { en: 'Not sure who to choose?', pt: 'Não sabe quem escolher?' },
  ctaText: {
    en: 'Tell us where, when and what kind of session, and we’ll match you with the right photographer.',
    pt: 'Diga-nos onde, quando e que tipo de sessão, e encontramos o fotógrafo certo.',
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    route: '/photographers',
    title: COPY.title[locale],
    description: COPY.description[locale],
    // Not indexable until it lists someone; it also 404s until then.
    noindex: !hasPhotographers(),
  });
}

/**
 * The photographer directory.
 *
 * 404s while `PHOTOGRAPHERS` is empty, rather than rendering an empty page or
 * a "coming soon": the nav, the footer and the sitemap all hide the link
 * until there is someone to list, so nothing reaches this page before then.
 */
export default async function PhotographersPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (!hasPhotographers()) notFound();

  const url = absoluteUrl(locale, '/photographers');
  const jsonLd = graph([
    webPageNode({ url, name: COPY.title[locale], description: COPY.description[locale], locale, type: 'CollectionPage' }),
    itemListNode(
      PHOTOGRAPHERS.map((p) => ({ name: p.name, url: absoluteUrl(locale, '/photographers/[slug]', { slug: p.slug }) })),
      { id: `${url}#photographers`, name: COPY.title[locale] },
    ),
    breadcrumbNode([
      { name: COPY.home[locale], url: absoluteUrl(locale, '/') },
      { name: COPY.title[locale], url },
    ]),
  ]);

  return (
    <main>
      <JsonLd data={jsonLd} />
      <div className="mx-auto max-w-[92rem] px-6 pt-8 sm:pt-10">
        <Breadcrumbs items={[{ name: COPY.home[locale], href: '/' }, { name: COPY.title[locale] }]} />
        <header className="mt-8 max-w-3xl">
          <p className="eyebrow">{COPY.eyebrow[locale]}</p>
          <h1 className="font-display mt-4 font-bold leading-[1.0] text-brand-dark" style={{ fontSize: 'var(--text-title)' }}>
            {COPY.title[locale]}
          </h1>
          <p className="measure mt-5 text-lg leading-relaxed text-brand-muted">{COPY.intro[locale]}</p>
        </header>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PHOTOGRAPHERS.map((p) => (
            <PhotographerCard key={p.slug} photographer={p} locale={locale} />
          ))}
        </div>
      </div>
      <HowItWorks locale={locale} withCta={false} />
      <CtaBand headingId="photographers-cta" heading={COPY.ctaTitle[locale]} text={COPY.ctaText[locale]} locale={locale} context="photographers" />
    </main>
  );
}
