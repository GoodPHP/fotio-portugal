/**
 * Downloads the chosen photographs and renders every derivative the site
 * serves. Reads the manifest, spends no search quota.
 *
 *   UNSPLASH_KEY=xxx npx tsx scripts/photos/fetch.ts
 *
 * Two obligations under the Unsplash API terms are met here and were met
 * nowhere in the previous fetcher: `links.download_location` is triggered once
 * per photograph actually used, and the attribution links carry the referral
 * parameters. Both are checked when a production key is reviewed, so this is
 * also what makes the 5,000-an-hour allowance obtainable.
 *
 * Derivatives are AVIF and WebP at the widths each slot renders, with a content
 * hash in the filename. The hash is what lets `_headers` serve /images/* as
 * immutable: a replaced photograph is a different filename, so nothing has to
 * be revalidated and nothing can be stale.
 *
 * Encodes are cached by source hash, width, format and quality. AVIF at 1600px
 * takes a second or two, so a cold run is minutes and a warm one is seconds.
 */
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import sharp from 'sharp';
import type { Manifest, SlotAssignment } from './select';

const KEY = process.env.UNSPLASH_KEY;
const ROOT = process.cwd();
const MANIFEST = join(ROOT, 'public', 'images', 'images.manifest.json');
const OUT = join(ROOT, 'public', 'images');
const SOURCES = join(ROOT, '.cache', 'sources');
const DERIVATIVES = join(ROOT, '.cache', 'derivatives');
const CREDITS = join(OUT, 'credits.json');

/** Wide enough to crop from and to render the largest slot. */
const SOURCE_WIDTH = 2400;
const FORMATS = [
  { ext: 'avif', quality: 50 },
  { ext: 'webp', quality: 72 },
] as const;

/** Social scrapers do not negotiate a <picture>, so OG cards stay JPEG. */
const OG = { width: 1200, height: 630, quality: 82 };

const utm = (url: string): string =>
  `${url}${url.includes('?') ? '&' : '?'}utm_source=fotio&utm_medium=referral`;

async function downloadSource(slot: SlotAssignment): Promise<Buffer> {
  mkdirSync(SOURCES, { recursive: true });
  const cached = join(SOURCES, `${slot.photoId}.jpg`);
  if (existsSync(cached)) return readFileSync(cached);

  // The Unsplash API terms require this endpoint to be hit whenever a
  // photograph is actually used. It is not a download: it registers the use.
  if (KEY) {
    await fetch(slot.downloadLocation, {
      headers: { Authorization: `Client-ID ${KEY}`, 'Accept-Version': 'v1' },
    }).catch(() => undefined);
  }

  const url = `${slot.rawUrl}&w=${SOURCE_WIDTH}&q=85&fm=jpg&fit=max`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} downloading ${slot.photoId}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  writeFileSync(cached, buffer);
  return buffer;
}

function encodeCacheKey(sourceHash: string, width: number, ext: string, quality: number): string {
  return createHash('sha256')
    .update(`${sourceHash}|${width}|${ext}|${quality}`)
    .digest('hex')
    .slice(0, 32);
}

/** Crop to the slot's aspect from the centre of interest, then resize. */
function cropped(buffer: Buffer, aspect: number) {
  return sharp(buffer).resize({
    width: SOURCE_WIDTH,
    height: Math.round(SOURCE_WIDTH / aspect),
    fit: 'cover',
    position: sharp.strategy.attention,
  });
}

interface Rendered {
  /** Published path, with the content hash. */
  path: string;
  width: number;
  format: string;
}

async function renderSlot(key: string, slot: SlotAssignment): Promise<Rendered[]> {
  const source = await downloadSource(slot);
  const sourceHash = createHash('sha256').update(source).digest('hex').slice(0, 16);
  mkdirSync(DERIVATIVES, { recursive: true });

  const out: Rendered[] = [];
  for (const width of slot.widths) {
    for (const { ext, quality } of FORMATS) {
      const cacheFile = join(DERIVATIVES, `${encodeCacheKey(sourceHash, width, ext, quality)}.${ext}`);
      let bytes: Buffer;
      if (existsSync(cacheFile)) {
        bytes = readFileSync(cacheFile);
      } else {
        const pipeline = cropped(source, slot.crop).resize({ width });
        bytes = await (ext === 'avif'
          ? pipeline.avif({ quality })
          : pipeline.webp({ quality })
        ).toBuffer();
        writeFileSync(cacheFile, bytes);
      }
      const hash = createHash('sha256').update(bytes).digest('hex').slice(0, 8);
      const published = `${key}-${width}.${hash}.${ext}`;
      const file = join(OUT, published);
      mkdirSync(dirname(file), { recursive: true });
      writeFileSync(file, bytes);
      out.push({ path: `/images/${published}`, width, format: `image/${ext}` });
    }
  }

  // One JPEG share card per city and per service, from the same source.
  if (key.startsWith('cities/') || key.startsWith('services/')) {
    const bytes = await sharp(source)
      .resize({ width: OG.width, height: OG.height, fit: 'cover', position: sharp.strategy.attention })
      .jpeg({ quality: OG.quality })
      .toBuffer();
    const file = join(OUT, `${key}-og.jpg`);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, bytes);
  }

  return out;
}

async function main(): Promise<void> {
  if (!existsSync(MANIFEST)) {
    console.error('No manifest. Run `npm run photos:search` then `npm run photos:select` first.');
    process.exit(2);
  }
  const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8')) as Manifest;
  const entries = Object.entries(manifest.slots);
  if (entries.length === 0) {
    console.error('The manifest is empty. Run `npm run photos:select` first.');
    process.exit(2);
  }

  const credits: Record<string, unknown> = {};
  const rendered: Record<string, Rendered[]> = {};
  let done = 0;

  for (const [key, slot] of entries) {
    rendered[key] = await renderSlot(key, slot);
    credits[key] = {
      id: slot.photoId,
      description: slot.description,
      photographer: slot.photographer,
      photographerUrl: utm(`https://unsplash.com/@${slot.username}`),
      source: utm(slot.htmlLink),
      licence: 'Unsplash License',
    };
    done += 1;
    if (done % 10 === 0) process.stdout.write(`  ${done}/${entries.length}\n`);
  }

  writeFileSync(
    CREDITS,
    `${JSON.stringify(
      {
        _note:
          'Derived from images.manifest.json by scripts/photos/fetch.ts. Every file under ' +
          'public/images/ has an entry here, and every entry is surfaced on /legal/photo-credits. ' +
          'Attribution links carry the referral parameters the Unsplash licence asks for.',
        photos: credits,
      },
      null,
      2,
    )}\n`,
  );

  console.log(`[photos:fetch] ${entries.length} slots rendered, credits.json written.`);
  console.log('Now run `npx tsx scripts/generate-public-images.ts` to regenerate the manifest module.');
}

main().catch((error) => {
  console.error('[photos:fetch]', error instanceof Error ? error.message : error);
  process.exit(1);
});
