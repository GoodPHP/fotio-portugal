import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { LOCALES, type Locale, tx } from '@/lib/locales';
import { PHOTOGRAPHERS, getCity, getPhotographer, getServiceById, localizedCityName, serviceExistsIn } from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';
import { absoluteUrl } from '@/lib/urls';
import { graph, breadcrumbNode, faqNode, webPageNode } from '@/lib/jsonld';
import { ORG_ID } from '@/lib/jsonld-ids';
import { absoluteOgImage, imagePath, ogImagePath } from '@/lib/images';
import { cityHref } from '@/lib/routes';
import { REPLY_TIME } from '@/lib/promises';
import JsonLd from '@/components/JsonLd';
import Picture from '@/components/Picture';
import Breadcrumbs from '@/components/Breadcrumbs';
import CtaPair from '@/components/CtaPair';
import CtaBand from '@/components/CtaBand';
import Faq from '@/components/Faq';
import PricingCard from '@/components/PricingCard';
import ClientStories from '@/components/ClientStories';
import TrackView from '@/components/TrackView';
import { languageBadges } from '@/components/PhotographerCard';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return PHOTOGRAPHERS.map((p) => ({ slug: p.slug }));
}

const COPY = {
  home: { en: 'Home', pt: 'Início' },
  photographers: { en: 'Photographers', pt: 'Fotógrafos' },
  about: { en: 'About', pt: 'Sobre' },
  portfolio: { en: 'Portfolio', pt: 'Portefólio' },
  sessions: { en: 'Sessions', pt: 'Sessões' },
  destinations: { en: 'Destinations', pt: 'Destinos' },
  availability: { en: 'Availability', pt: 'Disponibilidade' },
  availabilityText: {
    en: 'Tell us your date and place and we confirm whether this photographer is free, with the price in writing.',
    pt: 'Diga-nos a data e o sítio e confirmamos se este fotógrafo está livre, com o preço por escrito.',
  },
  languages: { en: 'Languages', pt: 'Línguas' },
  faq: { en: 'Questions', pt: 'Perguntas' },
  book: { en: 'Book this photographer', pt: 'Reservar este fotógrafo' },
  checkWith: { en: 'Check availability with', pt: 'Ver disponibilidade com' },
} as const;

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const p = getPhotographer(slug);
  if (!p) return {};
  const base = getCity(p.cities[0]);
  const where = base ? localizedCityName(base, locale) : 'Portugal';
  return buildMetadata({
    locale,
    route: '/photographers/[slug]',
    alternates: Object.fromEntries(LOCALES.map((l) => [l, { slug: p.slug }])),
    title: { en: `${p.name}, photographer in ${where}`, pt: `${p.name}, fotógrafo em ${where}` }[locale],
    description: tx(p.bio, locale),
    ogImage: ogImagePath(p.portrait),
    ogImageAlt: p.name,
  });
}

/**
 * A photographer's profile — the template, ready for real data.
 *
 * No profile exists yet (`PHOTOGRAPHERS` is empty), so no page is generated;
 * `dynamicParams = false` makes every slug a 404 until one is added. Each
 * section renders only what the profile actually contains: no reviews means
 * no reviews section, not an empty one.
 */
export default async function PhotographerPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const p = getPhotographer(slug);
  if (!p) notFound();

  const cities = p.cities.map(getCity).filter((c): c is NonNullable<typeof c> => Boolean(c));
  const services = p.services
    .map(getServiceById)
    .filter((s): s is NonNullable<typeof s> => Boolean(s) && serviceExistsIn(s!, locale));
  const base = cities[0];
  const url = absoluteUrl(locale, '/photographers/[slug]', { slug: p.slug });
  const faqs = (p.faqs ?? []).map((f) => ({ question: tx(f.question, locale), answer: tx(f.answer, locale) }));
  const portrait = imagePath(p.portrait);

  const jsonLd = graph([
    webPageNode({ url, name: p.name, description: tx(p.bio, locale), locale, type: 'ProfilePage', mainEntityId: `${url}#person` }),
    {
      '@type': 'Person',
      '@id': `${url}#person`,
      name: p.name,
      jobTitle: { en: 'Photographer', pt: 'Fotógrafo' }[locale],
      description: tx(p.bio, locale),
      ...(portrait ? { image: absoluteOgImage(portrait) } : {}),
      knowsLanguage: p.languages,
      workLocation: cities.map((c) => ({ '@type': 'Place', name: localizedCityName(c, locale) })),
      memberOf: { '@id': ORG_ID },
    },
    ...(faqs.length ? [faqNode(faqs)] : []),
    breadcrumbNode([
      { name: COPY.home[locale], url: absoluteUrl(locale, '/') },
      { name: COPY.photographers[locale], url: absoluteUrl(locale, '/photographers') },
      { name: p.name, url },
    ]),
  ]);

  const heading = (id: string, text: string) => (
    <h2 id={id} className="font-display border-b border-brand-rule pb-4 text-2xl font-bold text-brand-dark sm:text-3xl">
      {text}
    </h2>
  );

  return (
    <main>
      <JsonLd data={jsonLd} />
      <TrackView event="photographer_viewed" props={{ photographer: p.slug }} />

      <section aria-labelledby="profile-heading" className="mx-auto max-w-[92rem] px-6 pt-8 sm:pt-10">
        <Breadcrumbs
          items={[
            { name: COPY.home[locale], href: '/' },
            { name: COPY.photographers[locale], href: '/photographers' },
            { name: p.name },
          ]}
        />
        <div className="mt-8 grid items-center gap-10 lg:grid-cols-12">
          <div className="relative aspect-[4/5] overflow-hidden border border-brand-rule lg:col-span-5">
            <Picture slot={p.portrait} alt={p.name} sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" fill priority />
          </div>
          <div className="lg:col-span-7">
            {base && <p className="eyebrow">{localizedCityName(base, locale)}</p>}
            <h1 id="profile-heading" className="font-display mt-4 font-bold leading-[1.0] text-brand-dark" style={{ fontSize: 'var(--text-title)' }}>
              {p.name}
            </h1>
            <p className="mt-4 text-lg text-brand-dark">{services.slice(0, 3).map((s) => tx(s.name, locale)).join(' · ')}</p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-brand-muted">
              {COPY.languages[locale]}: {languageBadges(p.languages)}
            </p>
            {p.rating && (
              <p className="mt-3 text-sm text-brand-muted">
                <span className="text-brand-orange-deep">★</span> {p.rating.value.toFixed(1)} · {p.rating.count}
              </p>
            )}
            <CtaPair
              locale={locale}
              context="photographer-hero"
              city={base}
              photographer={p.name}
              primaryLabel={`${COPY.checkWith[locale]} ${p.name.split(' ')[0]}`}
              className="mt-8"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[92rem] space-y-[var(--space-band)] px-6 py-[var(--space-section)]">
        <section aria-labelledby="about-heading" className="max-w-3xl">
          {heading('about-heading', COPY.about[locale])}
          <p className="mt-5 text-lg leading-relaxed text-brand-dark">{tx(p.bio, locale)}</p>
        </section>

        {p.portfolio.length > 0 && (
          <section aria-labelledby="portfolio-heading">
            {heading('portfolio-heading', COPY.portfolio[locale])}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {p.portfolio.map((slot) => (
                <div key={slot} className="relative aspect-[3/4] overflow-hidden border border-brand-rule">
                  <Picture slot={slot} alt="" sizes="(max-width: 640px) 50vw, 25vw" className="object-cover" fill />
                </div>
              ))}
            </div>
          </section>
        )}

        {services.length > 0 && (
          <section aria-labelledby="sessions-heading">
            {heading('sessions-heading', COPY.sessions[locale])}
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((s) => (
                <PricingCard key={s.slug} service={s} locale={locale} />
              ))}
            </div>
          </section>
        )}

        {cities.length > 0 && (
          <section aria-labelledby="destinations-heading">
            {heading('destinations-heading', COPY.destinations[locale])}
            <ul className="mt-6 flex flex-wrap gap-2">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link href={cityHref(c)} className="chip text-sm">
                    {localizedCityName(c, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <ClientStories locale={locale} photographerSlug={p.slug} />

      <section aria-labelledby="availability-heading" className="mx-auto max-w-[92rem] px-6">
        <div className="tile p-7 sm:p-10">
          <h2 id="availability-heading" className="font-display text-2xl font-bold text-brand-dark">
            {COPY.availability[locale]}
          </h2>
          <p className="mt-3 max-w-2xl text-brand-muted">
            {COPY.availabilityText[locale]} {tx(REPLY_TIME, locale)}
          </p>
        </div>
      </section>

      <Faq headingId="photographer-faq" title={COPY.faq[locale]} entries={faqs} />

      <CtaBand
        headingId="photographer-cta"
        heading={COPY.book[locale]}
        text={COPY.availabilityText[locale]}
        locale={locale}
        context="photographer-final"
        city={base}
        photographer={p.name}
      />
    </main>
  );
}
