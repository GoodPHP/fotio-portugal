import { test } from 'node:test';
import assert from 'node:assert/strict';
import { shingles, uniquenessReport } from './uniqueness';

test('shingles ignore case, punctuation and spacing', () => {
  // Arrange
  const a = 'The light, in Lisbon — is   low.';
  const b = 'the light in lisbon is low';
  // Act / Assert
  assert.deepEqual([...shingles(a)], [...shingles(b)]);
});

test('shingles keep Portuguese letters intact', () => {
  const set = shingles('A sessão começa às sete na Praça do Comércio');
  assert.ok(set.has('a sessão começa às'));
  assert.ok(set.has('na praça do comércio'));
});

test('a text shorter than one shingle has no shingles', () => {
  assert.equal(shingles('too short').size, 0);
});

test('a page with no overlap is fully unique', () => {
  const report = uniquenessReport(
    [{ id: 'a', text: 'one two three four five six' }],
    [{ id: 'b', text: 'seven eight nine ten eleven twelve' }],
  );
  assert.equal(report[0].vsCorpus, 1);
  assert.equal(report[0].vsNearest, 1);
});

test('a page copied verbatim elsewhere is zero per cent unique', () => {
  const text = 'the hour matters more than the location every single time';
  const report = uniquenessReport([{ id: 'a', text }], [{ id: 'b', text }]);
  assert.equal(report[0].vsCorpus, 0);
  assert.equal(report[0].nearest, 'b');
});

test('half of a page shared with one other page is fifty per cent unique', () => {
  const shared = 'alpha beta gamma delta epsilon';
  const own = 'zeta eta theta iota kappa';
  const report = uniquenessReport(
    [{ id: 'a', text: `${shared} | ${own}` }],
    [{ id: 'b', text: `${shared} | lambda mu nu xi omicron` }],
  );
  // `shared` and `own` contribute two shingles each; the bar stops shingles
  // running across the join, so exactly half of page a is found in page b.
  assert.equal(report[0].vsCorpus, 0.5);
  assert.equal(report[0].vsNearest, 0.5);
});

test('corpus uniqueness counts overlap spread across several pages', () => {
  const report = uniquenessReport(
    [{ id: 'a', text: 'alpha beta gamma delta | epsilon zeta eta theta' }],
    [
      { id: 'b', text: 'alpha beta gamma delta' },
      { id: 'c', text: 'epsilon zeta eta theta' },
    ],
  );
  // Neither page alone holds more than half, but together they hold all of it.
  assert.equal(report[0].vsNearest, 0.5);
  assert.equal(report[0].vsCorpus, 0);
});

test('a page is never compared with itself', () => {
  const page = { id: 'a', text: 'one two three four five six' };
  const report = uniquenessReport([page], [page]);
  assert.equal(report[0].vsCorpus, 1);
});
