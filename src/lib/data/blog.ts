import type { BlogPost } from '../types';
import { BLOG_GUIDES } from './blog-guides';

/**
 * Every article, newest first.
 *
 * The pillar posts are the internal-link hubs: each one is what the city and
 * service pages link *to*, which is the structural job they do beyond their
 * own traffic. Three are planned for Portugal — marrying here as a foreigner,
 * the photography calendar, and where permission is needed to photograph.
 *
 * Emptied in the conversion. The two France pillars it used to compose were
 * deleted with it.
 */
export const BLOG_POSTS: BlogPost[] = [...BLOG_GUIDES];
