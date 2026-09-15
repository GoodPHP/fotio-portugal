import type { BlogPost } from '../types';
import { BEST_TIME_PHOTOSHOOT_PORTUGAL } from '../blog/best-time-photoshoot-portugal';
import { WHAT_TO_WEAR_PHOTOSHOOT_PORTUGAL } from '../blog/what-to-wear-photoshoot-portugal';
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
  BEST_TIME_PHOTOSHOOT_PORTUGAL,
  WHAT_TO_WEAR_PHOTOSHOOT_PORTUGAL,
  ...BLOG_GUIDES,
];
