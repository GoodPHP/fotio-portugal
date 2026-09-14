/**
 * Per-city visual themes.
 *
 * A city can look like itself without the site looking like several sites. The
 * mechanism is a scoped CSS-variable override: every brand utility in the
 * codebase resolves through `var(--color-brand-*)`, so redefining those inside
 * `[data-city-theme='...']` restyles everything underneath without touching a
 * single component.
 *
 * The palettes live in `src/app/globals.css`, not here — one source, and
 * `theme.test.ts` parses that file to assert every theme meets WCAG AA. This
 * module only carries the identity and what a human needs to know about it.
 */
export const CITY_THEMES = {
  lisboa: {
    name: 'Azulejo',
    description:
      'Lime-washed render, glazed tile blue and the ochre the afternoon sun puts on a south-west facade.',
  },
} as const;

export type CityThemeId = keyof typeof CITY_THEMES;

export function isCityThemeId(value: string): value is CityThemeId {
  return value in CITY_THEMES;
}
