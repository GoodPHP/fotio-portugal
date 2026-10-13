import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fillLeafTokens, unknownLeafTokens } from './leaf-copy';
import { getServiceById } from './catalog';

const wedding = getServiceById('wedding')!;
const couple = getServiceById('couple')!;

test('tokens are filled from the catalogue, not from the copy', () => {
  // Act
  const en = fillLeafTokens('From {price}, {duration} of coverage.', wedding, 'en');
  // Assert
  assert.equal(en, 'From €1,400, 10 hours of coverage.');
});

test('tokens follow the locale formatting', () => {
  const pt = fillLeafTokens('Desde {price}.', wedding, 'pt');
  assert.match(pt, /^Desde 1\s?400\s?€\.$/u);
});

test('photo count and delivery tokens resolve', () => {
  const text = fillLeafTokens('{photos} photos within {delivery}.', couple, 'en');
  assert.doesNotMatch(text, /[{}]/);
  assert.match(text, /^15–20 photos within /);
});

test('text without tokens is returned unchanged', () => {
  assert.equal(fillLeafTokens('No tokens here.', couple, 'en'), 'No tokens here.');
});

test('an unknown token is reported, not silently printed', () => {
  assert.deepEqual(unknownLeafTokens('From {price} in {city}'), ['{city}']);
  assert.deepEqual(unknownLeafTokens('From {price}'), []);
});
