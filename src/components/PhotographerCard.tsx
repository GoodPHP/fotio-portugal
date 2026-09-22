import { Link } from '@/i18n/navigation';
import type { Photographer } from '@/lib/types';
import { tx, type Locale } from '@/lib/locales';
import { getCity, getServiceById, localizedCityName } from '@/lib/catalog';
import { trackAttrs } from '@/lib/analytics';
import Picture from './Picture';
import { ArrowIcon } from './Icons';

const LABELS = {
  view: { en: 'View profile', pt: 'Ver perfil' },
  sessions: { en: 'sessions', pt: 'sessões' },
  reviews: { en: 'reviews', pt: 'avaliações' },
} as const;

/** ISO 639-1 codes, shown as the badge a traveller scans for: EN · PT · ES. */
export function languageBadges(codes: string[]): string {
  return codes.map((c) => c.toUpperCase()).join(' · ');
}

/**
 * One photographer, as a marketplace card.
 *
 * Everything shown comes from their profile. The rating and the session
 * count are rendered only when the profile carries them, and the type says
 * where each must come from — so a card with no reviews shows no stars rather
 * than a placeholder five.
 */
export default function PhotographerCard({ photographer, locale }: { photographer: Photographer; locale: Locale }) {
  const href = { pathname: '/photographers/[slug]', params: { slug: photographer.slug } } as const;
  const base = getCity(photographer.cities[0]);
  const specialties = photographer.services
    .slice(0, 2)
    .map((id) => getServiceById(id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .map((s) => tx(s.name, locale));
  const shots = photographer.portfolio.slice(0, 3);

  return (
    <article className="tile group flex h-full flex-col">
      <div className="grid grid-cols-3 gap-px border-b border-brand-rule bg-brand-rule">
        <div className="relative col-span-2 row-span-2 aspect-[4/5] overflow-hidden bg-brand-tile">
          <Picture slot={photographer.portrait} alt={photographer.name} sizes="(max-width: 768px) 66vw, 22vw" className="object-cover" fill />
        </div>
        {shots.slice(0, 2).map((slot) => (
          <div key={slot} className="relative overflow-hidden bg-brand-tile">
            <Picture slot={slot} alt="" sizes="(max-width: 768px) 33vw, 11vw" className="object-cover" fill />
          </div>
        ))}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-xl font-semibold text-brand-dark">
          <Link href={href} className="hover:text-brand-orange-deep" {...trackAttrs('photographer_viewed', { photographer: photographer.slug, context: 'card' })}>
            {photographer.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-brand-dark">
          {[base ? localizedCityName(base, locale) : null, specialties.join(' & ')].filter(Boolean).join(' · ')}
        </p>
        <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-muted">
          {languageBadges(photographer.languages)}
        </p>
        {(photographer.rating || photographer.sessionCount) && (
          <p className="mt-3 text-sm text-brand-muted">
            {photographer.rating && (
              <span>
                <span className="text-brand-orange-deep">★</span> {photographer.rating.value.toFixed(1)} ({photographer.rating.count}{' '}
                {LABELS.reviews[locale]})
              </span>
            )}
            {photographer.rating && photographer.sessionCount ? ' · ' : null}
            {photographer.sessionCount ? `${photographer.sessionCount} ${LABELS.sessions[locale]}` : null}
          </p>
        )}
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-brand-muted">{tx(photographer.bio, locale)}</p>
        <Link href={href} className="link-ruled mt-auto self-start pt-5 text-sm" aria-label={`${LABELS.view[locale]}: ${photographer.name}`}>
          {LABELS.view[locale]}
          <ArrowIcon />
        </Link>
      </div>
    </article>
  );
}
