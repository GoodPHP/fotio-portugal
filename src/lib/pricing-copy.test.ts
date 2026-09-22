import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { SERVICES } from './catalog';
import { SERVICE_SEO } from './data/service-seo';
import { SERVICE_LANDING } from './data/service-landing';

/**
 * Authored copy must not contradict the catalogue.
 *
 * The prices were raised to a €200 base package — thirty minutes, fifteen to
 * twenty edited photos — and the catalogue changed in one commit, but the
 * prose around each service states prices, lengths and photo counts in
 * hundreds of places, in two languages. This walks every string of every
 * base-package service and fails on a price or a photo count that is not the
 * catalogue's.
 */

const strings = (value: unknown): string[] => {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings);
  return [];
};

const PRICE = /€\s?(\d[\d.,]*)|(\d[\d\s.]*)\s?€/g;
const PHOTOS = /\b(\d+)\s+(?:retouched|edited)\s+(?:photo|photograph|image|frame)s?|\b(\d+)\s+(?:fotografias|imagens)\s+(?:retocadas|editadas)/gi;

for (const service of SERVICES.filter((s) => s.editedPhotosMax)) {
  describe(`${service.slug} copy`, () => {
    const text = [
      ...strings(SERVICE_SEO[service.slug]),
      ...strings(SERVICE_LANDING[service.slug]),
      ...strings(service.description),
      ...strings(service.deliverables),
      ...strings(service.faqs),
    ];

    test(`every price is ${service.initialPrice}`, () => {
      for (const line of text) {
        for (const m of line.matchAll(PRICE)) {
          const amount = Number((m[1] ?? m[2]).replace(/[^\d]/g, ''));
          assert.equal(amount, service.initialPrice, `"${m[0]}" in: ${line}`);
        }
      }
    });

    test(`every photo count is within ${service.editedPhotos}–${service.editedPhotosMax}`, () => {
      for (const line of text) {
        for (const m of line.matchAll(PHOTOS)) {
          const n = Number(m[1] ?? m[2]);
          assert.ok(
            n >= service.editedPhotos && n <= (service.editedPhotosMax ?? n),
            `"${m[0]}" in: ${line}`,
          );
        }
      }
    });
  });
}
