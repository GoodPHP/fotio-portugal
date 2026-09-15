import type { Metadata } from 'next';
import Picture from '@/components/Picture';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { type Locale, tx } from '@/lib/locales';
import { publishedBlogPosts } from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';
import { graph, breadcrumbNode, blogNode } from '@/lib/jsonld';
import { absoluteUrl } from '@/lib/urls';
import { absoluteOgImage, ogImagePath } from '@/lib/images';
import { formatDate } from '@/lib/site';
import type { BlogPost } from '@/lib/types';
import JsonLd from '@/components/JsonLd';
import SeoProse from '@/components/SeoProse';
import { FadeIn } from '@/components/Motion';
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
    en: 'Where the light falls, which month a place is at its best, what to wear on calçada — written by the photographers who work these cities every week.',
    pt: 'Onde cai a luz, em que mês um sítio está no seu melhor, o que vestir na calçada — escrito por quem fotografa estes sítios todas as semanas.',
  },
  latest: { en: 'Latest guide', pt: 'Guia mais recente' },
  more: { en: 'More guides', pt: 'Mais guias' },
  readMore: { en: 'Read the guide', pt: 'Ler o guia' },
  empty: {
    en: 'The first guides are being written. In the meantime, every question you send us gets a direct answer.',
    pt: 'Os primeiros guias estão a ser escritos. Entretanto, qualquer pergunta que nos envie tem resposta directa.',
  },
  ctaTitle: { en: 'Planning a session?', pt: 'A planear uma sessão?' },
  ctaText: {
    en: 'Tell us the place and the date. A written quote within about two hours during the working day, and nothing to pay to ask.',
    pt: 'Diga-nos o sítio e a data. Orçamento por escrito em cerca de duas horas durante o dia útil, e não paga nada para perguntar.',
  },
  ctaBook: { en: 'Check your date', pt: 'Ver disponibilidade' },
  ctaServices: { en: 'See the services', pt: 'Ver os serviços' },
  breadcrumbHome: { en: 'Home', pt: 'Início' },
} as const;

function c(key: keyof typeof COPY, locale: Locale): string {
  return (COPY[key] as Record<Locale, string>)[locale] ?? COPY[key].en;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  // "Blog & guides" names the format and not the subject. What people search
  // for is the subject: seasons, spots, what to wear.
  const posts = [...publishedBlogPosts()].sort((a, b) => b.date.localeCompare(a.date));
  return buildMetadata({
    locale,
    route: '/blog',
    title: tx(META_TITLE, locale),
    description: metaDescription(locale, posts.length),
    // `cover` is a slot key; the share card is the file.
    ogImage: posts[0] ? ogImagePath(posts[0].cover) : undefined,
    ogImageAlt: tx(OG_IMAGE_ALT, locale),
  });
}

/** Date, reading time and — only when there is one — the writer's name. */
function PostMeta({ post, locale }: { post: BlogPost; locale: Locale }) {
  return (
    <p className="font-mono flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-brand-muted">
      {post.section && <span className="text-brand-orange-deep">{tx(post.section, locale)}</span>}
      {post.section && <span aria-hidden="true">·</span>}
      <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
      <span aria-hidden="true">·</span>
      <span>{post.readTime}</span>
      {post.author && (
        <>
          <span aria-hidden="true">·</span>
          <span>{post.author}</span>
        </>
      )}
    </p>
  );
}

const LINK_FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange-deep';

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Only list published posts so the index never links to a 404.
  const posts = [...publishedBlogPosts()].sort((a, b) => b.date.localeCompare(a.date));
  const [featured, ...rest] = posts;

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
        image: absoluteOgImage(ogImagePath(post.cover)),
        section: post.section ? tx(post.section, locale) : undefined,
      })),
    }),
    breadcrumbNode([
      { name: c('breadcrumbHome', locale), url: absoluteUrl(locale, '/') },
      { name: c('title', locale), url: blogUrl },
    ]),
  ]);

  return (
    <main className="mx-auto max-w-[92rem] px-6 py-16 sm:py-20">
      <JsonLd data={jsonLd} />

      <header className="grid gap-6 border-b border-brand-rule pb-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="eyebrow">{c('eyebrow', locale)}</p>
          <h1 className="font-display mt-4 text-[length:var(--text-title)] font-bold leading-[0.98] tracking-[-0.03em] text-brand-dark">
            {c('title', locale)}
          </h1>
        </div>
        <p className="text-lg leading-relaxed text-brand-muted lg:col-span-4">{c('intro', locale)}</p>
      </header>

      {!featured && <p className="mt-12 max-w-2xl text-lg text-brand-muted">{c('empty', locale)}</p>}

      {featured && (
        <section aria-labelledby="blog-latest" className="mt-12">
          <h2 id="blog-latest" className="sr-only">
            {c('latest', locale)}
          </h2>
          <FadeIn>
            {/*
              The newest guide gets the spread: the photograph carries the page
              the way a magazine cover does, and the text column sits beside it
              rather than under it so the headline is above the fold on a laptop.
            */}
            <article className="group grid border border-brand-rule bg-brand-tile lg:grid-cols-12">
              <Link
                href={blogHref(featured.slug)}
                tabIndex={-1}
                aria-hidden="true"
                className="relative block aspect-[4/3] overflow-hidden lg:col-span-7 lg:aspect-auto lg:min-h-[28rem]"
              >
                <Picture
                  slot={featured.cover}
                  alt={tx(featured.coverAlt, locale)}
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  fill
                  priority
                />
              </Link>
              <div className="flex flex-col justify-center p-7 sm:p-10 lg:col-span-5 lg:p-12">
                <p className="eyebrow">{c('latest', locale)}</p>
                <div className="mt-5">
                  <PostMeta post={featured} locale={locale} />
                </div>
                <h3 className="font-display mt-4 text-3xl font-bold leading-[1.05] tracking-[-0.02em] text-brand-dark sm:text-[2.5rem]">
                  <Link
                    href={blogHref(featured.slug)}
                    className={`transition-colors group-hover:text-brand-orange-deep ${LINK_FOCUS}`}
                  >
                    {tx(featured.title, locale)}
                  </Link>
                </h3>
                <p className="mt-5 text-lg leading-relaxed text-brand-muted">{tx(featured.summary, locale)}</p>
                <span
                  aria-hidden="true"
                  className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange-deep"
                >
                  {c('readMore', locale)}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </article>
          </FadeIn>
        </section>
      )}

      {rest.length > 0 && (
        <section aria-labelledby="blog-more" className="mt-16">
          <h2 id="blog-more" className="font-display text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl">
            {c('more', locale)}
          </h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <li key={post.slug}>
                <article className="group flex h-full flex-col border border-brand-rule bg-brand-tile">
                  <Link
                    href={blogHref(post.slug)}
                    tabIndex={-1}
                    aria-hidden="true"
                    className="relative block aspect-[3/2] overflow-hidden"
                  >
                    <Picture
                      slot={post.cover}
                      alt={tx(post.coverAlt, locale)}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      fill
                    />
                  </Link>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <PostMeta post={post} locale={locale} />
                    <h3 className="font-display mt-3 text-xl font-bold leading-snug text-brand-dark sm:text-2xl">
                      <Link
                        href={blogHref(post.slug)}
                        className={`transition-colors group-hover:text-brand-orange-deep ${LINK_FOCUS}`}
                      >
                        {tx(post.title, locale)}
                      </Link>
                    </h3>
                    <p className="mt-3 flex-1 leading-relaxed text-brand-muted">{tx(post.summary, locale)}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>
      )}

      <aside
        data-surface="dark"
        aria-labelledby="blog-cta"
        className="mt-16 bg-brand-dark px-7 py-10 text-white sm:px-12 lg:flex lg:items-center lg:justify-between lg:gap-12"
      >
        <div className="max-w-2xl">
          <h2 id="blog-cta" className="font-display text-2xl font-bold sm:text-3xl">
            {c('ctaTitle', locale)}
          </h2>
          <p className="mt-3 leading-relaxed text-white/75">{c('ctaText', locale)}</p>
        </div>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
          <Link href="/book" className="btn btn-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            {c('ctaBook', locale)}
          </Link>
          <Link href="/services" className="btn btn-outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            {c('ctaServices', locale)}
          </Link>
        </div>
      </aside>

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
