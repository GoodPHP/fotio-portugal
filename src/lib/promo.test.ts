import { test } from 'node:test';
import assert from 'node:assert/strict';
import { HOLIDAY_PRICE_FACTOR, bannerShowsOn, holidayPrice, isWithin, leadPromoId, parseOccasion } from './promo';
import { giftCardOptions } from './gift-card';
import { getServiceById } from './catalog';
import { localizedPath } from './urls';

const at = (iso: string) => new Date(iso);

test('the banner runs 20 Nov – 1 Jan, Lisbon time', () => {
  assert.equal(isWithin('banner', at('2026-11-19T23:59:59Z')), false);
  assert.equal(isWithin('banner', at('2026-11-20T00:00:00Z')), true);
  assert.equal(isWithin('banner', at('2027-01-01T23:59:59Z')), true);
  assert.equal(isWithin('banner', at('2027-01-02T00:00:00Z')), false);
});

test('the gift link and home block end on 24 Dec', () => {
  assert.equal(isWithin('gift', at('2026-12-24T23:00:00Z')), true);
  assert.equal(isWithin('gift', at('2026-12-25T00:00:00Z')), false);
});

test('Black Friday is 27 Nov 00:00 – 30 Nov 23:59 only', () => {
  assert.equal(isWithin('blackFriday', at('2026-11-26T23:59:59Z')), false);
  assert.equal(isWithin('blackFriday', at('2026-11-27T00:00:00Z')), true);
  assert.equal(isWithin('blackFriday', at('2026-11-30T23:59:59Z')), true);
  assert.equal(isWithin('blackFriday', at('2026-12-01T00:00:00Z')), false);
});

test('the banner shows on the listed pages only', () => {
  for (const path of ['/', '/pt', '/pt/', '/services/proposal', '/pt/fotografo/pedido-de-casamento', '/pricing', '/pt/precos', '/cities/lisboa', '/pt/cidades/porto']) {
    assert.equal(bannerShowsOn(path), true, path);
  }
  for (const path of ['/cities', '/pt/cidades', '/book', '/services', '/services/wedding', '/gift-card', '/services/christmas-proposal', '/blog/x']) {
    assert.equal(bannerShowsOn(path), false, path);
  }
});

test('the banner list matches the real localized URLs', () => {
  assert.equal(localizedPath('pt', '/pricing'), '/pt/precos');
  assert.equal(localizedPath('pt', '/services/[service]', { service: 'pedido-de-casamento' }), '/pt/fotografo/pedido-de-casamento');
  assert.equal(localizedPath('pt', '/cities/[city]', { city: 'porto' }), '/pt/cidades/porto');
});

test('the new pages have the briefed URLs', () => {
  assert.equal(localizedPath('en', '/services/christmas-proposal'), '/services/christmas-proposal');
  assert.equal(localizedPath('pt', '/services/christmas-proposal'), '/pt/pedido-de-casamento-natal');
  assert.equal(localizedPath('en', '/gift-card'), '/gift-card');
  assert.equal(localizedPath('pt', '/gift-card'), '/pt/vale-presente');
});

test('occasions parse and map to promo ids', () => {
  assert.equal(parseOccasion('christmas'), 'christmas');
  assert.equal(parseOccasion('nope'), null);
  assert.equal(leadPromoId('christmas'), 'xmas26_proposal');
  assert.equal(leadPromoId('gift'), 'giftcard26');
});

test('gift cards are the holiday multiple of the catalogue price', () => {
  assert.equal(HOLIDAY_PRICE_FACTOR, 2);
  for (const option of giftCardOptions('en')) {
    const service = getServiceById(option.type)!;
    assert.equal(option.price, holidayPrice(service.initialPrice));
    assert.equal(option.price, service.initialPrice * 2);
  }
});
