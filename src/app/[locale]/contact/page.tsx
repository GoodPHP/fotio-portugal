import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { type Locale, tx } from '@/lib/locales';
import { SERVICES, CITIES } from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';
import { graph, breadcrumbNode, webPageNode } from '@/lib/jsonld';
import { absoluteUrl } from '@/lib/urls';
import { citySlot, absoluteOgImage, ogImagePath } from '@/lib/images';
import { SITE_NAME, whatsappLink } from '@/lib/site';
import JsonLd from '@/components/JsonLd';
import SeoProse from '@/components/SeoProse';
import { META_TITLE, META_DESCRIPTION, OG_IMAGE_ALT, SEO_PROSE } from './content';

/** The city that fronts the contact page on social previews. */
const OG_CITY_SLUG = 'lisboa';
import LeadForm, {
  type LeadFormServiceOption,
  type LeadFormCityOption,
} from '@/components/LeadForm';

const COPY = {
  title: { en: 'Contact', pt: 'Contacto' },
  eyebrow: { en: 'Let’s talk', pt: 'Vamos falar' },
  intro: {
    en: 'Have a special request or a question? Write to us — we reply within a few hours. For the fastest answers, WhatsApp is the ideal channel.',
    pt: 'Tem um pedido especial ou uma dúvida? Escreva-nos — respondemos dentro de poucas horas. Para a resposta mais rápida, o WhatsApp é o canal ideal.',
  },
  whatsappTitle: { en: 'Instant reply', pt: 'Resposta imediata' },
  whatsappCta: { en: 'Message us on WhatsApp', pt: 'Escreva-nos no WhatsApp' },
  whatsappMsg: { en: `Hi ${SITE_NAME}! I would like information about a photo service.`, pt: `Olá ${SITE_NAME}! Gostaria de informações sobre um serviço de fotografia.` },
  breadcrumbHome: { en: 'Home', pt: 'Início' },
} as const;

function c(key: keyof typeof COPY, locale: Locale): string {
  return (COPY[key] as Record<Locale, string>)[locale] ?? COPY[key].en;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  // "Contact" is a nav label. The title has to say contact whom, where, and
  // how fast the answer comes.
  return buildMetadata({
    locale,
    route: '/contact',
    title: tx(META_TITLE, locale),
    description: tx(META_DESCRIPTION, locale),
    ogImage: ogImagePath(citySlot(OG_CITY_SLUG)),
    ogImageAlt: tx(OG_IMAGE_ALT, locale),
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const services: LeadFormServiceOption[] = SERVICES.map((s) => ({ slug: s.slug, name: tx(s.name, locale) }));
  const cities: LeadFormCityOption[] = CITIES.map((c) => ({ slug: c.slug, name: c.name }));

  const contactUrl = absoluteUrl(locale, '/contact');
  const jsonLd = graph([
    webPageNode({
      url: contactUrl,
      name: tx(META_TITLE, locale),
      description: tx(META_DESCRIPTION, locale),
      locale,
      type: 'ContactPage',
      image: absoluteOgImage(ogImagePath(citySlot(OG_CITY_SLUG))),
    }),
    breadcrumbNode([
      { name: c('breadcrumbHome', locale), url: absoluteUrl(locale, '/') },
      { name: c('title', locale), url: contactUrl },
    ]),
  ]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <JsonLd data={jsonLd} />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.3fr]">
        <header className="lg:pt-2">
          <p className="eyebrow">
            {c('eyebrow', locale)}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
            {c('title', locale)}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-brand-muted">{c('intro', locale)}</p>

          <div data-surface="dark" className="mt-8 rounded-card bg-brand-dark p-6 text-white">
            <h2 className="font-display text-lg font-semibold">{c('whatsappTitle', locale)}</h2>
            <a
              href={whatsappLink(c('whatsappMsg', locale))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn mt-4 bg-[#25D366] text-brand-dark hover:bg-[#1FB855] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep"
            >
              {c('whatsappCta', locale)}
            </a>
          </div>
        </header>

        <section aria-label={c('title', locale)}>
          <LeadForm services={services} cities={cities} locale={locale} />
        </section>
      </div>

      <SeoProse
        nested
        headingId="contact-seo-heading"
        eyebrow={tx(SEO_PROSE.eyebrow, locale)}
        heading={tx(SEO_PROSE.heading, locale)}
        paragraphs={tx(SEO_PROSE.paragraphs, locale)}
        facts={tx(SEO_PROSE.facts, locale)}
      />
    </main>
  );
}
