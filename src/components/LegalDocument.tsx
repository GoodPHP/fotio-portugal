import { tx, type Locale } from '@/lib/locales';
import type { LegalDoc } from '@/lib/legal';
import ArticleBody from '@/components/ArticleBody';

/**
 * Shared shell for the legal pages. They are prose with headings and lists, so
 * they go through the same parser the blog uses rather than being hand-marked
 * up five times over.
 */
export default function LegalDocument({ doc, locale }: { doc: LegalDoc; locale: Locale }) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <header>
        <h1 className="font-display text-4xl font-bold tracking-tight text-brand-dark">
          {tx(doc.title, locale)}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-brand-muted">{tx(doc.description, locale)}</p>
      </header>
      <div className="mt-10">
        <ArticleBody content={tx(doc.body, locale)} tocLabel={locale === 'pt' ? 'Sommaire' : 'Contents'} />
      </div>
    </main>
  );
}
