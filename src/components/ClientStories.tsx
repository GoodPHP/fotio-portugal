import { Link } from '@/i18n/navigation';
import type { Review } from '@/lib/types';
import { tx, type Locale } from '@/lib/locales';
import { REVIEWS, getPhotographer, getServiceById, localizedCityName, getCity } from '@/lib/catalog';
import { formatDate, formatDuration } from '@/lib/site';
import { serviceHref } from '@/lib/routes';
import Picture from './Picture';
import SectionHeading from './SectionHeading';

const COPY = {
  eyebrow: { en: 'Client stories', pt: 'Histórias de clientes' },
  title: { en: 'Real sessions. Real Portugal. Real memories.', pt: 'Sessões reais. Portugal real. Memórias reais.' },
  all: { en: 'All reviews', pt: 'Todas as avaliações' },
  by: { en: 'Photographed by', pt: 'Fotografado por' },
  session: { en: 'View the session', pt: 'Ver a sessão' },
} as const;

interface ClientStoriesProps {
  locale: Locale;
  /** Narrow to one place or one session, for city and service pages. */
  citySlug?: string;
  serviceSlug?: string;
  photographerSlug?: string;
  limit?: number;
}

/**
 * Client stories, from real reviews only.
 *
 * Renders nothing when there is nothing real to show — not an empty state,
 * not a placeholder quote. `REVIEWS` is empty today, so today this section is
 * absent from every page; it appears by itself the day the first review with
 * the client's consent is added to `src/lib/data/reviews.ts`.
 */
export default function ClientStories({ locale, citySlug, serviceSlug, photographerSlug, limit = 3 }: ClientStoriesProps) {
  const reviews = REVIEWS.filter(
    (r) =>
      (!citySlug || r.citySlug === citySlug) &&
      (!serviceSlug || r.serviceSlug === serviceSlug) &&
      (!photographerSlug || r.photographerSlug === photographerSlug),
  ).slice(0, limit);
  if (reviews.length === 0) return null;

  return (
    <section aria-labelledby="stories-heading" className="mx-auto max-w-[92rem] px-6 py-[var(--space-section)]">
      <SectionHeading
        id="stories-heading"
        eyebrow={COPY.eyebrow[locale]}
        title={COPY.title[locale]}
        action={{ href: '/reviews', label: COPY.all[locale] }}
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <ClientStoryCard key={review.id} review={review} locale={locale} />
        ))}
      </div>
    </section>
  );
}

export function ClientStoryCard({ review, locale }: { review: Review; locale: Locale }) {
  const service = review.serviceSlug ? getServiceById(review.serviceSlug) : undefined;
  const city = getCity(review.citySlug);
  const photographer = review.photographerSlug ? getPhotographer(review.photographerSlug) : undefined;
  const cover = review.gallery?.[0];
  const meta = [
    review.durationMinutes ? formatDuration(review.durationMinutes, locale) : null,
    city ? localizedCityName(city, locale) : review.cityName,
    formatDate(review.date, locale),
  ].filter(Boolean);

  return (
    <figure className="tile flex h-full flex-col">
      {cover && (
        <div className="relative aspect-[4/3] overflow-hidden border-b border-brand-rule">
          <Picture slot={cover} alt="" sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" fill />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <figcaption>
          <p className="font-display text-xl font-semibold text-brand-dark">{review.name}</p>
          <p className="mt-1 text-sm text-brand-dark">{tx(review.serviceName, locale)}</p>
          <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-brand-muted">{meta.join(' · ')}</p>
        </figcaption>
        <p role="img" aria-label={`${review.stars} / 5`} className="mt-4 text-brand-orange-deep">
          {'★'.repeat(review.stars)}
        </p>
        <blockquote className="mt-3 flex-1 leading-relaxed text-brand-dark">“{tx(review.text, locale)}”</blockquote>
        {photographer && (
          <p className="mt-4 text-sm text-brand-muted">
            {COPY.by[locale]}{' '}
            <Link
              href={{ pathname: '/photographers/[slug]', params: { slug: photographer.slug } }}
              className="font-medium text-brand-dark underline-offset-4 hover:underline"
            >
              {photographer.name}
            </Link>
          </p>
        )}
        {service && (
          <Link href={serviceHref(service, locale)} className="link-ruled mt-5 self-start text-sm">
            {COPY.session[locale]}
          </Link>
        )}
      </div>
    </figure>
  );
}
