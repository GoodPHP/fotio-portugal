import { test } from 'node:test';
import assert from 'node:assert/strict';
import { BLOG_POSTS } from './data/blog';
import { LOCALES, tx } from './locales';
import { contentHref } from './routes';

test('every internal link in every article resolves in the article’s own language', () => {
  for (const post of BLOG_POSTS) {
    for (const locale of LOCALES) {
      const body = tx(post.content, locale);
      for (const [, href] of body.matchAll(/\]\((\/[^)\s]*)\)/g)) {
        // An EN-only service has no PT page, so a PT article linking it would ship a dead URL.
        assert.ok(contentHref(href, locale), `${post.slug} (${locale}): ${href} has no page in this language`);
      }
    }
  }
});
