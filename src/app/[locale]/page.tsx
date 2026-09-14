import type { Metadata } from 'next';
import Picture from '@/components/Picture';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import {
  CITIES,
  SERVICES,
  REVIEWS,
  getAggregateRating,
  publishedCities,
  publishedServices,
} from '@/lib/catalog';
import { type Locale, tx } from '@/lib/locales';
import { SITE_NAME, formatPrice } from '@/lib/site';
import { citySlot, serviceSlot, ogImagePath } from '@/lib/images';
import { buildMetadata } from '@/lib/seo';
import { FadeIn, Stagger, StaggerItem } from '@/components/Motion';
import { cityHref, serviceHref } from '@/lib/routes';
import { absoluteUrl } from '@/lib/urls';
import { graph, faqNode, webPageNode, itemListNode, aggregateRatingWithReviewsNodes } from '@/lib/jsonld';
import JsonLd from '@/components/JsonLd';
import SeoProse from '@/components/SeoProse';
import { absoluteOgImage } from '@/lib/images';
import { META_TITLE, META_DESCRIPTION, OG_IMAGE_ALT, SEO_PROSE } from './content';

/** Paris leads the network and carries the hero photograph and the OG card. */
const HERO_CITY_SLUG = 'paris';

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  // The SERP title is not the H1: the headline sells, the title tag has to say
  // what the page is and where, inside sixty characters.
  return buildMetadata({
    locale,
    route: '/',
    title: tx(META_TITLE, locale),
    description: tx(META_DESCRIPTION, locale),
    ogImage: ogImagePath(citySlot(HERO_CITY_SLUG)),
    ogImageAlt: tx(OG_IMAGE_ALT, locale),
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');
  const tc = await getTranslations('common');

  const rating = getAggregateRating();
  // Paris leads: it is the largest market and the strongest photograph.
  const heroCity =
    publishedCities().find((c) => c.slug === HERO_CITY_SLUG) ?? publishedCities()[0] ?? CITIES[0];
  // Featured grid + cities grid link out, so they must only show published pages.
  // One published service per category → up to six distinct category images.
  const seenCategories = new Set<string>();
  const featuredServices = publishedServices().filter((s) => {
    if (seenCategories.has(s.category)) return false;
    seenCategories.add(s.category);
    return true;
  }).slice(0, 5);
  // Nine cities complete the 5/4/3 · 3/4/5 rhythm without a stranded row.
  const topCities = publishedCities().slice(0, 9);

  const copy = {
    servicesEyebrow: { en: 'Photography services', pt: 'Serviços de fotografia' }[locale],
    servicesTitle: { en: 'A shoot for every story', pt: 'Uma sessão para cada história' }[locale],
    citiesEyebrow: { en: 'Where we shoot', pt: 'Onde fotografamos' }[locale],
    citiesTitle: { en: 'The most loved cities', pt: 'As cidades mais procuradas' }[locale],
    howEyebrow: { en: 'How it works', pt: 'Como funciona' }[locale],
    howTitle: { en: 'From booking to gallery in 3 steps', pt: 'Da reserva à galeria em 3 passos' }[locale],
    faqTitle: { en: 'Frequently asked questions', pt: 'Perguntas frequentes' }[locale],
    ctaTitle: { en: 'Ready to photograph your time in Portugal?', pt: 'Pronto para fotografar o seu tempo em Portugal?' }[locale],
    ctaSub: { en: 'Reply within 2 hours. No deposit required to enquire.', pt: 'Resposta em 2 horas. Não é preciso sinal para pedir orçamento.' }[locale],
    ratingLabel: { en: 'from real clients', pt: 'de clientes reais' }[locale],
    trustHeading: { en: `Why book through ${SITE_NAME}`, pt: `Porquê reservar através da ${SITE_NAME}` }[locale],
    heroEyebrow: { en: 'Photographers across Portugal', pt: 'Fotógrafos em todo o Portugal' }[locale],
    heroImageAlt: { en: 'A photograph from one of the cities we cover', pt: 'Uma fotografia de um dos sítios que cobrimos' }[locale],
    statCities: { en: 'Cities covered', pt: 'Cidades cobertas' }[locale],
    statServices: { en: 'Session types', pt: 'Tipos de sessão' }[locale],
    statDelivery: { en: 'Gallery delivery', pt: 'Entrega da galeria' }[locale],
    statRating: { en: 'Client rating', pt: 'Avaliação dos clientes' }[locale],
    explore: { en: 'Explore services', pt: 'Ver os serviços' }[locale],
  };

  const trust = [
    {
      title: { en: '2-hour response', pt: 'Resposta em 2 horas' }[locale],
      desc: { en: 'A real coordinator replies right away.', pt: 'Responde-lhe uma pessoa, de imediato.' }[locale],
    },
    {
      title: { en: 'Locked fixed price', pt: 'Preço fixo, fechado' }[locale],
      desc: { en: 'No hidden costs, ever.', pt: 'Sem custos escondidos, nunca.' }[locale],
    },
    {
      title: { en: 'Gallery in 48-72h', pt: 'Galeria em 48-72 h' }[locale],
      desc: { en: 'Edited photos, delivery guaranteed.', pt: 'Fotografias editadas, entrega garantida.' }[locale],
    },
    {
      title: { en: 'Vetted photographers', pt: 'Fotógrafos verificados' }[locale],
      desc: { en: 'Only selected local pros.', pt: 'Só profissionais locais seleccionados.' }[locale],
    },
  ];

  const steps = [
    {
      n: '01',
      title: { en: 'Choose & book', pt: 'Escolher e reservar' }[locale],
      desc: { en: 'Pick city, service and date. Confirm in seconds.', pt: 'Escolha o sítio, o serviço e a data. Confirma-se em segundos.' }[locale],
    },
    {
      n: '02',
      title: { en: 'Shoot with a local pro', pt: 'Fotografar com um profissional local' }[locale],
      desc: { en: 'Meet a vetted photographer at the best spots.', pt: 'Encontre um fotógrafo verificado nos melhores locais.' }[locale],
    },
    {
      n: '03',
      title: { en: 'Get your gallery', pt: 'Receber a galeria' }[locale],
      desc: { en: 'Edited photos in your private gallery within 48-72h.', pt: 'Fotografias editadas na sua galeria privada em 48-72 h.' }[locale],
    },
  ];

  const faqs = [
    {
      q: { en: 'How much does a photoshoot cost?', pt: 'Quanto custa uma sessão fotográfica?' }[locale],
      a: { en: `Prices are fixed and transparent, starting at ${formatPrice(150, locale)}. Every package includes the session, professional editing and a private gallery, with no hidden fees.`, pt: `Os preços são fixos e anunciados, a partir de ${formatPrice(150, locale)}. Todos os pacotes incluem a sessão, a edição profissional e uma galeria privada, sem custos escondidos.` }[locale],
    },
    {
      q: { en: 'How soon do I get my photos?', pt: 'Em quanto tempo recebo as fotografias?' }[locale],
      a: { en: 'We deliver your private online gallery with all edited photos within 48-72 hours of the session.', pt: 'A galeria privada online, com todas as fotografias editadas, é entregue em 48 a 72 horas após a sessão.' }[locale],
    },
    {
      q: { en: 'Do the photographers speak my language?', pt: 'Os fotógrafos falam a minha língua?' }[locale],
      a: { en: 'Yes. We match you with local photographers by language — just tell us your preference when booking.', pt: 'Sim. Encontramos um fotógrafo local que fale a sua língua — basta dizer-nos qual na altura de reservar.' }[locale],
    },
    {
      q: { en: 'What happens if the weather is bad?', pt: 'O que acontece se o tempo estiver mau?' }[locale],
      a: { en: 'We reschedule at no extra cost, or use arcades and indoor spots for moody shots.', pt: 'Remarcamos sem custo, ou usamos arcadas e locais abrigados, que dão outra atmosfera.' }[locale],
    },
  ];

  // The home page renders a FAQ block, a cities grid and an aggregate rating.
  // Each one is described here, so each is eligible for a rich result; the
  // ItemList is built from `topCities` rather than re-listed, so the markup
  // cannot drift out of step with what the grid actually shows.
  const url = absoluteUrl(locale, '/');
  const citiesListId = `${url}#cities`;
  const jsonLd = graph([
    webPageNode({
      url,
      name: tx(META_TITLE, locale),
      description: tx(META_DESCRIPTION, locale),
      locale,
      image: absoluteOgImage(ogImagePath(citySlot(heroCity.slug))),
      mainEntityId: citiesListId,
    }),
    itemListNode(
      topCities.map((city) => ({
        name: city.name,
        url: absoluteUrl(locale, '/cities/[city]', { city: city.slug }),
        image: absoluteOgImage(ogImagePath(citySlot(city.slug))),
        description: tx(city.narrative, locale),
      })),
      { id: citiesListId, name: copy.citiesTitle },
    ),
    faqNode(faqs.map((f) => ({ question: f.q, answer: f.a }))),
    ...aggregateRatingWithReviewsNodes(
      rating.ratingValue,
      rating.reviewCount,
      REVIEWS.map((r) => ({
        author: r.name,
        rating: r.stars,
        datePublished: r.date,
        text: tx(r.text, locale),
      })),
    ),
  ]);

  return (
    <main>
      <JsonLd data={jsonLd} />
      {/*
        Hero. The site sells photography, so a photograph carries the page and
        the type sits beside it rather than on top of it — no scrim, no
        contrast compromise, and the headline stays crisp at any size.
      */}
      <section aria-labelledby="hero-heading" className="relative">
        <div className="mx-auto grid max-w-[92rem] items-end gap-y-10 px-6 pb-[var(--space-band)] pt-10 lg:grid-cols-12 lg:gap-x-12 lg:pt-12">
          <FadeIn instant y={20} className="lg:col-span-7 xl:col-span-6">
            <p className="eyebrow">{copy.heroEyebrow}</p>
            <h1
              id="hero-heading"
              className="mt-5 font-display font-semibold leading-[0.94] text-brand-dark"
              style={{ fontSize: 'var(--text-display)' }}
            >
              {t('heroTitle')}
            </h1>
            <p className="measure mt-7 text-lg leading-relaxed text-brand-muted sm:text-xl">
              {t('heroSubtitle')}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/book"
                className="group inline-flex items-center gap-3 border-b-2 border-brand-dark pb-1 font-display text-lg font-semibold text-brand-dark transition-colors hover:border-brand-orange-deep hover:text-brand-orange-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange-deep"
              >
                {tc('bookNow')}
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h9m0 0L8.5 4.5M12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/services"
                className="border-b border-brand-rule-strong pb-1 text-lg text-brand-muted transition-colors hover:border-brand-dark hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange-deep"
              >
                {copy.explore}
              </Link>
            </div>
          </FadeIn>

          {/* The photograph bleeds off the right edge rather than sitting in a box. */}
          <FadeIn instant y={20} className="lg:col-span-5 xl:col-span-6 lg:-mr-6 xl:-mr-[max(0px,calc((100vw-92rem)/2))]">
            <figure className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/10] lg:aspect-[3/4] lg:max-h-[70vh]">
              <Picture
                slot={citySlot(heroCity.slug)}
                alt={copy.heroImageAlt}
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
                fill
                priority
              />
            </figure>
            <figcaption className="mt-3 flex items-baseline justify-between gap-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-muted">
              <span>{heroCity.name}</span>
              <span>{tx(heroCity.region, locale)}</span>
            </figcaption>
          </FadeIn>
        </div>

        {/*
          The facts that used to sit in coloured boxes, as a ruled ledger. Same
          information, a quarter of the visual weight, and it reads as fact
          rather than as decoration.
        */}
        <div className="mx-auto max-w-[92rem] px-6">
          <dl className="grid grid-cols-2 border-t border-brand-rule sm:grid-cols-4">
            {[
              { v: `${CITIES.length}`, k: copy.statCities },
              { v: `${SERVICES.length}`, k: copy.statServices },
              { v: '48–72h', k: copy.statDelivery },
              { v: rating.reviewCount > 0 ? `${rating.ratingValue.toFixed(1)}/5` : '—', k: copy.statRating },
            ].map((s) => (
              <div key={s.k} className="border-b border-brand-rule py-6 pr-6 sm:border-b-0">
                <dt className="sr-only">{s.k}</dt>
                <dd>
                  <span className="block font-display text-3xl font-semibold leading-none text-brand-dark sm:text-4xl">{s.v}</span>
                  <span className="mt-2 block font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-muted">{s.k}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Trust strip */}
      <section aria-labelledby="trust-heading" className="border-y border-brand-rule bg-brand-sand">
        {/*
          The cards are h3s, so the section needs its own h2 or the document
          skips a level. It is not shown because the cards read as a row of
          facts rather than a titled block, but a screen reader needs it.
        */}
        <h2 id="trust-heading" className="sr-only">
          {copy.trustHeading}
        </h2>
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden px-6 py-10 sm:gap-8 lg:grid-cols-4">
          {trust.map((item) => (
            <div key={item.title} className="px-1 py-3 sm:px-0">
              <h3 className="font-display text-base font-semibold text-brand-dark">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-brand-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/*
        Featured services. An uneven grid rather than six identical tiles: the
        first two run large and the rest tuck in beside them, so the eye is
        given an order to read in. The photographs fill their frames edge to
        edge, with the type underneath where it belongs.
      */}
      <section aria-labelledby="services-heading" className="mx-auto max-w-[92rem] px-6 py-[var(--space-section)]">
        <FadeIn className="flex flex-wrap items-end justify-between gap-6 border-b border-brand-rule pb-6">
          <div>
            <p className="eyebrow">{copy.servicesEyebrow}</p>
            <h2
              id="services-heading"
              className="mt-3 font-display font-semibold leading-[1.02] text-brand-dark"
              style={{ fontSize: 'var(--text-title)' }}
            >
              {copy.servicesTitle}
            </h2>
          </div>
          <Link
            href="/services"
            className="whitespace-nowrap border-b border-brand-rule-strong pb-1 text-sm text-brand-muted transition-colors hover:border-brand-dark hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange-deep"
          >
            {tc('viewAll')} →
          </Link>
        </FadeIn>

        <Stagger className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-6">
          {featuredServices.map((service, i) => {
            // The first two are given twice the room; the rest share the row.
            const feature = i < 2;
            return (
              <StaggerItem key={service.slug} className={feature ? 'col-span-2 lg:col-span-3' : 'col-span-1 lg:col-span-2'}>
                <Link
                  href={serviceHref(service, locale)}
                  className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange-deep"
                >
                  <figure className={`relative overflow-hidden ${feature ? 'aspect-[3/2]' : 'aspect-[4/3]'}`}>
                    <Picture
                      slot={serviceSlot(service.slug)}
                      alt={tx(service.name, locale)}
                      sizes={feature ? '(max-width: 1024px) 100vw, 45vw' : '(max-width: 1024px) 50vw, 30vw'}
                      className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
                      fill
                    />
                  </figure>
                  <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-brand-rule pt-3">
                    <h3
                      className={`font-display font-semibold text-brand-dark transition-colors group-hover:text-brand-orange-deep ${
                        feature ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
                      }`}
                    >
                      {tx(service.name, locale)}
                    </h3>
                    <span className="shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-muted">
                      {formatPrice(service.initialPrice, locale)}
                    </span>
                  </div>
                  {feature && service.description && (
                    <p className="measure-tight mt-2 text-brand-muted">{tx(service.description, locale)}</p>
                  )}
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      {/*
        Cities. The captions sit under the photographs rather than on top of
        them, so no scrim is needed and the images are seen whole. Widths run in
        a repeating uneven rhythm, which is what stops twelve frames reading as
        a contact sheet.
      */}
      <section aria-labelledby="cities-heading" className="border-y border-brand-rule bg-brand-cream/50 py-[var(--space-section)]">
        <div className="mx-auto max-w-[92rem] px-6">
          <FadeIn className="flex flex-wrap items-end justify-between gap-6 border-b border-brand-rule pb-6">
            <div>
              <p className="eyebrow">{copy.citiesEyebrow}</p>
              <h2
                id="cities-heading"
                className="mt-3 font-display font-semibold leading-[1.02] text-brand-dark"
                style={{ fontSize: 'var(--text-title)' }}
              >
                {copy.citiesTitle}
              </h2>
            </div>
            <Link
              href="/cities"
              className="whitespace-nowrap border-b border-brand-rule-strong pb-1 text-sm text-brand-muted transition-colors hover:border-brand-dark hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange-deep"
            >
              {tc('viewAll')} →
            </Link>
          </FadeIn>

          <Stagger className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-12">
            {topCities.map((city, i) => {
              // 5 / 4 / 3 repeating, so no two rows break the same way.
              // Written out rather than interpolated: Tailwind scans source
              // text, so `lg:col-span-${n}` would never be generated.
              const span = ['lg:col-span-5', 'lg:col-span-4', 'lg:col-span-3', 'lg:col-span-3', 'lg:col-span-4', 'lg:col-span-5'][i % 6];
              const tall = span.endsWith('5');
              return (
                <StaggerItem key={city.slug} className={`col-span-1 ${span}`}>
                  <Link
                    href={cityHref(city)}
                    className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange-deep"
                  >
                    <figure className={`relative overflow-hidden ${tall ? 'aspect-[4/5]' : 'aspect-[3/4]'}`}>
                      <Picture
                        slot={citySlot(city.slug)}
                        alt={city.name}
                        sizes="(max-width: 1024px) 50vw, 30vw"
                        className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
                        fill
                      />
                    </figure>
                    <div className="mt-3 flex items-baseline justify-between gap-3 border-t border-brand-rule pt-2.5">
                      <span className="font-display text-lg font-semibold text-brand-dark transition-colors group-hover:text-brand-orange-deep">
                        {city.name}
                      </span>
                      <span className="shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-brand-muted">
                        {tx(city.region, locale)}
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* How it works */}
      <section aria-labelledby="how-heading" className="mx-auto max-w-7xl px-6 py-20">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-widest text-brand-orange-deep">{copy.howEyebrow}</p>
          <h2 id="how-heading" className="mt-2 max-w-2xl font-display text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
            {copy.howTitle}
          </h2>
        </FadeIn>
        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <StaggerItem key={step.n}>
              <div className="relative h-full rounded-card border border-brand-rule bg-white p-7">
                <span className="font-mono text-sm font-semibold text-brand-orange-deep">{step.n}</span>
                <h3 className="mt-4 font-display text-xl font-semibold text-brand-dark">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">{step.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="bg-brand-sand py-20">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <h2 id="faq-heading" className="text-center font-display text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
              {copy.faqTitle}
            </h2>
          </FadeIn>
          <div className="mt-10 divide-y divide-black/5 rounded-card border border-brand-rule bg-white">
            {faqs.map((faq) => (
              <details key={faq.q} className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep">
                  {faq.q}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-sand text-brand-dark transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-brand-muted">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/*
        Long-form close. The page above is grids and photographs; this is the
        only place a reader — or a crawler — gets the offer in prose.
      */}
      <SeoProse
        headingId="seo-prose-heading"
        eyebrow={tx(SEO_PROSE.eyebrow, locale)}
        heading={tx(SEO_PROSE.heading, locale)}
        paragraphs={tx(SEO_PROSE.paragraphs, locale)}
        facts={tx(SEO_PROSE.facts, locale)}
      />

      {/* Conversion CTA */}
      <section aria-labelledby="cta-heading" className="mx-auto max-w-7xl px-6 pb-8">
        <FadeIn>
          <div data-surface="dark" className="relative overflow-hidden rounded-card bg-brand-dark px-8 py-16 text-center sm:px-16 sm:py-20">
            <h2 id="cta-heading" className="relative mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {copy.ctaTitle}
            </h2>
            <p className="relative mx-auto mt-4 max-w-lg text-base text-neutral-300">{copy.ctaSub}</p>
            <div className="relative mt-9 flex flex-wrap justify-center gap-3">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 rounded-chip bg-brand-orange-deep px-8 py-3.5 text-base font-semibold text-white transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {tc('bookNow')}
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-chip border border-white/20 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {tc('discover')}
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
