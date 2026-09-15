import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { isLocale, type Locale } from '@/lib/locales';

const COPY = {
  en: {
    heading: 'Page not found',
    body: 'This page does not exist, or it has moved. The links below go somewhere real.',
    home: 'Back to the home page',
    cities: 'Browse cities',
    services: 'Browse services',
  },
  pt: {
    heading: 'Página não encontrada',
    body: 'Esta página não existe, ou mudou de endereço. As ligações abaixo levam a algum lado.',
    home: 'Voltar à página inicial',
    cities: 'Ver as cidades',
    services: 'Ver os serviços',
  },
} as const satisfies Record<Locale, Record<string, string>>;

/**
 * A 404 must never be indexed. Next serves this with a 404 status, but the
 * status alone does not stop the page being kept once it has been crawled from
 * a stale link, so the directive is explicit.
 */
export async function generateMetadata(): Promise<Metadata> {
  const requested = await getLocale();
  const locale = isLocale(requested) ? requested : 'en';
  return {
    title: COPY[locale].heading,
    robots: { index: false, follow: false },
  };
}

export default async function NotFound() {
  // `notFound()` can be reached from any route, so the locale comes from the
  // request rather than from params, which this component does not receive.
  const requested = await getLocale();
  const c = COPY[isLocale(requested) ? requested : 'en'];

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-display text-4xl font-bold">{c.heading}</h1>
      <p className="mt-3 text-brand-muted">{c.body}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="btn btn-ink btn-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep"
        >
          {c.home}
        </Link>
        <Link
          href="/cities"
          className="btn btn-outline btn-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep"
        >
          {c.cities}
        </Link>
        <Link
          href="/services"
          className="btn btn-outline btn-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep"
        >
          {c.services}
        </Link>
      </div>
    </main>
  );
}
