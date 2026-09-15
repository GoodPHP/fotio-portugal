import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { tx, type Locale } from '@/lib/locales';
import { buildMetadata } from '@/lib/seo';
import { LEGAL_DOCS, LEGAL_PAGES_VISIBLE } from '@/lib/legal';
import LegalDocument from '@/components/LegalDocument';

const DOC = LEGAL_DOCS['terms'];
const ROUTE = '/legal/terms' as const;

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!LEGAL_PAGES_VISIBLE) return {};
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
  if (!LEGAL_PAGES_VISIBLE) notFound();
  setRequestLocale(locale);
  return <LegalDocument doc={DOC} locale={locale} />;
}
