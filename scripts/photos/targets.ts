/**
 * Every image slot the site has, derived from the catalogue.
 *
 * Derived, not typed out. The previous fetcher kept its own copy of the city
 * and service lists in Python, which drifted from `src/lib/data/**` the first
 * time a slug changed and then silently fetched photographs for places that no
 * longer existed.
 */
import { CITIES } from '../../src/lib/data/cities';
import { SERVICES } from '../../src/lib/data/services';

/** What the slot is for, which decides the crop and the query shape. */
export type SlotKind = 'city-hero' | 'city-gallery' | 'service-card' | 'portfolio';

export interface Slot {
  /** Stable key: also the path under `public/images/`, without the extension. */
  key: string;
  kind: SlotKind;
  /** Minimum source aspect ratio; a portrait slot asks for less than 1. */
  minAspect: number;
  /** Aspect the slot is cropped to. */
  crop: number;
  /** Rendered widths, in CSS pixels. */
  widths: number[];
  /** Search queries, most specific first. */
  queries: string[];
  /** Group within which one photographer may appear at most twice. */
  group: string;
}

const LANDSCAPE = 16 / 9;
const GALLERY = 4 / 3;
const CARD = 3 / 2;
const PORTRAIT = 2 / 3;

/**
 * Queries name the *spot*, not the place.
 *
 * "Lisbon" returns the hundred most-downloaded photographs of Lisbon, which is
 * precisely the set every other site already has. "Miradouro da Senhora do
 * Monte" returns photographs of somewhere specific, taken by people who went
 * there.
 */
function cityQueries(citySlug: string, cityName: string, spots: string[]): string[] {
  const [first, second, third] = spots;
  return [
    first ? `${first} ${cityName} Portugal` : `${cityName} Portugal`,
    second ? `${second} Portugal` : `${cityName} Portugal architecture`,
    third ? `${third} Portugal` : `${cityName} Portugal street`,
    `${cityName} Portugal`,
  ].filter(Boolean);
}

/** What a service portfolio should show: people, in the register it sells. */
const SERVICE_QUERIES: Record<string, string[]> = {
  portrait: ['studio portrait professional headshot neutral background'],
  'lifestyle-portrait': ['lifestyle portrait outdoors natural light candid'],
  couple: ['couple photoshoot walking old town street candid'],
  proposal: ['marriage proposal engagement ring moment surprise'],
  family: ['family portrait outdoors children parents natural light'],
  maternity: ['maternity pregnancy portrait outdoors golden hour'],
  newborn: ['newborn baby at home natural light photography'],
  batizado: ['christening baptism church ceremony family portugal'],
  wedding: ['wedding portugal bride groom quinta'],
  elopement: ['elopement intimate wedding couple cliff coast'],
  'destination-wedding': ['destination wedding portugal couple ceremony outdoors'],
  vacation: ['travel couple holiday photoshoot portugal'],
  honeymoon: ['honeymoon couple coast portugal sunset'],
  'lisbon-photoshoot': ['couple photoshoot lisbon miradouro morning'],
  headshots: ['corporate headshot business portrait office'],
  'personal-brand': ['personal branding photoshoot entrepreneur working'],
  'digital-nomad-headshots': ['remote worker portrait coworking lisbon'],
  'eventos-de-empresa': ['corporate event conference photography audience'],
  'real-estate': ['real estate interior photography bright living room'],
  food: ['restaurant food photography plated dish portugal'],
  'book-de-modelo': ['model portfolio test shoot studio fashion'],
  finalistas: ['university graduation students black cape coimbra'],
};

export function allSlots(): Slot[] {
  const slots: Slot[] = [];

  for (const city of CITIES) {
    const spots = city.spots.map((s) => s.name);
    const queries = cityQueries(city.slug, city.name, spots);

    slots.push({
      key: `cities/${city.slug}`,
      kind: 'city-hero',
      minAspect: 1.5,
      crop: LANDSCAPE,
      widths: [480, 960, 1600],
      queries,
      group: `city:${city.slug}`,
    });

    for (let i = 1; i <= 4; i += 1) {
      slots.push({
        key: `gallery/${city.slug}/${i}`,
        kind: 'city-gallery',
        minAspect: 1.1,
        crop: GALLERY,
        widths: [480, 960],
        queries,
        group: `city:${city.slug}`,
      });
    }
  }

  for (const service of SERVICES) {
    const queries = SERVICE_QUERIES[service.slug] ?? [service.slug.replace(/-/g, ' ')];

    slots.push({
      key: `services/${service.slug}`,
      kind: 'service-card',
      minAspect: 1.3,
      crop: CARD,
      widths: [480, 960],
      queries,
      group: `service:${service.slug}`,
    });

    for (let i = 1; i <= 5; i += 1) {
      // Two of the five are vertical: a portfolio of five landscapes reads as
      // a stock gallery, which is the thing this whole pipeline exists to
      // avoid looking like.
      const vertical = i > 3;
      slots.push({
        key: `portfolio/${service.slug}/${i}`,
        kind: 'portfolio',
        minAspect: vertical ? 0.5 : 1.2,
        crop: vertical ? PORTRAIT : CARD,
        widths: [480, 960],
        queries,
        group: `service:${service.slug}`,
      });
    }
  }

  return slots;
}

/** Distinct search requests, so quota is spent once per query and not per slot. */
export function distinctQueries(): { query: string; orientation: 'landscape' | 'portrait' }[] {
  const seen = new Map<string, 'landscape' | 'portrait'>();
  for (const slot of allSlots()) {
    for (const query of slot.queries) {
      const orientation = slot.crop < 1 ? 'portrait' : 'landscape';
      const key = `${query}::${orientation}`;
      if (!seen.has(key)) seen.set(key, orientation);
    }
  }
  return [...seen].map(([key, orientation]) => ({ query: key.split('::')[0], orientation }));
}
