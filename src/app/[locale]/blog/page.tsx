import type { Metadata } from 'next';
import Picture from '@/components/Picture';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { type Locale, tx } from '@/lib/locales';
import { publishedBlogPosts } from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';
import { graph, breadcrumbNode, blogNode } from '@/lib/jsonld';
import { absoluteUrl } from '@/lib/urls';
import { absoluteOgImage } from '@/lib/images';
import JsonLd from '@/components/JsonLd';
import SeoProse from '@/components/SeoProse';
import { blogHref } from '@/lib/routes';
import {
  META_TITLE,
  OG_IMAGE_ALT,
  SEO_PROSE,
  metaDescription,
  seoFacts,
} from './content';

const COPY = {
  title: { en: 'Blog & guides', pt: 'Blog e guias' },
  eyebrow: { en: 'Tips from our photographers', pt: 'Conselhos dos nossos fotógrafos' },
  intro: {
    en: 'Where the light falls, what the permits cost, which hour a place is still empty — written by the photographers who work these cities every week.',
    pt: 'Onde cai a luz, quanto custam as autorizações, a que hora um sítio ainda está vazio — escrito por quem fotografa estes sítios todas as semanas.',
  },
  readMore: { en: 'Read the article', pt: 'Ler o artigo' },
  breadcrumbHome: { en: 'Home', pt: 'Início' },
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  // "Blog & guides" names the format and not the subject. What people search
  // for is the subject: spots, permits, seasons.
  const posts = publishedBlogPosts();
  return buildMetadata({
    locale,
    route: '/blog',
    title: tx(META_TITLE, locale),
    description: metaDescription(locale, posts.length),
    ogImage: posts[0]?.cover,
    ogImageAlt: tx(OG_IMAGE_ALT, locale),
  });
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Only list published posts so the index never links to a 404.
  const posts = [...publishedBlogPosts()].sort((a, b) => b.date.localeCompare(a.date));

  // The index is a Blog whose posts are named here, so the archive states its
  // authorship and dates rather than leaving both inside each article. Built
  // from `posts`, the array the list renders.
  const blogUrl = absoluteUrl(locale, '/blog');
  const jsonLd = graph([
    blogNode({
      url: blogUrl,
      name: tx(META_TITLE, locale),
      description: metaDescription(locale, posts.length),
      locale,
      posts: posts.map((post) => ({
        headline: tx(post.title, locale),
        url: absoluteUrl(locale, '/blog/[slug]', { slug: post.slug }),
        datePublished: post.date,
        author: post.author,
        description: tx(post.summary, locale),
        image: absoluteOgImage(post.cover),
        section: post.section ? tx(post.section, locale) : undefined,
      })),
    }),
    breadcrumbNode([
      { name: c('breadcrumbHome', locale), url: absoluteUrl(locale, '/') },
      { name: c('title', locale), url: blogUrl },
    ]),
  ]);

  return (
    <main className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
      <JsonLd data={jsonLd} />
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange-deep">
          {c('eyebrow', locale)}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-neutral-900 sm:text-6xl">
          {c('title', locale)}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-brand-muted">{c('intro', locale)}</p>
      </header>

      <section className="mt-14 space-y-6">
        {posts.map((post, i) => (
          <article
            key={post.slug}
            className="group overflow-hidden rounded-card border border-brand-rule bg-white transition hover:-translate-y-0.5 sm:flex"
          >
            <Link
              href={blogHref(post.slug)}
              className="relative block aspect-[16/10] overflow-hidden sm:aspect-auto sm:w-2/5 sm:shrink-0"
              aria-label={tx(post.title, locale)}
            >
              <Picture
                slot={post.cover}
                alt={tx(post.coverAlt, locale)}
                sizes="(max-width: 640px) 100vw, 40vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                fill
              />
            </Link>
            <div className="p-7 sm:flex-1 sm:p-8">
              <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-wide text-brand-muted">
                <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
                <span aria-hidden="true">·</span>
                <span>{post.readTime}</span>
                <span aria-hidden="true">·</span>
                <span>{post.author}</span>
              </div>
              <h2 className="mt-4 font-display text-2xl font-bold text-neutral-900 group-hover:text-brand-orange-deep sm:text-3xl">
                <Link href={blogHref(post.slug)} className="focus-visible:outline-none focus-visible:underline">
                  {tx(post.title, locale)}
                </Link>
              </h2>
              <p className="mt-3 text-brand-muted">{tx(post.summary, locale)}</p>
              <Link
                href={blogHref(post.slug)}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/40"
              >
                {c('readMore', locale)}
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </article>
        ))}
      </section>

      <SeoProse
        nested
        headingId="blog-seo-heading"
        eyebrow={tx(SEO_PROSE.eyebrow, locale)}
        heading={tx(SEO_PROSE.heading, locale)}
        paragraphs={tx(SEO_PROSE.paragraphs, locale)}
        facts={seoFacts(locale, posts.length)}
      />
    </main>
  );
}
