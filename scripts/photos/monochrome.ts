/**
 * How colourful a photograph actually is, measured from its pixels.
 *
 * The design system gives the photographs the only colour on the page —
 * everything else is bone, ink and one cobalt — so a greyscale stock photograph
 * does not read as a stylistic choice there, it reads as a broken image. Eight
 * of the first hundred and ninety-two selections were fully greyscale,
 * including two service cards.
 *
 * Nothing in the search response says so. Unsplash returns a `color` field, but
 * it is a placeholder swatch rather than a measurement: the Lisbon hero, which
 * is a wall of red roofs, is reported as `#a6a6a6` — exactly the value the
 * greyscale photograph next to it carries. The only reliable signal is the
 * image, and by the time `fetch.ts` runs it is on disk anyway.
 *
 * So the measurement lives here, `fetch.ts` records it for every source it has,
 * and `select.ts` reads the record and penalises what it finds. That keeps
 * `select.ts` pure — it still reads only files, never pixels or the network —
 * while giving it the one fact the search API cannot provide.
 *
 * One consequence is worth knowing before it surprises you: the loop converges
 * rather than resolving in a single pass. A photograph is measured only once it
 * has been downloaded, so a freshly chosen one carries no measurement and
 * cannot be penalised — a refresh can replace a greyscale pick with another
 * greyscale pick, which the *next* pass then knows about. Run select and fetch
 * until a pass changes nothing; in practice that has been two.
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

export const MONOCHROME_MAP = join(process.cwd(), '.cache', 'monochrome.json');

/**
 * Mean per-pixel spread between the strongest and weakest RGB channel.
 *
 * Zero for a truly greyscale image and tens for a colourful one, with no
 * colour-space conversion to get wrong. An LCH chroma mean was tried first and
 * ranked the known greyscale photograph mid-table, which is how this ended up
 * being the blunt version.
 */
export async function colourSpread(file: string): Promise<number> {
  const { data, info } = await sharp(file)
    .resize(80, 80, { fit: 'fill' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let total = 0;
  const pixels = info.width * info.height;
  for (let i = 0; i < pixels; i += 1) {
    const r = data[i * 3];
    const g = data[i * 3 + 1];
    const b = data[i * 3 + 2];
    total += Math.max(r, g, b) - Math.min(r, g, b);
  }
  return total / pixels;
}

/**
 * Below this a photograph is treated as monochrome.
 *
 * Measured rather than guessed: every greyscale photograph in the manifest
 * scores exactly 0.0, and the least colourful genuine photograph scores 4.9.
 * Three sits in the gap with room on both sides.
 */
export const MONOCHROME_BELOW = 3;

export function loadSpreads(): Record<string, number> {
  if (!existsSync(MONOCHROME_MAP)) return {};
  try {
    return JSON.parse(readFileSync(MONOCHROME_MAP, 'utf8')) as Record<string, number>;
  } catch {
    return {};
  }
}

export function saveSpreads(spreads: Record<string, number>): void {
  mkdirSync(dirname(MONOCHROME_MAP), { recursive: true });
  writeFileSync(MONOCHROME_MAP, `${JSON.stringify(spreads, null, 2)}\n`);
}
