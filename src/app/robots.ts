import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

// AI answer-engine crawlers we explicitly welcome (GEO/AEO).
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'ClaudeBot',
  'Claude-SearchBot',
  'Google-Extended',
];

/** Endpoints that answer to forms, not to readers. */
const DISALLOW = ['/api/'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW },
      // A crawler that matches a group of its own ignores the `*` group
      // entirely, so each of these has to repeat the exclusion rather than
      // inherit it.
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/', disallow: DISALLOW })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
