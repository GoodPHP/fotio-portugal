import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Inter, JetBrains_Mono, Fraunces } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { routing } from '@/i18n/routing';
import { DEFAULT_LOCALE, type Locale } from '@/lib/locales';
import { GA_MEASUREMENT_ID, HTML_LANG, SITE_NAME, SITE_TAGLINE, SITE_URL } from '@/lib/site';
import { graph, organizationNode, websiteNode } from '@/lib/jsonld';
import JsonLd from '@/components/JsonLd';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import '../globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' });
/* The display face for the whole site. */
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['SOFT', 'WONK', 'opsz'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE[DEFAULT_LOCALE]}`,
    template: `%s | ${SITE_NAME}`,
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const fontVars = `${inter.variable} ${jetbrains.variable} ${fraunces.variable}`;

  return (
    <html lang={HTML_LANG[locale as Locale]} className={fontVars}>
      <body
        className="flex min-h-screen flex-col bg-brand-sand text-brand-dark antialiased"
        suppressHydrationWarning
      >
        {/* Site-wide Organization + WebSite graph: every page's JSON-LD references
            these by @id (provider/parentOrganization/publisher), so emitting them
            once globally keeps those references resolvable across the site. */}
        <JsonLd data={graph([organizationNode(), websiteNode(locale as Locale)])} />
        {/*
          The provider stays, but without `messages`.

          Its two jobs are separable: it supplies the locale to client
          components — next-intl's own <Link> calls useLocale(), so every
          internal link on the site depends on it — and it serializes the
          message catalogue for client components that translate. After the
          masthead became a server component nothing does the second thing, so
          the catalogue was being written into the RSC payload of every page
          for no reader. Dropping the prop keeps the links working and stops
          shipping the dictionary.
        */}
        <NextIntlClientProvider locale={locale as Locale}>
          <NavBar locale={locale as Locale} />
          <div className="flex-1">{children}</div>
          <Footer />
        </NextIntlClientProvider>
        {GA_MEASUREMENT_ID ? <GoogleAnalytics gaId={GA_MEASUREMENT_ID} /> : null}
      </body>
    </html>
  );
}
