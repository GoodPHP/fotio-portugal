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
import Faq from '@/components/Faq';
import { absoluteOgImage } from '@/lib/images';
import { META_TITLE, META_DESCRIPTION, OG_IMAGE_ALT, SEO_PROSE } from './content';

/**
 * Lisboa leads the network and carries the hero photograph and the OG card.
 *
 * This was `'paris'` until the redesign — a slug left behind by the site this
 * one was rebuilt from. Nothing broke visibly, because the lookup falls back
 * to the first published city, which is why it survived: the hero showed a
 * photograph and the OG card showed an image, just never the intended ones.
 */
const HERO_CITY_SLUG = 'lisboa';

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
  const heroCity =
    publishedCities().find((c) => c.slug === HERO_CITY_SLUG) ?? publishedCities()[0] ?? CITIES[0];
  // Featured grid + cities grid link out, so they must only show published pages.
  // One published service per category → up to six distinct category images.
  const seenCategories = new Set<string>();
  const featuredServices = publishedServices(locale).filter((s) => {
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
    faqEyebrow: { en: 'Before you book', pt: 'Antes de reservar' }[locale],
    faqTitle: { en: 'Frequently asked questions', pt: 'Perguntas frequentes' }[locale],
    ctaEyebrow: { en: 'Next step', pt: 'Próximo passo' }[locale],
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
    statReply: { en: 'Reply time', pt: 'Tempo de resposta' }[locale],
    explore: { en: 'Explore services', pt: 'Ver os serviços' }[locale],
    from: { en: 'from', pt: 'desde' }[locale],
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

  const arrow = (
    <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h9m0 0L8.5 4.5M12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="square" />
    </svg>
  );

  return (
    <main>
      <JsonLd data={jsonLd} />

      {/*
        Hero.

        The site sells photography, so a photograph carries the page and the
        type sits beside it rather than on top of it — no scrim, no contrast
        compromise, and the headline stays crisp at any size. The lattice runs
        underneath the type block and fades out before it reaches the words,
        which is the one place on the site where the motif is decoration rather
        than structure and the only place it is allowed to be.
      */}
      <section aria-labelledby="hero-heading" className="relative overflow-hidden">
        <div
          className="azulejo azulejo-fade pointer-events-none absolute -left-24 top-0 hidden h-[34rem] w-[44rem] opacity-70 lg:block"
          style={{ ['--azulejo-cell' as string]: '46px' }}
          aria-hidden="true"
        />

        <div className="relative mx-auto grid max-w-[92rem] items-end gap-y-12 px-6 pb-[var(--space-band)] pt-12 lg:grid-cols-12 lg:gap-x-12 lg:pt-16">
          <FadeIn instant y={20} className="lg:col-span-7 xl:col-span-6">
            <p className="eyebrow">{copy.heroEyebrow}</p>
            <h1
              id="hero-heading"
              className="font-display-tight mt-6 font-bold text-brand-dark"
              style={{ fontSize: 'var(--text-display)' }}
            >
              {t('heroTitle')}
            </h1>
            <p className="measure mt-8 text-lg leading-relaxed text-brand-muted sm:text-xl">
              {t('heroSubtitle')}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/book"
                className="btn btn-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
              >
                {tc('bookNow')}
                {arrow}
              </Link>
              <Link
                href="/services"
                className="link-ruled text-base focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange-deep"
              >
                {copy.explore}
              </Link>
            </div>
          </FadeIn>

          {/*
            The photograph bleeds off the right edge rather than sitting in a
            box, and carries a caption bar rather than a caption: on a tiled
            wall the label is part of the tile.
          */}
          <FadeIn instant y={20} className="lg:col-span-5 xl:col-span-6 lg:-mr-6 xl:-mr-[max(0px,calc((100vw-92rem)/2))]">
            <figure className="relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-brand-rule sm:aspect-[16/10] lg:aspect-[3/4] lg:max-h-[70vh]">
                <Picture
                  slot={citySlot(heroCity.slug)}
                  alt={copy.heroImageAlt}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                  fill
                  priority
                />
              </div>
              <figcaption className="flex items-center justify-between gap-4 border-x border-b border-brand-rule bg-brand-tile px-4 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-brand-muted">
                <span className="text-brand-dark">{heroCity.name}</span>
                <span>{tx(heroCity.region, locale)}</span>
              </figcaption>
            </figure>
          </FadeIn>
        </div>

        {/*
          The facts, as a course of tiles. Same information the coloured boxes
          used to carry, a quarter of the visual weight, and it reads as fact
          rather than as decoration because the grout does the separating.
        */}
        <div className="mx-auto max-w-[92rem] px-6 pb-[var(--space-band)]">
          <dl className="grout grout-tile grid-cols-2 sm:grid-cols-4">
            {[
              { v: `${CITIES.length}`, k: copy.statCities },
              { v: `${SERVICES.length}`, k: copy.statServices },
              { v: '48–72h', k: copy.statDelivery },
              /*
                The fourth tile used to render an em dash whenever there were no
                reviews, which is every build: REVIEWS is deliberately empty,
                because an aggregate rating assembled from invented reviews is
                structured data that lies. A dash in a four-tile course reads as
                a broken cell rather than as an absence, so the tile carries the
                promise the site actually makes until there are real ratings to
                put there.
              */
              rating.reviewCount > 0
                ? { v: `${rating.ratingValue.toFixed(1)}/5`, k: copy.statRating }
                : { v: '2h', k: copy.statReply },
            ].map((s) => (
              <div key={s.k} className="px-5 py-7 sm:px-6">
                <dt className="sr-only">{s.k}</dt>
                <dd>
                  <span className="font-display block text-3xl font-bold leading-none tracking-[-0.04em] text-brand-dark sm:text-[2.75rem]">
                    {s.v}
                  </span>
                  <span className="mt-3 block font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-brand-muted">
                    {s.k}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Trust strip, on ink: the one band that inverts, so the page has a
          rhythm of light and dark before any photograph is seen. */}
      <section data-surface="dark" aria-labelledby="trust-heading" className="bg-brand-dark">
        {/*
          The cells are h3s, so the section needs its own h2 or the document
          skips a level. It is not shown because the cells read as a row of
          facts rather than a titled block, but a screen reader needs it.
        */}
        <h2 id="trust-heading" className="sr-only">
          {copy.trustHeading}
        </h2>
        <div className="mx-auto max-w-[92rem] px-6 py-[var(--space-band)]">
          <div className="grout grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map((item, i) => (
              <div key={item.title} className="px-6 py-7">
                <span className="font-mono text-[0.6875rem] font-semibold tracking-[0.16em] text-brand-orange-deep">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display mt-4 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*
        Featured services. An uneven grid rather than six identical tiles: the
        first two run large and the rest tuck in beside them, so the eye is
        given an order to read in. The photographs fill their frames edge to
        edge, with a caption bar underneath where it belongs.
      */}
      <section aria-labelledby="services-heading" className="mx-auto max-w-[92rem] px-6 py-[var(--space-section)]">
        <FadeIn className="flex flex-wrap items-end justify-between gap-6 border-b border-brand-rule pb-7">
          <div>
            <p className="eyebrow">{copy.servicesEyebrow}</p>
            <h2
              id="services-heading"
              className="font-display mt-4 font-bold leading-[1.0] text-brand-dark"
              style={{ fontSize: 'var(--text-title)' }}
            >
              {copy.servicesTitle}
            </h2>
          </div>
          <Link
            href="/services"
            className="link-ruled whitespace-nowrap text-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange-deep"
          >
            {tc('viewAll')}
            {arrow}
          </Link>
        </FadeIn>

        <Stagger className="mt-12 grid grid-cols-2 items-start gap-6 lg:grid-cols-6">
          {featuredServices.map((service, i) => {
            // The first two are given twice the room; the rest share the row.
            const feature = i < 2;
            return (
              <StaggerItem key={service.slug} className={feature ? 'col-span-2 lg:col-span-3' : 'col-span-1 lg:col-span-2'}>
                <Link
                  href={serviceHref(service, locale)}
                  className="tile tile-link group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange-deep"
                >
                  <figure className={`relative overflow-hidden ${feature ? 'aspect-[3/2]' : 'aspect-[4/3]'}`}>
                    <Picture
                      slot={serviceSlot(service.slug)}
                      alt={tx(service.name, locale)}
                      sizes={feature ? '(max-width: 1024px) 100vw, 45vw' : '(max-width: 1024px) 50vw, 30vw'}
                      className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
                      fill
                    />
                  </figure>
                  <div className="border-t border-brand-rule px-5 py-4">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3
                        className={`font-display font-semibold text-brand-dark transition-colors group-hover:text-brand-orange-deep ${
                          feature ? 'text-2xl sm:text-[1.75rem]' : 'text-lg'
                        }`}
                      >
                        {tx(service.name, locale)}
                      </h3>
                      <span className="shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-muted">
                        {copy.from} {formatPrice(service.initialPrice, locale)}
                      </span>
                    </div>
                    {feature && service.description && (
                      <p className="measure-tight mt-2.5 text-sm leading-relaxed text-brand-muted">
                        {tx(service.description, locale)}
                      </p>
                    )}
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      {/* A frieze rather than a rule: the section break is part of the wall. */}
      <div className="frieze azulejo" aria-hidden="true" />

      {/*
        Cities. The captions sit under the photographs rather than on top of
        them, so no scrim is needed and the images are seen whole. Widths run in
        a repeating uneven rhythm, which is what stops twelve frames reading as
        a contact sheet.
      */}
      <section aria-labelledby="cities-heading" className="bg-brand-cream/60 py-[var(--space-section)]">
        <div className="mx-auto max-w-[92rem] px-6">
          <FadeIn className="flex flex-wrap items-end justify-between gap-6 border-b border-brand-rule pb-7">
            <div>
              <p className="eyebrow">{copy.citiesEyebrow}</p>
              <h2
                id="cities-heading"
                className="font-display mt-4 font-bold leading-[1.0] text-brand-dark"
                style={{ fontSize: 'var(--text-title)' }}
              >
                {copy.citiesTitle}
              </h2>
            </div>
            <Link
              href="/cities"
              className="link-ruled whitespace-nowrap text-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange-deep"
            >
              {tc('viewAll')}
              {arrow}
            </Link>
          </FadeIn>

          <Stagger className="mt-12 grid grid-cols-2 items-start gap-6 lg:grid-cols-12">
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
                    className="tile tile-link group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange-deep"
                  >
                    <figure className={`relative overflow-hidden ${tall ? 'aspect-[4/5]' : 'aspect-[3/4]'}`}>
                      <Picture
                        slot={citySlot(city.slug)}
                        alt={city.name}
                        sizes="(max-width: 1024px) 50vw, 30vw"
                        className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
                        fill
                      />
                    </figure>
                    <div className="flex items-baseline justify-between gap-3 border-t border-brand-rule px-4 py-3.5">
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

      {/*
        How it works. Three tiles on one grout grid, each opening on an oversized
        numeral — the process is the only place on the site where a number is
        allowed to be the largest thing in its cell.
      */}
      <section aria-labelledby="how-heading" className="mx-auto max-w-[92rem] px-6 py-[var(--space-section)]">
        <FadeIn>
          <p className="eyebrow">{copy.howEyebrow}</p>
          <h2
            id="how-heading"
            className="font-display mt-4 max-w-3xl font-bold leading-[1.0] text-brand-dark"
            style={{ fontSize: 'var(--text-title)' }}
          >
            {copy.howTitle}
          </h2>
        </FadeIn>
        <div className="grout grout-tile mt-12 grid-cols-1 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.n} className="relative overflow-hidden px-7 py-9">
              {/* The lattice marks the corner of each step without competing
                  with the numeral for the cell. */}
              <div
                className="azulejo azulejo-fade pointer-events-none absolute right-0 top-0 h-28 w-28 opacity-70"
                style={{
                  ['--azulejo-cell' as string]: '28px',
                  ['--azulejo-origin' as string]: '100% 0%',
                }}
                aria-hidden="true"
              />
              <span className="font-display relative block text-5xl font-bold leading-none tracking-[-0.05em] text-brand-orange-deep">
                {step.n}
              </span>
              <h3 className="font-display relative mt-6 text-xl font-semibold text-brand-dark">{step.title}</h3>
              <p className="relative mt-2.5 text-sm leading-relaxed text-brand-muted">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Faq
        headingId="faq-heading"
        eyebrow={copy.faqEyebrow}
        title={copy.faqTitle}
        entries={faqs.map((f) => ({ question: f.q, answer: f.a }))}
      />

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

      {/* Conversion CTA: the page ends on the full tile, ink and lattice. */}
      <section aria-labelledby="cta-heading" className="mx-auto max-w-[92rem] px-6">
        <FadeIn>
          <div data-surface="dark" className="relative overflow-hidden bg-brand-dark px-8 py-[var(--space-band)] sm:px-16">
            <div
              className="azulejo azulejo-fade-r pointer-events-none absolute inset-y-0 right-0 w-full max-w-3xl opacity-80"
              style={{
                ['--azulejo-cell' as string]: '52px',
                maskImage: 'linear-gradient(to left, #000 20%, transparent 85%)',
                WebkitMaskImage: 'linear-gradient(to left, #000 20%, transparent 85%)',
              }}
              aria-hidden="true"
            />
            <div className="relative max-w-2xl">
              <p className="eyebrow">{copy.ctaEyebrow}</p>
              <h2
                id="cta-heading"
                className="font-display mt-4 font-bold leading-[1.02] text-white"
                style={{ fontSize: 'var(--text-title)' }}
              >
                {copy.ctaTitle}
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-brand-muted">{copy.ctaSub}</p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/book"
                  className="btn btn-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {tc('bookNow')}
                  {arrow}
                </Link>
                <Link
                  href="/services"
                  className="btn btn-outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {tc('discover')}
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
