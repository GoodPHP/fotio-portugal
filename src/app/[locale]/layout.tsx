import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { setRequestLocale, getMessages } from 'next-intl/server';
import { Inter, JetBrains_Mono, Fraunces } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { routing } from '@/i18n/routing';
import type { Locale } from '@/lib/locales';
import { SITE_URL, GA_MEASUREMENT_ID } from '@/lib/site';
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
    default: 'Ylala — Professional photographers across France',
    template: '%s | Ylala',
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

  const messages = await getMessages();
  const fontVars = `${inter.variable} ${jetbrains.variable} ${fraunces.variable}`;

  return (
    <html lang={locale} className={fontVars}>
      <body
        className="flex min-h-screen flex-col bg-brand-sand text-brand-dark antialiased"
        suppressHydrationWarning
      >
        {/* Site-wide Organization + WebSite graph: every page's JSON-LD references
            these by @id (provider/parentOrganization/publisher), so emitting them
            once globally keeps those references resolvable across the site. */}
        <JsonLd data={graph([organizationNode(), websiteNode(locale as Locale)])} />
        <NextIntlClientProvider messages={messages}>
          <NavBar />
          <div className="flex-1">{children}</div>
          <Footer />
        </NextIntlClientProvider>
        {GA_MEASUREMENT_ID ? <GoogleAnalytics gaId={GA_MEASUREMENT_ID} /> : null}
      </body>
    </html>
  );
}
