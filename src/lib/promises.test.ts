import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { SERVICES, CITIES, servicesFor, trustStats } from './catalog';
import { LOCALES, tx } from './locales';
import { formatDelivery, whatsappBookingMessage } from './site';
import { trackAttrs, isAnalyticsEvent } from './analytics';
import { SEO_PROSE as HOME_PROSE } from '../app/[locale]/content';
import { SEO_PROSE as ABOUT_PROSE } from '../app/[locale]/about/content';
import { SEO_PROSE as SERVICES_PROSE } from '../app/[locale]/services/content';

describe('deliveryHours', () => {
  /*
   * The structured value restates the delivery line in `deliverables`. If
   * someone edits one and not the other, the card and the service page would
   * promise different turnarounds — which is the bug this field was added to
   * end.
   */
  const phrase = (hours: number | readonly [number, number]): RegExp => {
    if (typeof hours !== 'number') return new RegExp(`${hours[0]}(–| to )${hours[1]} hours`);
    if (hours === 168) return /within a week|one week/;
    if (hours === 336) return /two weeks/;
    if (hours === 504) return /three weeks/;
    return new RegExp(`${hours} hours`);
  };

  for (const service of SERVICES) {
    test(`${service.slug}: matches its deliverables`, () => {
      const lines = [...service.deliverables.en, ...(service.deliverables.pt ?? [])].join(' | ');
      // English deliverables are authoritative; PT-only services state it in PT.
      const pattern = phrase(service.deliveryHours);
      const ptPattern = new RegExp(
        pattern.source
          .replace('hours', 'horas')
          .replace('(–| to )', '(–| a )')
          .replace('within a week|one week', 'uma semana')
          .replace('two weeks', 'duas semanas')
          .replace('three weeks', 'três semanas'),
      );
      assert.ok(
        pattern.test(lines) || ptPattern.test(lines),
        `deliveryHours ${JSON.stringify(service.deliveryHours)} not stated in: ${lines}`,
      );
    });
  }
});

describe('formatDelivery', () => {
  test('ranges, hours and weeks', () => {
    assert.equal(formatDelivery([48, 72], 'en'), '48–72h');
    assert.equal(formatDelivery(24, 'en'), '24h');
    assert.equal(formatDelivery(504, 'en'), '3 weeks');
    assert.equal(formatDelivery(168, 'pt'), '1 semana');
  });
});

describe('trustStats', () => {
  test('counts come from the catalogue, per language', () => {
    for (const locale of LOCALES) {
      assert.deepEqual(trustStats(locale), {
        places: CITIES.length,
        sessionTypes: servicesFor(locale).length,
      });
    }
  });

  /*
   * These fact boxes are authored strings, not computed ones, so they can go
   * stale. They said "22" for a year while each language linked to 18.
   */
  for (const [name, prose] of [
    ['home', HOME_PROSE],
    ['about', ABOUT_PROSE],
    ['services', SERVICES_PROSE],
  ] as const) {
    test(`${name} fact boxes state the real session-type count`, () => {
      for (const locale of LOCALES) {
        const fact = tx(prose.facts, locale).find((f) => /session types|tipos de sessão/i.test(f.label));
        if (fact) assert.equal(fact.value, String(servicesFor(locale).length));
      }
    });
  }
});

describe('whatsappBookingMessage', () => {
  test('keeps every labelled line, filled or blank', () => {
    const msg = whatsappBookingMessage({ where: 'Lisbon', session: 'Couple' }, 'en');
    assert.match(msg, /I'd like to book a photography session in Portugal\./);
    assert.match(msg, /\nWhere: Lisbon\n/);
    assert.match(msg, /\nSession: Couple\n/);
    assert.match(msg, /\nDate:\n/);
    assert.match(msg, /\nNumber of people:$/);
  });

  test('speaks Portuguese to a Portuguese reader and carries the reference', () => {
    const msg = whatsappBookingMessage({ where: 'Porto', people: '2', reference: 'LZ-ABC' }, 'pt');
    assert.match(msg, /^Olá .+\[LZ-ABC\]/);
    assert.match(msg, /\nOnde: Porto\n/);
    assert.match(msg, /\nNúmero de pessoas: 2$/);
  });
});

describe('analytics', () => {
  test('trackAttrs drops undefined properties', () => {
    assert.deepEqual(trackAttrs('whatsapp_clicked', { context: 'hero', city: undefined }), {
      'data-track': 'whatsapp_clicked',
      'data-track-context': 'hero',
    });
  });

  test('only declared events are accepted', () => {
    assert.ok(isAnalyticsEvent('booking_completed'));
    assert.ok(!isAnalyticsEvent('book_now'));
  });
});
