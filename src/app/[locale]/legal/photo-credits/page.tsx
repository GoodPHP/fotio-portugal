import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { tx, type Locale } from '@/lib/locales';
import { buildMetadata } from '@/lib/seo';
import { LEGAL_DOCS } from '@/lib/legal';
import LegalDocument from '@/components/LegalDocument';

const DOC = LEGAL_DOCS['photo-credits'];
const ROUTE = '/legal/photo-credits' as const;

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    route: ROUTE,
    title: tx(DOC.title, locale),
    description: tx(DOC.description, locale),
    noindex: DOC.noindex,
  });
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalDocument doc={DOC} locale={locale} />;
}
