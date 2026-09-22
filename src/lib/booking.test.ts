import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { bookingOptions, OTHER } from './booking-options';
import { LeadSchema } from './lead-schema';
import { CITIES, servicesFor } from './catalog';
import { LOCALES } from './locales';

describe('bookingOptions', () => {
  for (const locale of LOCALES) {
    test(`${locale}: offers every place and exactly this language's sessions`, () => {
      const options = bookingOptions(locale);
      assert.equal(options.places.length, CITIES.length);
      assert.deepEqual(
        options.sessions.map((s) => s.slug).sort(),
        servicesFor(locale).map((s) => s.slug).sort(),
      );
    });
  }

  test('most-asked first: Lisbon leads the places, couples the sessions', () => {
    const options = bookingOptions('en');
    assert.equal(options.places[0].slug, 'lisboa');
    assert.equal(options.sessions[0].slug, 'couple');
    assert.equal(options.places[0].name, 'Lisbon');
  });

  test('a session missing from a language is skipped, not listed dead', () => {
    assert.ok(!bookingOptions('pt').sessions.some((s) => s.slug === 'honeymoon'));
  });
});

describe('LeadSchema', () => {
  const base = {
    name: 'Ana Costa',
    email: 'ana@example.com',
    phone: '+351 912 345 678',
    locale: 'en',
  };

  test('accepts the booking flow payload', () => {
    const parsed = LeadSchema.safeParse({
      ...base,
      citySlug: 'lisboa',
      serviceSlug: 'couple',
      date: '2026-10-12',
      flexibleDates: true,
      groupSize: '2',
      preferences: { location: 'Alfama', time: 'Sunset / golden hour' },
      reference: 'LZ-ABC12',
      source: 'booking',
    });
    assert.ok(parsed.success, JSON.stringify(parsed.error?.issues));
  });

  test('accepts "other" for place and session', () => {
    const parsed = LeadSchema.safeParse({ ...base, citySlug: OTHER, serviceSlug: OTHER, source: 'quick-match' });
    assert.ok(parsed.success);
  });

  test('accepts a contact message naming neither place nor session', () => {
    assert.ok(LeadSchema.safeParse({ ...base, source: 'contact', remarks: 'A question' }).success);
  });

  test('rejects an unknown place, an unknown group size and an overlong preference', () => {
    assert.ok(!LeadSchema.safeParse({ ...base, citySlug: 'paris' }).success);
    assert.ok(!LeadSchema.safeParse({ ...base, groupSize: '400' }).success);
    assert.ok(!LeadSchema.safeParse({ ...base, preferences: { location: 'x'.repeat(201) } }).success);
  });

  test('accepts a Portuguese service slug', () => {
    assert.ok(LeadSchema.safeParse({ ...base, serviceSlug: 'casamento', locale: 'pt' }).success);
  });
});
