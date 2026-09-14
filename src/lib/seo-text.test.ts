import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  truncateAtWord,
  clampDescription,
  clampTitle,
  TITLE_MAX,
  DESCRIPTION_MAX,
} from './seo-text';

test('truncateAtWord returns text unchanged when within the limit', () => {
  // Arrange
  const text = 'Photographer in Bordeaux';
  // Act
  const result = truncateAtWord(text, 60);
  // Assert
  assert.equal(result, text);
});

test('truncateAtWord never cuts a word in half', () => {
  const text = 'Professional wedding photography session Bordeaux Nouvelle-Aquitaine';
  const result = truncateAtWord(text, 30);
  assert.ok(result.length <= 30, `length ${result.length} exceeds 30`);
  // The body (sans ellipsis) must be a prefix of the source ending on a boundary.
  const body = result.replace(/…$/u, '');
  assert.ok(text.startsWith(body), 'body must be a prefix of the source');
  const nextChar = text.charAt(body.length);
  assert.ok(nextChar === '' || nextChar === ' ', 'cut must land on a word boundary');
});

test('truncateAtWord appends an ellipsis only when truncating', () => {
  assert.ok(!truncateAtWord('Short title', 60).endsWith('…'));
  assert.ok(truncateAtWord('A much longer title that will certainly be cut here', 20).endsWith('…'));
});

test('truncateAtWord keeps the result within max including the ellipsis', () => {
  const result = truncateAtWord('alpha beta gamma delta epsilon zeta eta theta', 18);
  assert.ok(result.length <= 18, `length ${result.length} exceeds 18`);
});

test('truncateAtWord is multi-byte safe (accents, euro sign)', () => {
  const text = 'Wedding photographer in Carcassonne from €350 with a private gallery';
  const result = truncateAtWord(text, 40);
  assert.ok(result.length <= 40);
  assert.doesNotThrow(() => result.normalize());
});

test('clampDescription caps at the SERP description limit', () => {
  const long = 'Looking for a wedding photographer in Bordeaux? Professional sessions at a fixed price, with a private gallery delivered in 48 to 72 hours and immediate online booking without surprises.';
  const result = clampDescription(long);
  assert.ok(result.length <= DESCRIPTION_MAX, `length ${result.length} exceeds ${DESCRIPTION_MAX}`);
  assert.ok(long.startsWith(result.replace(/…$/u, '')));
});

test('clampTitle preserves a brand already inside the title and trims the lead', () => {
  const brand = 'Ylala';
  const title = 'Wedding Photographer in Bordeaux — Professional Photography Services | Ylala';
  const result = clampTitle(title, { brand, max: TITLE_MAX });
  assert.ok(result.length <= TITLE_MAX, `length ${result.length} exceeds ${TITLE_MAX}`);
  assert.ok(result.endsWith(`| ${brand}`), `brand must be preserved: "${result}"`);
});

test('clampTitle accounts for a brand suffix the layout will append', () => {
  // Non-absolute title; layout appends " | Ylala" (14 chars) later.
  const title = 'Professional Wedding Photography Session — Professional photographer in France';
  const suffix = ' | Ylala';
  const result = clampTitle(title, { brandSuffixLen: suffix.length, max: TITLE_MAX });
  assert.ok(result.length + suffix.length <= TITLE_MAX,
    `rendered length ${result.length + suffix.length} exceeds ${TITLE_MAX}`);
});

test('clampTitle leaves a short branded title untouched', () => {
  const brand = 'Ylala';
  const title = 'Photographer in Paris | Ylala';
  assert.equal(clampTitle(title, { brand, max: TITLE_MAX }), title);
});
