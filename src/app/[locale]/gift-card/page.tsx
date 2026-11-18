import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { type Locale, tx } from '@/lib/locales';
import { buildMetadata } from '@/lib/seo';
import { graph, breadcrumbNode, webPageNode, faqNode } from '@/lib/jsonld';
import { ORG_ID } from '@/lib/jsonld-ids';
import { absoluteUrl } from '@/lib/urls';
import { serviceSlot, absoluteOgImage, ogImagePath } from '@/lib/images';
import { CURRENCY, formatPrice } from '@/lib/site';
import { REPLY_TIME, WEATHER } from '@/lib/promises';
import { giftCardOptions } from '@/lib/gift-card';
import { GIFT_VALIDITY_MONTHS, PROMO_IDS } from '@/lib/promo';
import { serviceHref } from '@/lib/routes';
import { getServiceById } from '@/lib/catalog';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import Faq from '@/components/Faq';
import { CheckMark } from '@/components/Icons';
import GiftCardForm from '@/components/promo/GiftCardForm';
import BlackFridayNote from '@/components/promo/BlackFridayNote';
import RememberPromo from '@/components/promo/RememberPromo';
import PromoLink from '@/components/promo/PromoLink';

/**
 * Gift cards: a couple session, a family session or a proposal shoot, each at
 * the session's published price. No online payment — the request is a lead
 * like any other, and the printable PDF card is sent by hand.
 *
 * The Black Friday line is rendered in the browser on 27–30 Nov only
 * (`BlackFridayNote`), so it is never in this page's static HTML.
 */

const COPY = {
  metaTitle: { en: 'Photoshoot Gift Card in Portugal', pt: 'Vale-presente de sessão fotográfica' },
  metaDescription: {
    en: 'Give a couple, family or proposal photo session in Portugal. A printable PDF card within 24 hours, valid for 12 months; the recipient picks the date.',
    pt: 'Ofereça uma sessão de casal, família ou pedido de casamento em Portugal. Vale em PDF em 24 horas, válido 12 meses.',
  },
  eyebrow: { en: 'Gift card', pt: 'Vale-presente' },
  h1: { en: 'Give a photo session in Portugal', pt: 'Ofereça uma sessão fotográfica em Portugal' },
  intro: {
    en: 'A gift card for a session with a local photographer: a couple session, a family session or a proposal shoot. You tell us who it is for, we send you a printable PDF card, and the recipient chooses the place and the date when they are ready.',
    pt: 'Um vale para uma sessão com um fotógrafo local: uma sessão de casal, uma sessão de família ou um pedido de casamento. Diz-nos para quem é, enviamos-lhe um vale em PDF para imprimir, e quem recebe escolhe o sítio e a data quando quiser.',
  },
  breadcrumbHome: { en: 'Home', pt: 'Início' },
  optionsTitle: { en: 'Three gift cards', pt: 'Três vales-presente' },
  from: { en: 'From', pt: 'Desde' },
  details: { en: 'About the session', pt: 'Sobre a sessão' },
  photos: { en: 'retouched photographs', pt: 'fotografias retocadas' },
  howTitle: { en: 'How it works', pt: 'Como funciona' },
  formTitle: { en: 'Request a gift card', pt: 'Pedir um vale-presente' },
  formIntro: {
    en: 'No payment online. We reply with the details, and we email the PDF card within 24 hours.',
    pt: 'Sem pagamento online. Respondemos com os detalhes e enviamos o vale em PDF por e-mail em 24 horas.',
  },
  faqTitle: { en: 'Gift card questions', pt: 'Perguntas sobre o vale-presente' },
  proposalLink: { en: 'Proposing at Christmas? See the Christmas proposal page', pt: 'Vai pedir em casamento no Natal? Veja a página do pedido no Natal' },
} as const;

type Pair = { en: string; pt: string };
const c = (pair: Pair, locale: Locale) => pair[locale];

/** The SERP description, with the lowest gift card price from the catalogue. */
function metaDescription(locale: Locale): string {
  const lowest = Math.min(...giftCardOptions(locale).map((o) => o.price));
  const from = locale === 'pt' ? 'Desde' : 'From';
  return `${c(COPY.metaDescription, locale)} ${from} ${formatPrice(lowest, locale)}.`;
}

const STEPS: Pair[] = [
  {
    en: 'Choose the session and tell us who it is for. Send it to yourself, or straight to the recipient on a date you choose.',
    pt: 'Escolha a sessão e diga-nos para quem é. Envie-o para si, ou diretamente a quem recebe, na data que escolher.',
  },
  {
    en: 'We email you a printable PDF gift card within 24 hours.',
    pt: 'Enviamos-lhe por e-mail um vale-presente em PDF, para imprimir, em 24 horas.',
  },
  {
    en: `The card is valid for ${GIFT_VALIDITY_MONTHS} months from purchase. The recipient picks the place and the date later, and books it with us.`,
    pt: `O vale é válido durante ${GIFT_VALIDITY_MONTHS} meses a partir da compra. Quem recebe escolhe o sítio e a data depois, e marca connosco.`,
  },
];

function faqs(locale: Locale) {
  const en = [
    {
      question: 'How long is the gift card valid?',
      answer: `${GIFT_VALIDITY_MONTHS} months from the date of purchase. The recipient chooses the date of the session within that time.`,
    },
    {
      question: 'How do I receive the gift card?',
      answer: 'As a printable PDF card, sent by email within 24 hours of your request. You can ask us to send it to you, or straight to the recipient on a date you choose — on Christmas Eve, for example.',
    },
    {
      question: 'Can I pay online?',
      answer: 'Not on the site. Send the request and we reply with the details of the card and how to pay.',
    },
    {
      question: 'Where can the session take place?',
      answer: 'Anywhere we work in Portugal — Lisbon, Sintra, Porto, Cascais, the Algarve, Madeira, the Azores and more. The recipient chooses when they book.',
    },
    {
      question: 'What if the weather is bad on the day?',
      answer: tx(WEATHER.body, 'en'),
    },
    {
      question: 'How quickly do you reply?',
      answer: tx(REPLY_TIME, 'en'),
    },
  ];
  const pt = [
    {
      question: 'Durante quanto tempo é válido o vale?',
      answer: `${GIFT_VALIDITY_MONTHS} meses a partir da data da compra. Quem recebe escolhe a data da sessão dentro desse prazo.`,
    },
    {
      question: 'Como recebo o vale-presente?',
      answer: 'Como um vale em PDF, para imprimir, enviado por e-mail em 24 horas a partir do pedido. Pode pedir que o enviemos para si, ou diretamente a quem recebe numa data à sua escolha — na véspera de Natal, por exemplo.',
    },
    {
      question: 'Posso pagar online?',
      answer: 'Não no site. Envie o pedido e respondemos com os detalhes do vale e a forma de pagamento.',
    },
    {
      question: 'Onde pode ser a sessão?',
      answer: 'Em qualquer sítio onde trabalhamos em Portugal — Lisboa, Sintra, Porto, Cascais, Algarve, Madeira, Açores e outros. Quem recebe escolhe ao marcar.',
    },
    {
      question: 'E se o tempo estiver mau no dia?',
      answer: tx(WEATHER.body, 'pt'),
    },
    {
      question: 'Quanto tempo demoram a responder?',
      answer: tx(REPLY_TIME, 'pt'),
    },
  ];
  return locale === 'pt' ? pt : en;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    route: '/gift-card',
    title: c(COPY.metaTitle, locale),
    description: metaDescription(locale),
    ogImage: ogImagePath(serviceSlot('couple')),
  });
}

export default async function GiftCardPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const options = giftCardOptions(locale);
  const url = absoluteUrl(locale, '/gift-card');
  const entries = faqs(locale);
  const jsonLd = graph([
    webPageNode({
      url,
      name: c(COPY.metaTitle, locale),
      description: metaDescription(locale),
      locale,
      image: absoluteOgImage(ogImagePath(serviceSlot('couple'))),
      mainEntityId: `${url}#offers`,
    }),
    {
      '@type': 'OfferCatalog',
      '@id': `${url}#offers`,
      name: c(COPY.optionsTitle, locale),
      itemListElement: options.map((o) => ({
        '@type': 'Offer',
        name: `${c(COPY.eyebrow, locale)}: ${o.name}`,
        price: o.price,
        priceCurrency: CURRENCY,
        url,
        seller: { '@id': ORG_ID },
      })),
    },
    breadcrumbNode([
      { name: c(COPY.breadcrumbHome, locale), url: absoluteUrl(locale, '/') },
      { name: c(COPY.eyebrow, locale), url },
    ]),
    faqNode(entries),
  ]);

  return (
    <main>
      <JsonLd data={jsonLd} />
      <RememberPromo promoId={PROMO_IDS.gift} />

      <div className="mx-auto max-w-[92rem] px-6 pt-8 sm:pt-10">
        <Breadcrumbs items={[{ name: c(COPY.breadcrumbHome, locale), href: '/' }, { name: c(COPY.eyebrow, locale) }]} />
        <header className="mt-8 max-w-3xl">
          <p className="eyebrow">{c(COPY.eyebrow, locale)}</p>
          <h1 className="font-display mt-4 font-bold leading-[1.0] text-brand-dark" style={{ fontSize: 'var(--text-title)' }}>
            {c(COPY.h1, locale)}
          </h1>
          <p className="measure mt-5 text-lg leading-relaxed text-brand-muted">{c(COPY.intro, locale)}</p>
        </header>

        <div className="mt-8 max-w-3xl">
          <BlackFridayNote locale={locale} placement="gift_page" />
        </div>

        <section aria-labelledby="gift-options-heading" className="mt-12">
          <h2 id="gift-options-heading" className="font-display text-3xl font-bold text-brand-dark sm:text-4xl">
            {c(COPY.optionsTitle, locale)}
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {options.map((o) => {
              const service = getServiceById(o.type);
              return (
              <article key={o.type} className="tile flex flex-col p-6">
                <h3 className="font-display text-xl font-bold text-brand-dark">{o.name}</h3>
                <p className="mt-3 font-display text-3xl font-bold text-brand-dark">
                  <span className="text-base font-normal text-brand-muted">{c(COPY.from, locale)} </span>
                  {formatPrice(o.price, locale)}
                </p>
                <p className="mt-2 text-sm text-brand-muted">
                  {o.duration} · {o.photos} {c(COPY.photos, locale)}
                </p>
                {service && (
                  <Link href={serviceHref(service, locale)} className="link-ruled mt-5 self-start text-sm">
                    {c(COPY.details, locale)}
                  </Link>
                )}
              </article>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="gift-how-heading" className="mt-[var(--space-section)]">
          <h2 id="gift-how-heading" className="font-display text-3xl font-bold text-brand-dark sm:text-4xl">
            {c(COPY.howTitle, locale)}
          </h2>
          <ol className="mt-6 space-y-3">
            {STEPS.map((step) => (
              <li key={step.en} className="flex gap-3 text-brand-dark">
                <CheckMark className="mt-1 h-4 w-4 shrink-0" />
                <span className="measure leading-relaxed">{c(step, locale)}</span>
              </li>
            ))}
          </ol>
        </section>

        <section id="request" aria-labelledby="gift-form-heading" className="mt-[var(--space-section)] max-w-4xl pb-[var(--space-section)]">
          <h2 id="gift-form-heading" className="font-display text-3xl font-bold text-brand-dark sm:text-4xl">
            {c(COPY.formTitle, locale)}
          </h2>
          <p className="measure mt-3 text-brand-muted">{c(COPY.formIntro, locale)}</p>
          <div className="mt-6">
            <GiftCardForm options={options} locale={locale} />
          </div>
          <p className="mt-6 text-sm">
            <PromoLink href="/services/christmas-proposal" promoId={PROMO_IDS.proposal} placement="gift_page" className="link-ruled">
              {c(COPY.proposalLink, locale)}
            </PromoLink>
          </p>
        </section>
      </div>

      <Faq headingId="gift-faq-heading" title={c(COPY.faqTitle, locale)} entries={entries} />
    </main>
  );
}
