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
    <main className="mx-auto max-w-3xl px-6 py-[var(--space-band)]">
      <header className="border-b border-brand-rule pb-8">
        <p className="eyebrow">{locale === 'pt' ? 'Documento legal' : 'Legal document'}</p>
        <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] text-brand-dark sm:text-5xl">
          {tx(doc.title, locale)}
        </h1>
        <p className="measure mt-5 text-lg leading-relaxed text-brand-muted">
          {tx(doc.description, locale)}
        </p>
      </header>
      <div className="mt-2">
        <ArticleBody content={tx(doc.body, locale)} tocLabel={locale === 'pt' ? 'Índice' : 'Contents'} locale={locale} />
      </div>
    </main>
  );
}
