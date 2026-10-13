/**
 * Text uniqueness, measured the way the Russian- and Portuguese-language SEO
 * tools measure it: as the share of a page's word shingles that appear on no
 * other page.
 *
 * A shingle is a run of four consecutive words, lower-cased and stripped of
 * punctuation. A page is "70% unique" when 70% of its shingles are found
 * nowhere else in the corpus. Two numbers are reported, because they fail in
 * different ways:
 *
 * - `vsCorpus` pools every other page. A page that borrows a paragraph from its
 *   city page and another from its service page can look fine against each one
 *   alone and still be mostly reassembled from elsewhere; this is what catches
 *   that, and it is the number the tools report.
 * - `vsNearest` is against the single most similar page, which names the page
 *   to rewrite when the first number is low.
 */

const SHINGLE_WORDS = 4;

/** Newlines and bars are hard boundaries: no shingle runs across two blocks. */
const BLOCK_BREAK = /[\n|]+/u;

function words(block: string): string[] {
  return block
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]+/gu, ' ')
    .split(/\s+/u)
    .filter(Boolean);
}

export function shingles(text: string): Set<string> {
  const out = new Set<string>();
  for (const block of text.split(BLOCK_BREAK)) {
    const list = words(block);
    for (let i = 0; i + SHINGLE_WORDS <= list.length; i++) {
      out.add(list.slice(i, i + SHINGLE_WORDS).join(' '));
    }
  }
  return out;
}

export interface TextPage {
  id: string;
  text: string;
}

export interface UniquenessRow {
  id: string;
  /** Shingles on the page. */
  size: number;
  /** Share of shingles found on no other page, 0–1. */
  vsCorpus: number;
  /** Share of shingles not found on the single most similar page, 0–1. */
  vsNearest: number;
  /** Id of that most similar page, or `undefined` when nothing overlaps. */
  nearest?: string;
}

/**
 * Score each of `pages` against `corpus`. The corpus may include the pages
 * themselves; a page is never compared with an entry carrying its own id.
 */
export function uniquenessReport(pages: readonly TextPage[], corpus: readonly TextPage[]): UniquenessRow[] {
  const corpusSets = corpus.map((page) => ({ id: page.id, set: shingles(page.text) }));

  // shingle → ids of corpus pages holding it. One pass over the corpus instead
  // of a page-by-page comparison, which is 432² set intersections.
  const holders = new Map<string, string[]>();
  for (const { id, set } of corpusSets) {
    for (const shingle of set) {
      const list = holders.get(shingle);
      if (list) list.push(id);
      else holders.set(shingle, [id]);
    }
  }

  return pages.map((page) => {
    const own = shingles(page.text);
    if (own.size === 0) return { id: page.id, size: 0, vsCorpus: 1, vsNearest: 1 };

    let shared = 0;
    const perPage = new Map<string, number>();
    for (const shingle of own) {
      const others = (holders.get(shingle) ?? []).filter((id) => id !== page.id);
      if (others.length === 0) continue;
      shared += 1;
      for (const id of new Set(others)) perPage.set(id, (perPage.get(id) ?? 0) + 1);
    }

    let nearest: string | undefined;
    let nearestCount = 0;
    for (const [id, count] of perPage) {
      if (count > nearestCount) {
        nearest = id;
        nearestCount = count;
      }
    }

    return {
      id: page.id,
      size: own.size,
      vsCorpus: 1 - shared / own.size,
      vsNearest: 1 - nearestCount / own.size,
      nearest,
    };
  });
}
