import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { CITY_THEMES, isCityThemeId, type CityThemeId } from './theme';
import { CITIES } from './catalog';

const CSS = readFileSync(join(process.cwd(), 'src/app/globals.css'), 'utf8');

/** Relative luminance, per WCAG 2.1. */
function luminance(hex: string): number {
  const h = hex.replace('#', '');
  const channel = (pair: string) => {
    const v = parseInt(pair, 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(h.slice(0, 2)) + 0.7152 * channel(h.slice(2, 4)) + 0.0722 * channel(h.slice(4, 6));
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** Pull the custom properties out of one CSS block. */
function tokensOf(selector: string): Record<string, string> {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const block = CSS.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`));
  assert.ok(block, `no CSS block for ${selector}`);
  const out: Record<string, string> = {};
  for (const m of block[1].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) out[m[1]] = m[2].trim();
  return out;
}

const BASE = tokensOf('@theme');

/** A theme inherits every token it does not redefine. */
function resolved(theme: CityThemeId): Record<string, string> {
  return { ...BASE, ...tokensOf(`[data-city-theme='${theme}']`) };
}

const AA = 4.5;

describe('the default palette', () => {
  const t = BASE;
  test('body text on the page background', () => {
    assert.ok(contrast(t['--color-brand-dark'], t['--color-brand-sand']) >= AA);
  });
  test('accent text on the page background and on white', () => {
    assert.ok(contrast(t['--color-brand-orange-deep'], t['--color-brand-sand']) >= AA);
    assert.ok(contrast(t['--color-brand-orange-deep'], '#ffffff') >= AA);
  });
  test('secondary text stays readable on both grounds', () => {
    assert.ok(contrast(t['--color-brand-muted'], t['--color-brand-sand']) >= AA);
    assert.ok(contrast(t['--color-brand-muted'], t['--color-brand-cream']) >= AA);
  });
  test('white on the accent and on the dark surface', () => {
    assert.ok(contrast('#ffffff', t['--color-brand-orange-deep']) >= AA);
    assert.ok(contrast('#ffffff', t['--color-brand-dark']) >= AA);
  });
  test('dark text on the cream surface', () => {
    assert.ok(contrast(t['--color-brand-dark'], t['--color-brand-cream']) >= AA);
  });
});

describe('every city theme', () => {
  for (const id of Object.keys(CITY_THEMES) as CityThemeId[]) {
    describe(id, () => {
      const t = resolved(id);

      // These are the six pairings the components actually put on screen.
      const pairs: Array<[string, string, string]> = [
        ['body text on background', t['--color-brand-dark'], t['--color-brand-sand']],
        ['secondary text on background', t['--color-brand-muted'], t['--color-brand-sand']],
        ['secondary text on cream band', t['--color-brand-muted'], t['--color-brand-cream']],
        ['accent text on background', t['--color-brand-orange-deep'], t['--color-brand-sand']],
        ['accent text on cream band', t['--color-brand-orange-deep'], t['--color-brand-cream']],
        ['accent text on white card', t['--color-brand-orange-deep'], '#ffffff'],
        ['white on accent surface', '#ffffff', t['--color-brand-orange-deep']],
        ['white on dark surface', '#ffffff', t['--color-brand-dark']],
        ['dark text on cream surface', t['--color-brand-dark'], t['--color-brand-cream']],
      ];

      for (const [label, fg, bg] of pairs) {
        test(`${label} meets AA`, () => {
          const ratio = contrast(fg, bg);
          assert.ok(ratio >= AA, `${label}: ${fg} on ${bg} is ${ratio.toFixed(2)}:1, needs ${AA}`);
        });
      }

      test('defines a CSS block', () => {
        assert.ok(CSS.includes(`[data-city-theme='${id}']`));
      });
    });
  }
});

describe('dark surfaces', () => {
  // The footer and the dark panels invert these tokens, because the values
  // tuned for paper fall to 3.7:1 and 2.7:1 on ink. This is the regression that
  // a colour sweep across the codebase introduces without anyone seeing it.
  const dark = { ...BASE, ...tokensOf("[data-surface='dark'],\n.bento-card-dark") };
  // Derived from the registry rather than named here: a theme added or renamed
  // must be covered without anyone remembering to add it to this list, which is
  // exactly what a hardcoded 'paris' failed to do.
  const grounds: Array<[string, string]> = [
    ['house ink', BASE['--color-brand-dark']],
    ...(Object.keys(CITY_THEMES) as CityThemeId[]).map(
      (id): [string, string] => [`${id} ink`, resolved(id)['--color-brand-dark']],
    ),
  ];

  for (const [name, ground] of grounds) {
    test(`secondary text on ${name}`, () => {
      const ratio = contrast(dark['--color-brand-muted'], ground);
      assert.ok(ratio >= AA, `muted on ${name} is ${ratio.toFixed(2)}:1`);
    });
    test(`accent text on ${name}`, () => {
      const ratio = contrast(dark['--color-brand-orange-deep'], ground);
      assert.ok(ratio >= AA, `accent on ${name} is ${ratio.toFixed(2)}:1`);
    });
    test(`body text on ${name}`, () => {
      assert.ok(contrast('#ffffff', ground) >= AA);
    });
  }
});

describe('theme wiring', () => {
  test('every theme a city references exists', () => {
    for (const city of CITIES) {
      if (!city.theme) continue;
      assert.ok(isCityThemeId(city.theme), `city "${city.slug}" references unknown theme "${city.theme}"`);
    }
  });

  test('every declared theme is used by at least one city', () => {
    for (const id of Object.keys(CITY_THEMES)) {
      assert.ok(
        CITIES.some((c) => c.theme === id),
        `theme "${id}" is declared but no city uses it`,
      );
    }
  });
});
