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
        <strong key={i} className="font-semibold text-brand-dark">
          {token.text}
        </strong>
      );
    }
    if (token.type === 'link') {
      // Cobalt, underlined on a hairline, thickening on hover. A prose link
      // is the one place the accent is allowed to appear mid-sentence.
      const className =
        'font-medium text-brand-orange-deep underline decoration-brand-orange/40 underline-offset-4 transition hover:decoration-brand-orange-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep';
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
          className="font-display mt-14 scroll-mt-28 border-t border-brand-rule pt-6 text-[1.75rem] font-bold leading-tight text-brand-dark sm:text-3xl"
        >
          {block.text}
        </h2>
      ) : (
        <h3 id={block.id} className="font-display mt-10 scroll-mt-28 text-xl font-bold text-brand-dark">
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
        // A square marker rather than a disc: the system has no circles in it.
        <ul className={`${className} list-[square]`}>{items}</ul>
      );
    }

    case 'table':
      return (
        <div className="mt-7 overflow-x-auto border border-brand-rule bg-brand-tile">
          <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
            <thead className="border-b border-brand-rule bg-brand-cream/60">
              <tr>
                {block.head.map((cell, i) => (
                  <th
                    key={i}
                    scope="col"
                    className="font-mono px-4 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-brand-dark"
                  >
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
        <aside className="mt-7 border border-brand-rule border-l-[3px] border-l-brand-orange-deep bg-brand-tile px-6 py-5 leading-relaxed text-brand-dark">
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
    <nav aria-label={label} className="tile mt-10 p-7">
      <h2 className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-brand-muted">
        {label}
      </h2>
      <ol className="mt-5 space-y-3 text-[0.95rem]">
        {entries.map((entry, i) => (
          <li key={entry.id} className="flex gap-4">
            <span aria-hidden="true" className="font-mono font-semibold tabular-nums text-brand-orange-deep">
              {String(i + 1).padStart(2, '0')}
            </span>
            <a
              href={`#${entry.id}`}
              className="font-medium text-brand-dark underline decoration-transparent underline-offset-4 transition hover:text-brand-orange-deep hover:decoration-brand-orange/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep"
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
