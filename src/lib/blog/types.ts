/**
 * Per-locale content for a long-form blog article.
 *
 * Long articles live in `src/lib/blog/<slug>/<locale>.ts` instead of inline in
 * `data.ts`: one file per language keeps each under the file-size budget and
 * lets a translator work on a single locale without touching the catalog.
 * The article's `index.ts` folds these into the `BlogPost` shape.
 */
export interface ArticleFaq {
  question: string;
  answer: string;
}

export interface ArticleLocale {
  /** ≤46 chars: the metadata title appends the brand and clamps at 60. */
  title: string;
  /** Meta description: 110–160 chars. */
  summary: string;
  coverAlt: string;
  /** `articleSection` in JSON-LD. */
  section: string;
  /** Body in the Markdown subset parsed by `src/lib/article.ts`. */
  body: string;
  /** Same questions, same order, in every locale — folded into a FAQPage node. */
  faqs: ArticleFaq[];
}
