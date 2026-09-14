import { getTranslations, getLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { publishedCities, publishedServices } from '@/lib/catalog';
import { type Locale, tx } from '@/lib/locales';
import { SITE_NAME, SOCIAL_LINKS, whatsappLink } from '@/lib/site';
import { cityHref, serviceHref } from '@/lib/routes';

export default async function Footer() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('nav');

  const tagline = {
    en: 'Vetted professional photographers across France. Fixed pricing, private gallery in 48–72h.',
    fr: 'Photographes professionnels vérifiés partout en France. Prix fixe, galerie privée sous 48 à 72 h.',
  }[locale];

  const labels = {
    services: { en: 'Services', fr: 'Services' }[locale],
    cities: { en: 'Cities', fr: 'Villes' }[locale],
    company: { en: 'Company', fr: 'Entreprise' }[locale],
    reviews: { en: 'Reviews', fr: 'Avis' }[locale],
    legal: { en: 'Legal', fr: 'Informations légales' }[locale],
    legalNotice: { en: 'Legal notice', fr: 'Mentions légales' }[locale],
    privacy: { en: 'Privacy', fr: 'Confidentialité' }[locale],
    terms: { en: 'Terms of sale', fr: 'CGV' }[locale],
    imageRights: { en: 'Image rights', fr: 'Droit à l’image' }[locale],
    photoCredits: { en: 'Photo credits', fr: 'Crédits photos' }[locale],
    whatsapp: { en: 'Message us on WhatsApp', fr: 'WhatsApp' }[locale],
    rights: { en: 'All rights reserved.', fr: 'Tous droits réservés.' }[locale],
  };

  // Footer links appear site-wide, so only surface published pages.
  const featuredServices = publishedServices().slice(0, 6);
  const featuredCities = publishedCities().slice(0, 6);
  const year = new Date().getFullYear();

  const waMessage = {
    en: `Hi ${SITE_NAME}! I would like information about a photoshoot.`,
    fr: `Bonjour ${SITE_NAME} ! Je voudrais des informations sur une séance photo.`,
  }[locale];

  return (
    <footer data-surface="dark" className="mt-[var(--space-section)] bg-brand-dark text-brand-muted">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12">
          <div className="col-span-2 md:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 font-display text-xl font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange-deep"
            >
              {SITE_NAME}
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-brand-muted">{tagline}</p>
            <a
              href={whatsappLink(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-chip bg-white/5 px-4 py-2.5 text-sm font-medium text-white ring-1 ring-white/10 transition-colors hover:bg-brand-orange-deep hover:ring-brand-orange-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm5.8 14.16c-.24.68-1.42 1.32-1.96 1.36-.5.05-.5.42-3.15-.66-2.66-1.08-4.31-3.83-4.44-4.01-.13-.18-1.06-1.41-1.06-2.69 0-1.27.67-1.9.91-2.16.24-.26.52-.32.7-.32.17 0 .35 0 .5.01.16.01.38-.06.59.45.24.59.81 2.04.88 2.19.07.15.12.32.02.51-.09.18-.14.3-.28.46-.14.16-.29.36-.42.48-.14.13-.28.28-.12.55.16.27.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.27.13.43.11.59-.07.16-.18.68-.79.86-1.07.18-.27.36-.22.61-.13.24.09 1.55.73 1.81.86.27.13.45.2.51.31.06.11.06.64-.18 1.32z" />
              </svg>
              {labels.whatsapp}
            </a>
          </div>

          <div className="md:col-span-2">
            <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-white">{labels.services}</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {featuredServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={serviceHref(service, locale)}
                    className="text-brand-muted transition-colors hover:text-brand-orange-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep"
                  >
                    {tx(service.name, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-white">{labels.cities}</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {featuredCities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={cityHref(city)}
                    className="text-brand-muted transition-colors hover:text-brand-orange-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-white">{labels.company}</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="text-brand-muted transition-colors hover:text-brand-orange-deep">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-brand-muted transition-colors hover:text-brand-orange-deep">
                  {t('blog')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-brand-muted transition-colors hover:text-brand-orange-deep">
                  {t('contact')}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-brand-muted transition-colors hover:text-brand-orange-deep">
                  {t('pricing')}
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-brand-muted transition-colors hover:text-brand-orange-deep">
                  {labels.reviews}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-white">{labels.legal}</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/legal/notice" className="text-brand-muted transition-colors hover:text-brand-orange-deep">
                  {labels.legalNotice}
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="text-brand-muted transition-colors hover:text-brand-orange-deep">
                  {labels.privacy}
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="text-brand-muted transition-colors hover:text-brand-orange-deep">
                  {labels.terms}
                </Link>
              </li>
              <li>
                <Link href="/legal/image-rights" className="text-brand-muted transition-colors hover:text-brand-orange-deep">
                  {labels.imageRights}
                </Link>
              </li>
              <li>
                <Link href="/legal/photo-credits" className="text-brand-muted transition-colors hover:text-brand-orange-deep">
                  {labels.photoCredits}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-brand-muted">
            © {year} {SITE_NAME}. {labels.rights}
          </p>
          <nav aria-label="Social media" className="flex items-center gap-3">
            {SOCIAL_LINKS.map((url) => {
              const isInstagram = url.includes('instagram');
              return (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={isInstagram ? 'Instagram' : 'Facebook'}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-brand-muted ring-1 ring-white/10 transition-colors hover:bg-brand-orange-deep hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep"
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
    </footer>
  );
}
