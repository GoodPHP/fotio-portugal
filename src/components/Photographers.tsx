import type { Locale } from '@/lib/locales';
import { PHOTOGRAPHERS, photographersFor, photographersIn } from '@/lib/catalog';
import SectionHeading from './SectionHeading';
import PhotographerCard from './PhotographerCard';

const COPY = {
  eyebrow: { en: 'Photographers', pt: 'Fotógrafos' },
  title: { en: 'Meet your local photographers', pt: 'Conheça os fotógrafos locais' },
  all: { en: 'All photographers', pt: 'Todos os fotógrafos' },
} as const;

interface PhotographersProps {
  locale: Locale;
  /** Only those who work in this place. */
  citySlug?: string;
  /** Only those who offer this session. */
  serviceId?: string;
  title?: string;
  limit?: number;
}

/**
 * The photographers block for the home, city and service pages.
 *
 * Renders nothing until there are real profiles in
 * `src/lib/data/photographers.ts` — no placeholder people, no "coming soon".
 */
export default function Photographers({ locale, citySlug, serviceId, title, limit = 3 }: PhotographersProps) {
  let list = citySlug ? photographersIn(citySlug) : PHOTOGRAPHERS;
  if (serviceId) list = list.filter((p) => photographersFor(serviceId).includes(p));
  list = list.slice(0, limit);
  if (list.length === 0) return null;

  return (
    <section aria-labelledby="photographers-heading" className="mx-auto max-w-[92rem] px-6 py-[var(--space-section)]">
      <SectionHeading
        id="photographers-heading"
        eyebrow={COPY.eyebrow[locale]}
        title={title ?? COPY.title[locale]}
        action={{ href: '/photographers', label: COPY.all[locale] }}
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <PhotographerCard key={p.slug} photographer={p} locale={locale} />
        ))}
      </div>
    </section>
  );
}
