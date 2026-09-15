import type { Metadata } from 'next';
import Picture from '@/components/Picture';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { type Locale, tx } from '@/lib/locales';
import { getBlogPost, publishedBlogPosts } from '@/lib/catalog';
import { isBlogPostPublished } from '@/lib/publishSchedule';
import { buildMetadata } from '@/lib/seo';
import { graph, breadcrumbNode, articleNode, faqNode } from '@/lib/jsonld';
import { wordCount } from '@/lib/article';
import { absoluteUrl } from '@/lib/urls';
import { absoluteOgImage, ogImagePath } from '@/lib/images';
import { SITE_NAME, formatDate } from '@/lib/site';
import JsonLd from '@/components/JsonLd';
import ArticleBody from '@/components/ArticleBody';
import { blogAlternateParams, blogHref } from '@/lib/routes';

const COPY = {
  blog: { en: 'Blog', pt: 'Blog' },
  back: { en: 'All guides', pt: 'Todos os guias' },
  ctaTitle: { en: 'Turn the plan into photographs', pt: 'Transforme o plano em fotografias' },
  ctaText: {
    en: 'Tell us the place and the date. A written quote within about two hours during the working day, and nothing to pay to ask.',
    pt: 'Diga-nos o sítio e a data. Orçamento por escrito em cerca de duas horas durante o dia útil, e não paga nada para perguntar.',
  },
  cta: { en: 'Check your date', pt: 'Ver disponibilidade' },
  services: { en: 'See the services', pt: 'Ver os serviços' },
  home: { en: 'Home', pt: 'Início' },
  toc: { en: 'In this guide', pt: 'Neste guia' },
  faq: { en: 'Frequently asked questions', pt: 'Perguntas frequentes' },
  updated: { en: 'Updated', pt: 'Actualizado' },
  more: { en: 'More guides', pt: 'Mais guias' },
  byline: { en: `By the ${SITE_NAME} photographers`, pt: `Pelos fotógrafos ${SITE_NAME}` },
} as const;

function c(key: keyof typeof COPY, locale: Locale): string {
  return (COPY[key] as Record<Locale, string>)[locale] ?? COPY[key].en;
}

// Fully prerendered — see the note on the leaf route. Releasing the next batch
// of drip-published pages is a rebuild, not a revalidation.
export const dynamic = 'force-static';
export const dynamicParams = false;

// Prerender only currently-published posts; the rest render on demand once
// their slot passes (dynamicParams defaults to true).
export function generateStaticParams() {
  return publishedBlogPosts().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(slug);
  if (!post) {
    return buildMetadata({ locale, route: '/blog', title: c('blog', locale), description: '' });
  }
  return buildMetadata({
    locale,
    route: '/blog/[slug]',
    alternates: blogAlternateParams(post),
    title: `${tx(post.title, locale)} · ${SITE_NAME}`,
    description: tx(post.summary, locale),
    // `cover` is a slot key, not a path: the share card is what a scraper can read.
    ogImage: ogImagePath(post.cover),
    ogImageAlt: tx(post.coverAlt, locale),
    ogType: 'article',
    article: {
      publishedTime: post.date,
      modifiedTime: post.updated,
      section: post.section ? tx(post.section, locale) : undefined,
      authors: post.author ? [post.author] : undefined,
    },
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getBlogPost(slug);
  if (!post) notFound();
  // Not yet at its drip-publish slot → behave as if it does not exist.
  if (!isBlogPostPublished(slug)) notFound();

  const body = tx(post.content, locale);
  const faqs = (post.faqs ?? []).map((f) => ({
    question: tx(f.question, locale),
    answer: tx(f.answer, locale),
  }));
  const url = absoluteUrl(locale, '/blog/[slug]', { slug });
  const related = [...publishedBlogPosts()]
    .filter((other) => other.slug !== slug)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 2);

  const jsonLd = graph([
    articleNode({
      headline: tx(post.title, locale),
      description: tx(post.summary, locale),
      url,
      datePublished: post.date,
      dateModified: post.updated,
      author: post.author,
      locale,
      image: absoluteOgImage(ogImagePath(post.cover)),
      section: post.section ? tx(post.section, locale) : undefined,
      wordCount: wordCount(body),
    }),
    // A FAQPage node only when the post actually renders the same Q&A on screen.
    ...(faqs.length > 0 ? [faqNode(faqs)] : []),
    breadcrumbNode([
      { name: c('home', locale), url: absoluteUrl(locale, '/') },
      { name: c('blog', locale), url: absoluteUrl(locale, '/blog') },
      { name: tx(post.title, locale), url },
    ]),
  ]);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <JsonLd data={jsonLd} />
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange-deep focus-visible:outline-none focus-visible:underline"
      >
        <span aria-hidden="true">←</span> {c('back', locale)}
      </Link>

      <article className="mt-8">
        <header>
          {post.section && <p className="eyebrow">{tx(post.section, locale)}</p>}
          <h1 className="font-display mt-4 text-4xl font-bold leading-[1.02] tracking-[-0.02em] text-brand-dark sm:text-[3.5rem]">
            {tx(post.title, locale)}
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-brand-muted">{tx(post.summary, locale)}</p>
          <p className="font-mono mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-brand-rule pt-5 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-brand-muted">
            <span>{post.author ?? c('byline', locale)}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
            {post.updated && (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  {c('updated', locale)} <time dateTime={post.updated}>{formatDate(post.updated, locale)}</time>
                </span>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
          </p>
        </header>

        <div className="relative mt-10 aspect-[16/9] overflow-hidden bg-brand-cream">
          <Picture
            slot={post.cover}
            alt={tx(post.coverAlt, locale)}
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            fill
            priority
          />
        </div>

        <div className="mt-10">
          <ArticleBody content={body} tocLabel={c('toc', locale)} locale={locale} />
        </div>

        {faqs.length > 0 && (
          <section aria-labelledby="faq" className="mt-16 border-t border-brand-rule pt-10">
            <h2 id="faq" className="scroll-mt-28 font-display text-3xl font-bold tracking-tight text-brand-dark">
              {c('faq', locale)}
            </h2>
            <dl className="mt-8 space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question} className="border border-brand-rule bg-brand-tile p-7">
                  <dt className="font-display text-lg font-bold text-brand-dark">{faq.question}</dt>
                  <dd className="mt-2.5 leading-relaxed text-brand-dark">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
      </article>

      <aside
        data-surface="dark"
        aria-labelledby="post-cta"
        className="mt-16 bg-brand-dark p-8 text-white sm:p-10"
      >
        <h2 id="post-cta" className="font-display text-2xl font-bold">
          {c('ctaTitle', locale)}
        </h2>
        <p className="mt-3 leading-relaxed text-white/75">{c('ctaText', locale)}</p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link href="/book" className="btn btn-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            {c('cta', locale)}
          </Link>
          <Link href="/services" className="btn btn-outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            {c('services', locale)}
          </Link>
        </div>
      </aside>

      {related.length > 0 && (
        <nav aria-labelledby="post-more" className="mt-16 border-t border-brand-rule pt-10">
          <h2 id="post-more" className="font-display text-2xl font-bold text-brand-dark">
            {c('more', locale)}
          </h2>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2">
            {related.map((other) => (
              <li key={other.slug}>
                <Link
                  href={blogHref(other.slug)}
                  className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange-deep"
                >
                  <span className="relative block aspect-[3/2] overflow-hidden bg-brand-cream">
                    <Picture
                      slot={other.cover}
                      alt=""
                      sizes="(max-width: 640px) 100vw, 360px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      fill
                    />
                  </span>
                  <span className="font-display mt-4 block text-lg font-bold leading-snug text-brand-dark transition-colors group-hover:text-brand-orange-deep">
                    {tx(other.title, locale)}
                  </span>
                  <span className="mt-1 block text-sm text-brand-muted">{other.readTime}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </main>
  );
}
