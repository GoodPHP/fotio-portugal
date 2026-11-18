import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { type Locale, tx } from '@/lib/locales';
import { getServiceById } from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';
import { graph, breadcrumbNode, webPageNode, faqNode } from '@/lib/jsonld';
import { ORG_ID } from '@/lib/jsonld-ids';
import { absoluteUrl } from '@/lib/urls';
import { serviceSlot, absoluteOgImage, ogImagePath } from '@/lib/images';
import { CURRENCY, formatDelivery, formatDuration, formatPhotoCount, formatPrice, whatsappBookingLink } from '@/lib/site';
import { REPLY_TIME, WEATHER } from '@/lib/promises';
import { CTA } from '@/lib/cta';
import { serviceHref, cityHrefBySlug } from '@/lib/routes';
import { PROMO_IDS, holidayPrice } from '@/lib/promo';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import Faq from '@/components/Faq';
import { ArrowIcon, CheckMark, WhatsAppIcon } from '@/components/Icons';
import PromoLink from '@/components/promo/PromoLink';
import RememberPromo from '@/components/promo/RememberPromo';

/**
 * Christmas & New Year proposals, 2026.
 *
 * The offer is the existing proposal session at its published price — nothing
 * here is a separate package. What the page adds is the season: where the
 * lights are, when the sun goes down in December, what happens if it rains.
 * Everything is plain text, so search engines and AI answer engines can read
 * it without the images.
 */

const PROMO_ID = PROMO_IDS.proposal;

const COPY = {
  metaTitle: { en: 'Christmas Proposal Photographer in Portugal', pt: 'Fotógrafo para pedido de casamento no Natal' },
  // The price is appended in `metaDescription()` from the catalogue.
  metaDescription: {
    en: 'Propose in Lisbon, Sintra or Porto this Christmas or New Year. A hidden photographer, timing around the 17:15 sunset and a plan B for rain.',
    pt: 'Pedido de casamento em Lisboa, Sintra ou no Porto no Natal. Fotógrafo escondido, hora antes do pôr do sol e plano B para a chuva.',
  },
  eyebrow: { en: 'Christmas & New Year 2026', pt: 'Natal e Ano Novo 2026' },
  h1: { en: 'A Christmas proposal in Portugal, photographed', pt: 'Pedido de casamento no Natal, em Portugal, fotografado' },
  intro: {
    en: 'December in Portugal is mild, the streets are lit, and the sun sets early — around 17:15 in Lisbon. That makes it a good month to propose: the light is soft by late afternoon and the Christmas lights come on soon after. A local photographer waits out of sight, photographs the moment, and then takes a few portraits of the two of you.',
    pt: 'Dezembro em Portugal é ameno, as ruas estão iluminadas e o sol põe-se cedo — por volta das 17:15 em Lisboa. É um bom mês para o pedido: a luz fica suave ao fim da tarde e as luzes de Natal acendem-se logo a seguir. Um fotógrafo local espera sem ser visto, fotografa o momento e depois faz alguns retratos dos dois.',
  },
  breadcrumbHome: { en: 'Home', pt: 'Início' },
  breadcrumbServices: { en: 'Services', pt: 'Serviços' },
  breadcrumb: { en: 'Christmas proposal', pt: 'Pedido de casamento no Natal' },
  priceTitle: { en: 'What is included', pt: 'O que está incluído' },
  from: { en: 'From', pt: 'Desde' },
  priceNote: {
    en: 'Christmas and New Year price. The final price is confirmed in writing before you book.',
    pt: 'Preço de Natal e Ano Novo. O preço final é confirmado por escrito antes de reservar.',
  },
  cta: { en: 'Request your date', pt: 'Peça a sua data' },
  placesTitle: { en: 'Where to propose at Christmas', pt: 'Onde fazer o pedido no Natal' },
  placesIntro: {
    en: 'Three places that work well in December. We scout the exact spot for your time of day and send it to you before the day.',
    pt: 'Três sítios que resultam bem em dezembro. Reconhecemos o ponto exacto para a vossa hora e enviamo-lo antes do dia.',
  },
  seeCity: { en: 'Photographers in', pt: 'Fotógrafos em' },
  howTitle: { en: 'How it works', pt: 'Como funciona' },
  giftTitle: { en: 'Not proposing, but want to give a session?', pt: 'Não vai pedir em casamento, mas quer oferecer uma sessão?' },
  giftText: {
    en: 'A gift card covers a couple session, a family session or a proposal shoot. The recipient picks the date later.',
    pt: 'Um vale-presente serve para uma sessão de casal, uma sessão de família ou um pedido de casamento. Quem recebe escolhe a data depois.',
  },
  giftCta: { en: 'Gift card', pt: 'Vale-presente' },
  serviceLink: { en: 'The proposal session all year round', pt: 'A sessão de pedido de casamento durante todo o ano' },
  faqTitle: { en: 'Christmas proposal questions', pt: 'Perguntas sobre o pedido no Natal' },
  finalTitle: { en: 'Tell us your city and your date', pt: 'Diga-nos a cidade e a data' },
} as const;

type Pair = { en: string; pt: string };
const c = (pair: Pair, locale: Locale) => pair[locale];

/** The holiday price of the proposal session, from the catalogue. */
function christmasPrice(): number {
  const service = getServiceById('proposal');
  if (!service) throw new Error('christmas-proposal: the proposal service is missing from the catalogue');
  return holidayPrice(service.initialPrice);
}

function metaDescription(locale: Locale): string {
  const from = locale === 'pt' ? 'Desde' : 'From';
  return `${c(COPY.metaDescription, locale)} ${from} ${formatPrice(christmasPrice(), locale)}.`;
}

const INCLUDED: Pair[] = [
  {
    en: 'A hidden photographer: in place before you arrive, photographing from a distance',
    pt: 'Um fotógrafo escondido: já no local antes de chegarem, a fotografar à distância',
  },
  {
    en: 'Help with timing: an exact spot and minute, agreed the day before at the latest',
    pt: 'Ajuda com a hora: um ponto e um minuto exactos, combinados o mais tardar na véspera',
  },
  {
    en: 'A plan B for rain: a covered spot nearby, chosen in advance',
    pt: 'Um plano B para a chuva: um sítio coberto perto, escolhido com antecedência',
  },
  {
    // TODO(Oleg): the brief asks for "preview within 24 hours", but the site
    // only promises the full gallery in 48 hours, with express 24h delivery as
    // a paid option quoted before booking. Change this line once a free
    // 24-hour preview is a real promise (and add it to the Terms).
    en: 'Express 24-hour delivery available as an option, quoted before you book',
    pt: 'Entrega expresso em 24 horas disponível como opção, orçamentada antes de reservar',
  },
];

const PLACES: Array<{ city: string; name: Pair; text: Pair }> = [
  {
    city: 'lisboa',
    name: { en: 'Lisbon', pt: 'Lisboa' },
    text: {
      en: 'The Christmas tree on Praça do Comércio, the lights of Rossio and the Baixa, or a miradouro at sunset with the city turning gold below. Sunset is around 17:15 in December, so a late-afternoon proposal catches the last light and then the lights coming on.',
      pt: 'A árvore de Natal da Praça do Comércio, as luzes do Rossio e da Baixa, ou um miradouro ao pôr do sol com a cidade a ficar dourada lá em baixo. Em dezembro o sol põe-se por volta das 17:15, por isso um pedido ao fim da tarde apanha a última luz e depois as luzes a acenderem-se.',
    },
  },
  {
    city: 'sintra',
    name: { en: 'Sintra', pt: 'Sintra' },
    text: {
      en: 'Pena Palace and the hills around it in low winter light, often with mist in the trees. Quieter than in summer, and the colours of the palace stand out against a grey sky.',
      pt: 'O Palácio da Pena e a serra à volta, com a luz baixa de inverno e muitas vezes nevoeiro entre as árvores. Mais calmo do que no verão, e as cores do palácio destacam-se num céu cinzento.',
    },
  },
  {
    city: 'porto',
    name: { en: 'Porto', pt: 'Porto' },
    text: {
      en: 'The Christmas lights along Avenida dos Aliados, or the Ribeira by the river with the Dom Luís I bridge behind you as the sun goes down.',
      pt: 'As luzes de Natal da Avenida dos Aliados, ou a Ribeira junto ao rio com a ponte D. Luís I atrás de vocês ao cair do sol.',
    },
  },
];

const STEPS: Array<{ title: Pair; text: Pair }> = [
  {
    title: { en: 'Message us, not them', pt: 'Fale connosco, não com a outra pessoa' },
    text: {
      en: 'Tell us the city, roughly when, and what your partner thinks the day is about. Everything goes to your email or phone only.',
      pt: 'Diga-nos a cidade, mais ou menos quando, e o que a outra pessoa julga que vai acontecer nesse dia. Tudo vai só para o seu e-mail ou telemóvel.',
    },
  },
  {
    title: { en: 'The spot and the minute, fixed in advance', pt: 'O sítio e o minuto, fixos com antecedência' },
    text: {
      en: 'We send you an exact place to stand, a time, and a covered second spot in case of rain.',
      pt: 'Enviamos-lhe o ponto exacto onde ficar, a hora e um segundo sítio coberto para o caso de chover.',
    },
  },
  {
    title: { en: 'The photographer is already there', pt: 'O fotógrafo já lá está' },
    text: {
      en: 'Dressed like anyone else, photographing other things, with a long lens. When the answer is given, they walk over for a few portraits.',
      pt: 'Vestido como qualquer pessoa, a fotografar outras coisas, com uma teleobjectiva. Quando há resposta, aproxima-se para alguns retratos.',
    },
  },
];

function faqs(locale: Locale) {
  const en = [
    {
      question: 'What if it rains in December?',
      answer: `December is one of the wetter months, so every Christmas proposal has a plan B: a covered spot near the first one, chosen in advance — the arcades of Praça do Comércio in Lisbon or São Bento station in Porto, for example. ${tx(WEATHER.body, 'en')}`,
    },
    {
      question: 'What time is sunset in December?',
      answer: 'Around 17:15 in Lisbon in December, and a little earlier in Porto. We usually plan the proposal for 30 to 45 minutes before sunset, so there is soft daylight for the moment and the Christmas lights are on for the portraits afterwards.',
    },
    {
      question: 'How does the photographer hide?',
      answer: 'The photographer is in place before you arrive, dressed like anyone else and photographing other things with a long lens, from a distance. They do not look at you before the agreed minute. The one thing that gives a surprise away is you looking for them, so we tell you exactly where to stand instead.',
    },
    {
      question: 'How quickly do you reply?',
      answer: `${tx(REPLY_TIME, 'en')} Christmas and New Year dates are popular, so it helps to send your request early.`,
    },
  ];
  const pt = [
    {
      question: 'E se chover em dezembro?',
      answer: `Dezembro é um dos meses com mais chuva, por isso cada pedido no Natal tem um plano B: um sítio coberto perto do primeiro, escolhido com antecedência — por exemplo, as arcadas da Praça do Comércio em Lisboa ou a estação de São Bento no Porto. ${tx(WEATHER.body, 'pt')}`,
    },
    {
      question: 'A que horas é o pôr do sol em dezembro?',
      answer: 'Por volta das 17:15 em Lisboa, em dezembro, e um pouco mais cedo no Porto. Normalmente marcamos o pedido para 30 a 45 minutos antes do pôr do sol, para haver luz suave no momento e as luzes de Natal já acesas para os retratos a seguir.',
    },
    {
      question: 'Como é que o fotógrafo se esconde?',
      answer: 'O fotógrafo chega antes de vocês, vestido como qualquer pessoa, e vai fotografando outras coisas com uma teleobjectiva, à distância. Não olha para vocês antes do minuto combinado. O que mais estraga a surpresa é procurá-lo com os olhos, por isso dizemos-lhe exactamente onde ficar.',
    },
    {
      question: 'Quanto tempo demoram a responder?',
      answer: `${tx(REPLY_TIME, 'pt')} As datas do Natal e do Ano Novo são procuradas, por isso ajuda enviar o pedido cedo.`,
    },
  ];
  return locale === 'pt' ? pt : en;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    route: '/services/christmas-proposal',
    title: c(COPY.metaTitle, locale),
    description: metaDescription(locale),
    ogImage: ogImagePath(serviceSlot('proposal')),
  });
}

export default async function ChristmasProposalPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const service = getServiceById('proposal');
  if (!service) throw new Error('christmas-proposal: the proposal service is missing from the catalogue');
  const price = formatPrice(christmasPrice(), locale);
  const facts = [
    formatDuration(service.durationMinutes, locale),
    `${formatPhotoCount(service)} ${locale === 'pt' ? 'fotografias retocadas' : 'retouched photographs'}`,
    `${locale === 'pt' ? 'Galeria privada em' : 'Private gallery within'} ${formatDelivery(service.deliveryHours, locale)}`,
  ];

  const url = absoluteUrl(locale, '/services/christmas-proposal');
  const entries = faqs(locale);
  const jsonLd = graph([
    webPageNode({
      url,
      name: c(COPY.metaTitle, locale),
      description: metaDescription(locale),
      locale,
      image: absoluteOgImage(ogImagePath(serviceSlot('proposal'))),
      mainEntityId: `${url}#service`,
    }),
    {
      '@type': 'Service',
      '@id': `${url}#service`,
      name: c(COPY.breadcrumb, locale),
      serviceType: tx(service.name, locale),
      provider: { '@id': ORG_ID },
      areaServed: PLACES.map((p) => ({ '@type': 'City', name: c(p.name, locale) })),
      offers: {
        '@type': 'Offer',
        price: christmasPrice(),
        priceCurrency: CURRENCY,
        url,
      },
    },
    breadcrumbNode([
      { name: c(COPY.breadcrumbHome, locale), url: absoluteUrl(locale, '/') },
      { name: c(COPY.breadcrumbServices, locale), url: absoluteUrl(locale, '/services') },
      { name: c(COPY.breadcrumb, locale), url },
    ]),
    faqNode(entries),
  ]);

  const bookLink = { pathname: '/book', query: { service: 'proposal', occasion: 'christmas' } } as const;
  const whatsappHref = whatsappBookingLink({ session: c(COPY.breadcrumb, locale) }, locale);
  const focus = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark';

  return (
    <main>
      <JsonLd data={jsonLd} />
      <RememberPromo promoId={PROMO_ID} />

      <div className="mx-auto max-w-[92rem] px-6 pt-8 sm:pt-10">
        <Breadcrumbs
          items={[
            { name: c(COPY.breadcrumbHome, locale), href: '/' },
            { name: c(COPY.breadcrumbServices, locale), href: '/services' },
            { name: c(COPY.breadcrumb, locale) },
          ]}
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-12">
          <header className="lg:col-span-7">
            <p className="eyebrow">{c(COPY.eyebrow, locale)}</p>
            <h1 className="font-display mt-4 font-bold leading-[1.0] text-brand-dark" style={{ fontSize: 'var(--text-title)' }}>
              {c(COPY.h1, locale)}
            </h1>
            <p className="measure mt-5 text-lg leading-relaxed text-brand-muted">{c(COPY.intro, locale)}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <PromoLink href={bookLink} promoId={PROMO_ID} placement="xmas_page_hero" className={`btn btn-primary justify-center ${focus}`}>
                {c(COPY.cta, locale)}
                <ArrowIcon />
              </PromoLink>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-outline justify-center ${focus}`}
                data-track="whatsapp_clicked"
                data-track-context="xmas-proposal"
                data-track-promo_id={PROMO_ID}
              >
                <WhatsAppIcon className="h-4 w-4" />
                {tx(CTA.chatWhatsapp, locale)}
              </a>
            </div>
          </header>

          <section aria-labelledby="xmas-price-heading" className="tile p-7 sm:p-8 lg:col-span-5 lg:self-start">
            <h2 id="xmas-price-heading" className="font-display text-2xl font-bold text-brand-dark">
              {c(COPY.priceTitle, locale)}
            </h2>
            <p className="mt-3 font-display text-3xl font-bold text-brand-dark">
              <span className="text-base font-normal text-brand-muted">{c(COPY.from, locale)} </span>
              {price}
            </p>
            <p className="mt-1 text-sm text-brand-muted">{facts.join(' · ')}</p>
            <ul className="mt-6 space-y-3">
              {INCLUDED.map((item) => (
                <li key={item.en} className="flex gap-3 text-brand-dark">
                  <CheckMark className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{c(item, locale)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-brand-muted">{c(COPY.priceNote, locale)}</p>
          </section>
        </div>
      </div>

      <section aria-labelledby="xmas-places-heading" className="mx-auto max-w-[92rem] px-6 py-[var(--space-section)]">
        <h2 id="xmas-places-heading" className="font-display text-3xl font-bold text-brand-dark sm:text-4xl">
          {c(COPY.placesTitle, locale)}
        </h2>
        <p className="measure mt-3 text-brand-muted">{c(COPY.placesIntro, locale)}</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {PLACES.map((place) => (
            <article key={place.city} className="tile flex flex-col p-6">
              <h3 className="font-display text-xl font-bold text-brand-dark">{c(place.name, locale)}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-brand-muted">{c(place.text, locale)}</p>
              <Link href={cityHrefBySlug(place.city)} className="link-ruled mt-5 self-start text-sm">
                {c(COPY.seeCity, locale)} {c(place.name, locale)}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="xmas-how-heading" className="border-t border-brand-rule bg-brand-cream/60 py-[var(--space-section)]">
        <div className="mx-auto max-w-[92rem] px-6">
          <h2 id="xmas-how-heading" className="font-display text-3xl font-bold text-brand-dark sm:text-4xl">
            {c(COPY.howTitle, locale)}
          </h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title.en} className="tile p-6">
                <span className="font-mono text-xs font-semibold text-brand-orange-deep">0{i + 1}</span>
                <h3 className="font-display mt-2 text-lg font-bold text-brand-dark">{c(step.title, locale)}</h3>
                <p className="mt-2 leading-relaxed text-brand-muted">{c(step.text, locale)}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm">
            <Link href={serviceHref(service, locale)} className="link-ruled">
              {c(COPY.serviceLink, locale)}
            </Link>
          </p>
        </div>
      </section>

      <Faq headingId="xmas-faq-heading" title={c(COPY.faqTitle, locale)} entries={entries} />

      <section aria-labelledby="xmas-gift-heading" className="mx-auto max-w-[92rem] px-6 pt-[var(--space-section)]">
        <div className="tile flex flex-col gap-5 p-7 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 id="xmas-gift-heading" className="font-display text-2xl font-bold text-brand-dark">
              {c(COPY.giftTitle, locale)}
            </h2>
            <p className="mt-2 text-brand-muted">{c(COPY.giftText, locale)}</p>
          </div>
          <PromoLink href="/gift-card" promoId={PROMO_IDS.gift} placement="xmas_page" className={`btn btn-outline justify-center ${focus}`}>
            {c(COPY.giftCta, locale)}
          </PromoLink>
        </div>
      </section>

      <section aria-labelledby="xmas-final-heading" className="mx-auto max-w-[92rem] px-6 py-[var(--space-band)]">
        <div data-surface="dark" className="bg-brand-dark px-7 py-10 text-white sm:px-12 sm:py-14 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <h2 id="xmas-final-heading" className="font-display text-3xl font-bold leading-[1.05] sm:text-4xl">
              {c(COPY.finalTitle, locale)}
            </h2>
            <p className="mt-4 leading-relaxed text-white/75">{tx(REPLY_TIME, locale)}</p>
          </div>
          <PromoLink
            href={bookLink}
            promoId={PROMO_ID}
            placement="xmas_page_final"
            className="btn btn-primary mt-8 justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:mt-0 lg:shrink-0"
          >
            {c(COPY.cta, locale)}
            <ArrowIcon />
          </PromoLink>
        </div>
      </section>
    </main>
  );
}
