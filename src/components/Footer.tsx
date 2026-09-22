import type { ComponentProps } from 'react';
import { getTranslations, getLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { hasPhotographers, localizedCityName, publishedCities, publishedServices } from '@/lib/catalog';
import { type Locale, tx } from '@/lib/locales';
import { SITE_NAME, SOCIAL_LINKS, whatsappBookingLink } from '@/lib/site';
import { cityHref, serviceHref } from '@/lib/routes';
import { LEGAL_PAGES_VISIBLE } from '@/lib/legal';
import { slugifyHeading } from '@/lib/article';
import { CTA } from '@/lib/cta';
import TileMark from './TileMark';
import { WhatsAppIcon } from './Icons';

/** The sessions people come for, in the order they ask for them. */
const FOOTER_SESSIONS = ['couple', 'proposal', 'family', 'honeymoon', 'wedding', 'lifestyle-portrait', 'vacation', 'maternity'];

/** The places people search for by name. */
const FOOTER_PLACES = ['lisboa', 'porto', 'sintra', 'cascais', 'algarve', 'madeira', 'acores', 'douro'];

/**
 * The Terms heading the refund link lands on. Anchored rather than a page of
 * its own: the refund policy is one clause of the Terms, and a separate page
 * would be a second copy of it to keep in step.
 */
const REFUND_HEADING = {
  en: 'If the work is not what was promised',
  pt: 'Se o trabalho não for o que foi prometido',
} as const;

/**
 * The footer: the dado.
 *
 * In a tiled interior the dado is the band of azulejo that runs along the
 * bottom of the wall, and this is the site's. It opens on the lattice, inverts
 * to ink, and lays its four link columns out on the same grout grid the rest
 * of the site uses, so the densest block of text on any page still reads as
 * part of the wall rather than as a sitemap bolted underneath one.
 */
export default async function Footer() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('nav');

  const tagline = {
    en: 'The easiest way to book a professional local photographer in Portugal. Clear prices, confirmed before you book.',
    pt: 'A forma mais simples de reservar um fotógrafo profissional local em Portugal. Preços claros, confirmados antes de reservar.',
  }[locale];

  const labels = {
    sessions: { en: 'Sessions', pt: 'Sessões' }[locale],
    destinations: { en: 'Destinations', pt: 'Destinos' }[locale],
    company: { en: 'Company', pt: 'Empresa' }[locale],
    support: { en: 'Support', pt: 'Apoio' }[locale],
    reviews: { en: 'Reviews', pt: 'Avaliações' }[locale],
    faq: { en: 'FAQ', pt: 'Perguntas frequentes' }[locale],
    refund: { en: 'Refund policy', pt: 'Política de reembolso' }[locale],
    legalNotice: { en: 'Legal notice', pt: 'Informação legal' }[locale],
    privacy: { en: 'Privacy', pt: 'Privacidade' }[locale],
    terms: { en: 'Terms of sale', pt: 'Termos e condições' }[locale],
    imageRights: { en: 'Image rights', pt: 'Direito à imagem' }[locale],
    photoCredits: { en: 'Photo credits', pt: 'Créditos fotográficos' }[locale],
    complaints: { en: 'Complaints book', pt: 'Livro de reclamações' }[locale],
    whatsapp: tx(CTA.chatWhatsapp, locale),
    rights: { en: 'All rights reserved.', pt: 'Todos os direitos reservados.' }[locale],
    madeIn: { en: 'Made in Portugal', pt: 'Feito em Portugal' }[locale],
  };

  // Footer links appear site-wide, so only surface published pages, and only
  // the sessions this language offers.
  const services = publishedServices(locale);
  const footerServices = FOOTER_SESSIONS.map((id) => services.find((s) => s.slug === id)).filter(
    (s): s is NonNullable<typeof s> => Boolean(s),
  );
  const cities = publishedCities();
  const footerCities = FOOTER_PLACES.map((slug) => cities.find((c) => c.slug === slug)).filter(
    (c): c is NonNullable<typeof c> => Boolean(c),
  );
  const year = new Date().getFullYear();
  const whatsappHref = whatsappBookingLink({}, locale);

  /*
    One link column. Four of them share a grout grid, so they share markup.

    The href type is taken from <Link> rather than written as `string`: the
    route table is typed, and a service or city link is an object with params,
    not a path. Widening it here would have put the only untyped hrefs on the
    site in the one component that links to every section of it.
  */
  type NavItem =
    | { href: ComponentProps<typeof Link>['href']; label: string }
    | { external: string; label: string };

  const column = (heading: string, items: NavItem[]) => (
    <div className="px-6 py-8 sm:px-7">
      <h2 className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-white">
        {heading}
      </h2>
      <ul className="mt-5 space-y-3 text-sm">
        {items.map((item) => (
          <li key={item.label}>
            {'external' in item ? (
              <a
                href={item.external}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-muted transition-colors hover:text-brand-orange-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep"
              >
                {item.label}
              </a>
            ) : (
              <Link
                href={item.href}
                className="text-brand-muted transition-colors hover:text-brand-orange-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer data-surface="dark" className="mt-[var(--space-section)] bg-brand-dark text-brand-muted">
      {/* The frieze that opens the dado. Cobalt on ink, fading downward so the
          pattern hands off to the content rather than stopping at a line. */}
      <div className="azulejo azulejo-fade-b h-20 border-b border-white/10" aria-hidden="true" />

      <div className="mx-auto max-w-[92rem] px-6 py-[var(--space-band)]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* The identity block sits outside the grout grid: it is the one part
              of the footer that is a statement rather than a list. */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange-deep"
            >
              <TileMark className="h-7 w-7 text-brand-orange-deep transition-colors group-hover:text-white" />
              <span className="font-display text-[1.375rem] font-bold leading-none tracking-[-0.045em] text-white">
                {SITE_NAME}
              </span>
            </Link>
            <p className="measure-tight mt-6 text-sm leading-relaxed text-brand-muted">{tagline}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/book"
                data-track="cta_check_availability"
                data-track-context="footer"
                className="btn btn-primary btn-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {tx(CTA.checkAvailability, locale)}
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp_clicked"
                data-track-context="footer"
                className="btn btn-outline btn-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {labels.whatsapp}
              </a>
            </div>
          </div>

          {/* Columns on a grout grid: the wall, in miniature. The legal links
              join Support once the legal pages are published. */}
          <nav aria-label="Footer" className="grout grid-cols-2 md:grid-cols-4 lg:col-span-8">
            {column(
              labels.sessions,
              footerServices.map((s) => ({ href: serviceHref(s, locale), label: tx(s.name, locale) })),
            )}
            {column(
              labels.destinations,
              footerCities.map((c) => ({ href: cityHref(c), label: localizedCityName(c, locale) })),
            )}
            {column(labels.company, [
              { href: '/about', label: t('about') },
              ...(hasPhotographers() ? [{ href: '/photographers' as const, label: t('photographers') }] : []),
              { href: '/portfolio', label: t('portfolio') },
              { href: '/pricing', label: t('pricing') },
              { href: '/reviews', label: labels.reviews },
              { href: '/blog', label: t('blog') },
              { href: '/contact', label: t('contact') },
            ])}
            {column(labels.support, [
              { external: whatsappHref, label: 'WhatsApp' },
              { href: { pathname: '/', hash: 'faq' }, label: labels.faq },
              { href: '/book', label: tx(CTA.checkAvailability, locale) },
              /*
                The legal pages are hidden until the company details in
                `src/lib/legal.ts` are real. When they are published, the
                complaints book is not optional: a provider of services to
                consumers in Portugal must link the electronic complaints book
                from every page, and an e2e test asserts it is here, because this
                is exactly the kind of thing a footer refactor drops silently.
              */
              ...(LEGAL_PAGES_VISIBLE
                ? [
                    { href: '/legal/terms' as const, label: labels.terms },
                    {
                      href: { pathname: '/legal/terms' as const, hash: slugifyHeading(REFUND_HEADING[locale]) },
                      label: labels.refund,
                    },
                    { href: '/legal/privacy' as const, label: labels.privacy },
                    { href: '/legal/notice' as const, label: labels.legalNotice },
                    { href: '/legal/image-rights' as const, label: labels.imageRights },
                    { href: '/legal/photo-credits' as const, label: labels.photoCredits },
                    { href: '/legal/complaints' as const, label: labels.complaints },
                  ]
                : []),
            ])}
          </nav>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-5 border-t border-white/10 pt-7 sm:flex-row sm:items-center">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-brand-muted">
            © {year} {SITE_NAME} · {labels.rights}
          </p>
          <div className="flex items-center gap-6">
            <span className="hidden font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-brand-muted sm:inline">
              {labels.madeIn}
            </span>
            <nav aria-label="Social media" className="flex items-center gap-2">
              {SOCIAL_LINKS.map((url) => {
                const isInstagram = url.includes('instagram');
                return (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={isInstagram ? 'Instagram' : 'Facebook'}
                    className="flex h-9 w-9 items-center justify-center border border-white/20 text-brand-muted transition-colors hover:border-brand-orange-deep hover:bg-brand-orange-deep hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep"
                  >
                    {isInstagram ? (
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.62c-3.15 0-3.52.01-4.76.07-1.15.05-1.77.24-2.19.41-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.42-.36 1.04-.41 2.19-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.05 1.15.24 1.77.41 2.19.21.55.47.94.88 1.35.41.41.8.67 1.35.88.42.16 1.04.36 2.19.41 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c1.15-.05 1.77-.24 2.19-.41.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.42.36-1.04.41-2.19.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.05-1.15-.24-1.77-.41-2.19a3.65 3.65 0 00-.88-1.35 3.65 3.65 0 00-1.35-.88c-.42-.16-1.04-.36-2.19-.41-1.24-.06-1.61-.07-4.76-.07zm0 2.76a5.3 5.3 0 110 10.6 5.3 5.3 0 010-10.6zm0 1.62a3.68 3.68 0 100 7.36 3.68 3.68 0 000-7.36zm6.4-1.8a1.24 1.24 0 11-2.48 0 1.24 1.24 0 012.48 0z" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99C18.34 21.13 22 16.99 22 12z" />
                      </svg>
                    )}
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
