import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { type Locale, tx } from '@/lib/locales';
import { SERVICES, CITIES } from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';
import { graph, breadcrumbNode, webPageNode } from '@/lib/jsonld';
import { absoluteUrl } from '@/lib/urls';
import { cityImage, absoluteOgImage } from '@/lib/images';
import { whatsappLink } from '@/lib/site';
import JsonLd from '@/components/JsonLd';
import SeoProse from '@/components/SeoProse';
import { META_TITLE, META_DESCRIPTION, OG_IMAGE_ALT, SEO_PROSE } from './content';

/** The city that fronts the contact page on social previews. */
const OG_CITY_SLUG = 'lyon';
import LeadForm, {
  type LeadFormServiceOption,
  type LeadFormCityOption,
} from '@/components/LeadForm';

const COPY = {
  title: { en: 'Contact', fr: 'Contact' },
  eyebrow: { en: 'Let’s talk', fr: 'Parlons-en' },
  intro: {
    en: 'Have a special request or a question? Write to us — we reply within a few hours. For the fastest answers, WhatsApp is the ideal channel.',
    fr: 'Une demande spéciale ou une question ? Écrivez-nous — nous répondons en quelques heures. Pour les réponses les plus rapides, WhatsApp est idéal.',
  },
  whatsappTitle: { en: 'Instant reply', fr: 'Réponse immédiate' },
  whatsappCta: { en: 'Message us on WhatsApp', fr: 'Écrivez-nous sur WhatsApp' },
  whatsappMsg: { en: 'Hi Ylala! I would like information about a photo service.', fr: 'Bonjour Ylala ! Je souhaite des informations sur un service photo.' },
  breadcrumbHome: { en: 'Home', fr: 'Accueil' },
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
    ogImage: cityImage(OG_CITY_SLUG),
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
      image: absoluteOgImage(cityImage(OG_CITY_SLUG)),
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
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange-deep">
            {c('eyebrow', locale)}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
            {c('title', locale)}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-brand-muted">{c('intro', locale)}</p>

          <div data-surface="dark" className="mt-8 rounded-card bg-brand-dark p-6 text-white">
            <h2 className="font-display text-lg font-semibold">{c('whatsappTitle', locale)}</h2>
            <a
              href={whatsappLink(c('whatsappMsg', locale))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-chip bg-[#25D366] px-6 py-3 font-semibold text-brand-dark transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
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
