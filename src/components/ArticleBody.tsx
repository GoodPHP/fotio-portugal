import type { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import {
  parseArticle,
  parseInline,
  tableOfContents,
  type ArticleBlock,
  type TocEntry,
} from '@/lib/article';
import { contentHref } from '@/lib/routes';

/** Render inline `**bold**` and `[label](href)` markup as React nodes. */
function Inline({ text }: { text: string }): ReactNode {
  return parseInline(text).map((token, i) => {
    if (token.type === 'bold') {
      return (
        <strong key={i} className="font-semibold text-neutral-900">
          {token.text}
        </strong>
      );
    }
    if (token.type === 'link') {
      const className =
        'font-medium text-brand-orange-deep underline decoration-brand-orange/30 underline-offset-4 transition hover:decoration-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/40';
      if (token.external) {
        return (
          <a key={i} href={token.href} rel="noopener noreferrer" target="_blank" className={className}>
            {token.text}
          </a>
        );
      }
      // Prose is authored with English paths; re-localize them for the reader.
      const internal = contentHref(token.href);
      return internal ? (
        <Link key={i} href={internal} className={className}>
          {token.text}
        </Link>
      ) : (
        <a key={i} href={token.href} className={className}>
          {token.text}
        </a>
      );
    }
    return <span key={i}>{token.text}</span>;
  });
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case 'heading':
      return block.level === 2 ? (
        <h2
          id={block.id}
          className="mt-14 scroll-mt-28 font-display text-3xl font-bold tracking-tight text-neutral-900"
        >
          {block.text}
        </h2>
      ) : (
        <h3 id={block.id} className="mt-10 scroll-mt-28 font-display text-xl font-bold text-neutral-900">
          {block.text}
        </h3>
      );

    case 'list': {
      const className = 'mt-5 space-y-2.5 pl-5 leading-relaxed text-brand-dark';
      const items = block.items.map((item, i) => (
        <li key={i} className="pl-1.5 marker:font-semibold marker:text-brand-orange-deep">
          <Inline text={item} />
        </li>
      ));
      return block.ordered ? (
        <ol className={`${className} list-decimal`}>{items}</ol>
      ) : (
        <ul className={`${className} list-disc`}>{items}</ul>
      );
    }

    case 'table':
      return (
        <div className="mt-7 overflow-x-auto rounded-card-sm border border-brand-rule">
          <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
            <thead className="bg-brand-sand/40">
              <tr>
                {block.head.map((cell, i) => (
                  <th key={i} scope="col" className="px-4 py-3 font-semibold text-neutral-900">
                    <Inline text={cell} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="border-t border-brand-rule align-top">
                  {row.map((cell, c) => (
                    <td key={c} className="px-4 py-3 text-brand-dark">
                      <Inline text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'callout':
      return (
        <aside className="mt-7 rounded-card-sm border-l-4 border-brand-orange-deep bg-brand-sand/30 px-6 py-5 leading-relaxed text-neutral-800">
          <Inline text={block.text} />
        </aside>
      );

    default:
      return (
        <p className="mt-5 leading-relaxed text-brand-dark">
          <Inline text={block.text} />
        </p>
      );
  }
}

function TableOfContents({ entries, label }: { entries: TocEntry[]; label: string }) {
  return (
    <nav aria-label={label} className="mt-10 rounded-card border border-brand-rule bg-neutral-50 p-7">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-muted">{label}</h2>
      <ol className="mt-4 space-y-2.5 text-[0.95rem]">
        {entries.map((entry, i) => (
          <li key={entry.id} className="flex gap-3">
            <span aria-hidden="true" className="font-semibold tabular-nums text-brand-orange-deep">
              {String(i + 1).padStart(2, '0')}
            </span>
            <a
              href={`#${entry.id}`}
              className="font-medium text-brand-dark underline decoration-transparent underline-offset-4 transition hover:text-brand-orange-deep hover:decoration-brand-orange/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/40"
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Render a blog post body from its authored Markdown subset, preceded by a
 * table of contents on long-form articles (see `src/lib/article.ts`).
 */
export default function ArticleBody({ content, tocLabel }: { content: string; tocLabel: string }) {
  const blocks = parseArticle(content);
  const toc = tableOfContents(blocks);

  return (
    <>
      {toc.length > 0 && <TableOfContents entries={toc} label={tocLabel} />}
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </>
  );
}
