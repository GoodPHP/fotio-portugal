import type { Metadata } from 'next';
import Image from 'next/image';
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
import { SITE_NAME, SITE_URL } from '@/lib/site';
import JsonLd from '@/components/JsonLd';
import ArticleBody from '@/components/ArticleBody';
import { blogAlternateParams } from '@/lib/routes';

const COPY = {
  blog: { en: 'Blog', fr: 'Blog' },
  back: { en: 'All articles', fr: 'Tous les articles' },
  ctaTitle: { en: 'Turn inspiration into real photos', fr: 'Transformez l’inspiration en vraies photos' },
  cta: { en: 'Book a session', fr: 'Réserver une séance' },
  home: { en: 'Home', fr: 'Accueil' },
  toc: { en: 'In this guide', fr: 'Dans ce guide' },
  faq: { en: 'Frequently asked questions', fr: 'Questions fréquentes' },
  updated: { en: 'Updated on', fr: 'Mis à jour le' },
} as const;

function c(key: keyof typeof COPY, locale: Locale): string {
  return (COPY[key] as Record<Locale, string>)[locale] ?? COPY[key].en;
}

function formatDate(date: string, locale: Locale): string {
  try {
    return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(date));
  } catch {
    return date;
  }
}

// Re-render via ISR so a post prerendered as 404 (before its drip slot) flips
// live within ~1h of its scheduled publish time.
export const revalidate = 3600;

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
    ogImage: post.cover,
    ogType: 'article',
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

  const jsonLd = graph([
    articleNode({
      headline: tx(post.title, locale),
      description: tx(post.summary, locale),
      url: absoluteUrl(locale, '/blog/[slug]', { slug }),
      datePublished: post.date,
      dateModified: post.updated,
      author: post.author,
      locale,
      image: `${SITE_URL}${post.cover}`,
      section: post.section ? tx(post.section, locale) : undefined,
      wordCount: wordCount(body),
    }),
    // A FAQPage node only when the post actually renders the same Q&A on screen.
    ...(faqs.length > 0 ? [faqNode(faqs)] : []),
    breadcrumbNode([
      { name: c('home', locale), url: absoluteUrl(locale, '/') },
      { name: c('blog', locale), url: absoluteUrl(locale, '/blog') },
      { name: tx(post.title, locale), url: absoluteUrl(locale, '/blog/[slug]', { slug }) },
    ]),
  ]);

  return (
    <main className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
      <JsonLd data={jsonLd} />
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange-deep focus-visible:outline-none focus-visible:underline"
      >
        <span aria-hidden="true">←</span> {c('back', locale)}
      </Link>

      <article className="mt-6">
        <header>
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-wide text-brand-muted">
            <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
            {post.updated && (
              <>
                <span aria-hidden="true">·</span>
                <time dateTime={post.updated}>
                  {c('updated', locale)} {formatDate(post.updated, locale)}
                </time>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
            <span aria-hidden="true">·</span>
            <span>{post.author}</span>
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-5xl">
            {tx(post.title, locale)}
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-brand-muted">{tx(post.summary, locale)}</p>
        </header>

        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-card bg-neutral-100">
          <Image
            src={post.cover}
            alt={tx(post.coverAlt, locale)}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        <div className="mt-10 border-t border-brand-rule pt-8">
          <ArticleBody content={body} tocLabel={c('toc', locale)} />
        </div>

        {faqs.length > 0 && (
          <section aria-labelledby="faq" className="mt-16 border-t border-brand-rule pt-10">
            <h2 id="faq" className="scroll-mt-28 font-display text-3xl font-bold tracking-tight text-neutral-900">
              {c('faq', locale)}
            </h2>
            <dl className="mt-8 space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-card border border-brand-rule bg-white p-7">
                  <dt className="font-display text-lg font-bold text-neutral-900">{faq.question}</dt>
                  <dd className="mt-2.5 leading-relaxed text-brand-dark">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
      </article>

      <aside className="mt-16 flex flex-col items-start justify-between gap-5 rounded-card bg-brand-orange-deep p-8 text-white sm:flex-row sm:items-center">
        <h2 className="font-display text-xl font-bold">{c('ctaTitle', locale)}</h2>
        <Link
          href="/book"
          className="inline-flex shrink-0 items-center rounded-chip bg-white px-7 py-3.5 font-semibold text-brand-dark transition hover:bg-brand-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          {c('cta', locale)}
        </Link>
      </aside>
    </main>
  );
}
