import type { BlogClusterId, BlogPost } from '../types';
import type { Localized } from '../locales';
import { BEST_TIME_PHOTOSHOOT_PORTUGAL } from '../blog/best-time-photoshoot-portugal';
import { WHAT_TO_WEAR_PHOTOSHOOT_PORTUGAL } from '../blog/what-to-wear-photoshoot-portugal';
import { LISBON_PHOTOSHOOT_LOCATIONS } from '../blog/lisbon-photoshoot-locations';
import { BLOG_GUIDES } from './blog-guides';

/**
 * Every article, newest first.
 *
 * The pillar posts are the internal-link hubs: each one is what the city and
 * service pages link *to*, which is the structural job they do beyond their
 * own traffic. The first two answer the questions that arrive most often in
 * enquiries — when to come, and what to wear — and each links into the
 * services and places that sell the answer.
 *
 * Still planned: marrying here as a foreigner, and where permission is needed
 * to photograph.
 */
export const BLOG_POSTS: BlogPost[] = [
  LISBON_PHOTOSHOOT_LOCATIONS,
  BEST_TIME_PHOTOSHOOT_PORTUGAL,
  WHAT_TO_WEAR_PHOTOSHOOT_PORTUGAL,
  ...BLOG_GUIDES,
];

/**
 * The topic clusters. Each is a hub of articles around one commercial page —
 * the place, and the sessions booked there — so every article has somewhere
 * to send a reader who has finished it, and every place page has articles
 * pointing at it.
 *
 * Planned articles, by cluster (content backlog, not yet written):
 * - lisbon: Lisbon couple, proposal, honeymoon and family photography; best
 *   time and what to wear for Lisbon photos.
 * - algarve: Algarve couple, proposal, family and honeymoon photography.
 * - portugal: best places for photos in Portugal; honeymoon and proposal
 *   photography in Portugal; photography prices in Portugal.
 */
export const BLOG_CLUSTERS: Array<{
  id: BlogClusterId;
  label: Localized;
  /** The place the cluster is about, if it is about one. */
  city?: string;
  /** The sessions its articles sell. */
  services: string[];
}> = [
  { id: 'lisbon', label: { en: 'Lisbon photography', pt: 'Fotografia em Lisboa' }, city: 'lisboa', services: ['couple', 'proposal', 'honeymoon', 'family'] },
  { id: 'algarve', label: { en: 'Algarve photography', pt: 'Fotografia no Algarve' }, city: 'algarve', services: ['couple', 'proposal', 'family', 'honeymoon'] },
  { id: 'portugal', label: { en: 'Portugal travel photography', pt: 'Fotografia de viagem em Portugal' }, services: ['vacation', 'honeymoon', 'proposal', 'wedding'] },
];
