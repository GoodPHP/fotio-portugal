/**
 * Article content parser for blog posts.
 *
 * Post bodies are authored as a small, deliberately limited Markdown subset in
 * `data.ts` (no CMS, no runtime Markdown dependency). This module turns that
 * source into typed blocks so the page component only renders — the parsing is
 * pure and unit-tested.
 *
 * Supported block syntax (blocks separated by a blank line):
 *   `## Heading`          section heading
 *   `### Heading`         sub-heading
 *   `- item`  / `* item`  unordered list (one item per line)
 *   `1. item`             ordered list (one item per line)
 *   `| a | b |`           table; the second row must be a `| --- | --- |` rule
 *   `> text`              callout / pull quote
 *   anything else         paragraph
 *
 * Supported inline syntax: `**bold**` and `[label](/internal-or-external-url)`.
 *
 * Heading levels: articles authored before section headings existed use `###`
 * as their only heading level. To avoid emitting an `h3` with no `h2` above it
 * (a heading-order break Google and screen readers both dislike), a document
 * that contains no `##` heading has its `###` headings promoted to level 2.
 */

export type HeadingLevel = 2 | 3;

export interface HeadingBlock {
  type: 'heading';
  level: HeadingLevel;
  text: string;
  /** URL-safe anchor, unique within the document. */
  id: string;
}

export interface ParagraphBlock {
  type: 'paragraph';
  text: string;
}

export interface ListBlock {
  type: 'list';
  ordered: boolean;
  items: string[];
}

export interface TableBlock {
  type: 'table';
  head: string[];
  rows: string[][];
}

export interface CalloutBlock {
  type: 'callout';
  text: string;
}

export type ArticleBlock = HeadingBlock | ParagraphBlock | ListBlock | TableBlock | CalloutBlock;

export type InlineToken =
  | { type: 'text'; text: string }
  | { type: 'bold'; text: string }
  | { type: 'link'; text: string; href: string; external: boolean };

const HEADING_RE = /^(#{2,3})\s+(.*)$/;
const UNORDERED_ITEM_RE = /^[-*]\s+(.*)$/;
const ORDERED_ITEM_RE = /^\d+[.)]\s+(.*)$/;
const CALLOUT_RE = /^>\s?(.*)$/;
const TABLE_RULE_RE = /^\|?[\s:-]*-[\s|:-]*\|?$/;

/**
 * URL-safe anchor from heading text: accents folded, punctuation dropped.
 * Empty results fall back to `section` so an id is always emitted.
 */
export function slugifyHeading(text: string): string {
  const slug = text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/gu, '')
    .replace(/['’]/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/gu, '-')
    .replace(/^-+|-+$/gu, '');
  return slug || 'section';
}

/** Split a Markdown table row into trimmed cells, ignoring the outer pipes. */
function tableCells(line: string): string[] {
  return line
    .replace(/^\s*\|/u, '')
    .replace(/\|\s*$/u, '')
    .split('|')
    .map((cell) => cell.trim());
}

function parseTable(lines: string[]): TableBlock | null {
  if (lines.length < 3 || !TABLE_RULE_RE.test(lines[1])) return null;
  const head = tableCells(lines[0]);
  const rows = lines.slice(2).map(tableCells);
  return { type: 'table', head, rows };
}

/**
 * Parse an article body into renderable blocks. `###` is promoted to level 2 in
 * documents that use no `##` at all (see the module comment).
 */
export function parseArticle(content: string): ArticleBlock[] {
  const source = content.replace(/\r\n/gu, '\n');
  const promoteH3 = !/^##\s+/mu.test(source);
  const usedIds = new Map<string, number>();
  const blocks: ArticleBlock[] = [];

  const pushHeading = (marks: string, raw: string) => {
    const level: HeadingLevel = marks.length === 2 || promoteH3 ? 2 : 3;
    const text = raw.trim();
    const base = slugifyHeading(text);
    const seen = usedIds.get(base) ?? 0;
    usedIds.set(base, seen + 1);
    blocks.push({ type: 'heading', level, text, id: seen === 0 ? base : `${base}-${seen + 1}` });
  };

  const pushBody = (lines: string[]) => {
    if (lines.length === 0) return;

    if (lines[0].startsWith('|')) {
      const table = parseTable(lines);
      if (table) {
        blocks.push(table);
        return;
      }
    }

    if (lines.every((l) => UNORDERED_ITEM_RE.test(l))) {
      blocks.push({ type: 'list', ordered: false, items: lines.map((l) => l.replace(UNORDERED_ITEM_RE, '$1').trim()) });
      return;
    }

    if (lines.every((l) => ORDERED_ITEM_RE.test(l))) {
      blocks.push({ type: 'list', ordered: true, items: lines.map((l) => l.replace(ORDERED_ITEM_RE, '$1').trim()) });
      return;
    }

    if (lines.every((l) => CALLOUT_RE.test(l))) {
      blocks.push({ type: 'callout', text: lines.map((l) => l.replace(CALLOUT_RE, '$1').trim()).join(' ') });
      return;
    }

    blocks.push({ type: 'paragraph', text: lines.join(' ') });
  };

  for (const raw of source.split(/\n\s*\n/u)) {
    const chunk = raw.trim();
    if (!chunk) continue;
    // Older posts put a heading and its opening paragraph in the same block,
    // separated by a single newline — split those apart instead of dropping the
    // prose that follows the heading.
    let lines = chunk.split('\n').map((l) => l.trim()).filter(Boolean);
    while (lines.length > 0) {
      const heading = lines[0].match(HEADING_RE);
      if (heading) {
        pushHeading(heading[1], heading[2]);
        lines = lines.slice(1);
        continue;
      }
      const nextHeading = lines.findIndex((l) => HEADING_RE.test(l));
      pushBody(nextHeading === -1 ? lines : lines.slice(0, nextHeading));
      lines = nextHeading === -1 ? [] : lines.slice(nextHeading);
    }
  }

  return blocks;
}

const INLINE_RE = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/gu;

/** Tokenize inline `**bold**` and `[label](href)` markup. */
export function parseInline(text: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  let cursor = 0;

  for (const match of text.matchAll(INLINE_RE)) {
    const start = match.index ?? 0;
    if (start > cursor) tokens.push({ type: 'text', text: text.slice(cursor, start) });
    if (match[3] !== undefined) {
      tokens.push({ type: 'bold', text: match[3] });
    } else {
      const href = match[2];
      tokens.push({ type: 'link', text: match[1], href, external: !href.startsWith('/') });
    }
    cursor = start + match[0].length;
  }

  if (cursor < text.length) tokens.push({ type: 'text', text: text.slice(cursor) });
  return tokens;
}

export interface TocEntry {
  id: string;
  text: string;
}

/**
 * Table-of-contents entries (level-2 headings only). Returns an empty list for
 * short articles, where a ToC is noise rather than navigation.
 */
export function tableOfContents(blocks: ArticleBlock[], minEntries = 3): TocEntry[] {
  const entries = blocks
    .filter((b): b is HeadingBlock => b.type === 'heading' && b.level === 2)
    .map(({ id, text }) => ({ id, text }));
  return entries.length >= minEntries ? entries : [];
}

/** Approximate word count of the rendered prose — used for `wordCount` in JSON-LD. */
export function wordCount(content: string): number {
  const plain = content
    .replace(/[#>|*_-]/gu, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/gu, '$1')
    .trim();
  return plain ? plain.split(/\s+/u).length : 0;
}
