import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { parseContact } from './contact-input';

describe('parseContact', () => {
  test('reads an email', () => {
    assert.deepEqual(parseContact('  ana@example.com '), { email: 'ana@example.com' });
  });

  test('reads an international phone number', () => {
    assert.deepEqual(parseContact('+351 912 345 678'), { phone: '+351 912 345 678' });
    assert.deepEqual(parseContact('(912) 345-678'), { phone: '(912) 345-678' });
  });

  test('rejects text that is neither', () => {
    assert.equal(parseContact(''), null);
    assert.equal(parseContact('ana'), null);
    assert.equal(parseContact('ana@example'), null);
    assert.equal(parseContact('12345'), null);
    assert.equal(parseContact('call me 912345678'), null);
  });
});
