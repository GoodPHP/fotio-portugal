import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  parseArticle,
  parseInline,
  slugifyHeading,
  tableOfContents,
  wordCount,
} from './article';

test('slugifyHeading folds accents and drops punctuation', () => {
  assert.equal(slugifyHeading('Quando sposarsi: stagionalità e luce'), 'quando-sposarsi-stagionalita-e-luce');
  assert.equal(slugifyHeading('L’abito, il fiore & il resto'), 'labito-il-fiore-il-resto');
  assert.equal(slugifyHeading('***'), 'section');
});

test('parseArticle separates headings, paragraphs and lists', () => {
  const blocks = parseArticle('## Intro\n\nUn paragrafo.\n\n- primo\n- secondo\n\n1. uno\n2. due');
  assert.deepEqual(
    blocks.map((b) => b.type),
    ['heading', 'paragraph', 'list', 'list'],
  );
  assert.deepEqual(blocks[2], { type: 'list', ordered: false, items: ['primo', 'secondo'] });
  assert.deepEqual(blocks[3], { type: 'list', ordered: true, items: ['uno', 'due'] });
});

test('parseArticle keeps h2/h3 levels when both are used', () => {
  const blocks = parseArticle('## Sezione\n\n### Sotto-sezione');
  assert.deepEqual(
    blocks.map((b) => (b.type === 'heading' ? b.level : null)),
    [2, 3],
  );
});

test('parseArticle promotes h3 to h2 in legacy posts that use no h2', () => {
  const blocks = parseArticle('Intro.\n\n### 1. Fontana di Trevi\n\nTesto.');
  const heading = blocks.find((b) => b.type === 'heading');
  assert.equal(heading?.type === 'heading' && heading.level, 2);
});

test('parseArticle gives repeated headings unique anchors', () => {
  const blocks = parseArticle('## Budget\n\na\n\n## Budget\n\nb');
  const ids = blocks.filter((b) => b.type === 'heading').map((b) => (b.type === 'heading' ? b.id : ''));
  assert.deepEqual(ids, ['budget', 'budget-2']);
});

test('parseArticle reads a table with its header row', () => {
  const blocks = parseArticle('| Cidade | Preço |\n| --- | --- |\n| Lisboa | €350 |\n| Porto | €420 |');
  assert.deepEqual(blocks[0], {
    type: 'table',
    head: ['Cidade', 'Preço'],
    rows: [['Lisboa', '€350'], ['Porto', '€420']],
  });
});

test('parseArticle falls back to a paragraph for a malformed table', () => {
  const blocks = parseArticle('| Cidade | Preço |\n| Lisboa | €350 |');
  assert.equal(blocks[0].type, 'paragraph');
});

test('parseArticle reads a callout', () => {
  assert.deepEqual(parseArticle('> Nota bene.\n> Segunda linha.'), [
    { type: 'callout', text: 'Nota bene. Segunda linha.' },
  ]);
});

test('parseInline splits links and bold from surrounding text', () => {
  const tokens = parseInline('See the [wedding service](/services/wedding) and **book** now.');
  assert.deepEqual(tokens, [
    { type: 'text', text: 'See the ' },
    { type: 'link', text: 'wedding service', href: '/services/wedding', external: false },
    { type: 'text', text: ' and ' },
    { type: 'bold', text: 'book' },
    { type: 'text', text: ' now.' },
  ]);
});

test('parseInline marks non-root hrefs as external', () => {
  const tokens = parseInline('[Comune](https://example.com/x)');
  assert.equal(tokens[0].type === 'link' && tokens[0].external, true);
});

test('tableOfContents lists h2 anchors only above the minimum', () => {
  const blocks = parseArticle('## Uno\n\na\n\n### Sub\n\nb\n\n## Due\n\nc\n\n## Tre\n\nd');
  assert.deepEqual(tableOfContents(blocks), [
    { id: 'uno', text: 'Uno' },
    { id: 'due', text: 'Due' },
    { id: 'tre', text: 'Tre' },
  ]);
  assert.deepEqual(tableOfContents(parseArticle('## Uno\n\na\n\n## Due\n\nb')), []);
});

test('wordCount ignores markup but keeps link labels', () => {
  assert.equal(wordCount('## Titolo\n\n- [due parole](/x)'), 3);
  assert.equal(wordCount('   '), 0);
});

test('parseArticle keeps prose that shares a block with its heading', () => {
  const blocks = parseArticle('### 1. Fontana di Trevi\nArriva tra le 6:00 e le 6:45.\n\nAltro paragrafo.');
  assert.deepEqual(
    blocks.map((b) => b.type),
    ['heading', 'paragraph', 'paragraph'],
  );
  assert.equal(blocks[1].type === 'paragraph' && blocks[1].text, 'Arriva tra le 6:00 e le 6:45.');
});

test('parseArticle splits a heading that follows prose in the same block', () => {
  const blocks = parseArticle('Intro.\n## Sezione\nTesto.');
  assert.deepEqual(
    blocks.map((b) => b.type),
    ['paragraph', 'heading', 'paragraph'],
  );
});
