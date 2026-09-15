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
import { SITE_NAME } from '../../src/lib/site';
import { colourSpread, loadSpreads, saveSpreads } from './monochrome';

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

/*
 * Unsplash requires the referral parameters on every attribution link, and the
 * source is the application name — so it is the brand, and it is derived from
 * `SITE_NAME` rather than typed. It was typed, in lower case, which is how it
 * survived `check-brand`: that gate's pattern was case-sensitive, so a rename
 * would have left every photographer credit on the site pointing at the old
 * brand's referral. The gate is case-insensitive now too.
 */
const UTM_SOURCE = SITE_NAME.toLowerCase();

const utm = (url: string): string =>
  `${url}${url.includes('?') ? '&' : '?'}utm_source=${UTM_SOURCE}&utm_medium=referral`;

/**
 * `fetch` with a short backoff.
 *
 * Downloading nearly two hundred photographs over a domestic connection means
 * a transient failure is close to certain, and the first version of this script
 * died on one — losing the work of every image before it. Three attempts and a
 * widening pause turns that into a pause.
 */
async function fetchWithRetry(url: string, init?: RequestInit, attempts = 3): Promise<Response> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, init);
      if (response.ok) return response;
      // 4xx other than 429 will not become ok by waiting.
      if (response.status < 500 && response.status !== 429) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      lastError = new Error(`${response.status} ${response.statusText}`);
    } catch (error) {
      lastError = error;
    }
    if (attempt < attempts) {
      await new Promise((resolve) => setTimeout(resolve, attempt * 1500));
    }
  }
  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}

async function downloadSource(slot: SlotAssignment): Promise<Buffer> {
  mkdirSync(SOURCES, { recursive: true });
  const cached = join(SOURCES, `${slot.photoId}.jpg`);
  if (existsSync(cached)) return readFileSync(cached);

  const url = `${slot.rawUrl}&w=${SOURCE_WIDTH}&q=85&fm=jpg&fit=max`;
  const response = await fetchWithRetry(url);
  const buffer = Buffer.from(await response.arrayBuffer());
  writeFileSync(cached, buffer);
  return buffer;
}

/* ---------------------------------------------------------------------------
 * Registering a download with Unsplash.
 *
 * The API terms require `links.download_location` to be hit whenever a
 * photograph is actually used, and a production key is not granted without it.
 *
 * This used to live inside `downloadSource`, fired only when the source was not
 * already cached, and swallowed every error with `.catch(() => undefined)`.
 * Both halves of that were wrong in the same direction. The trigger shares the
 * hourly allowance with the search — 50 requests on a demo key against nearly
 * two hundred photographs — so most of them failed; and because the source was
 * cached by then, no later run would ever retry. A compliance obligation was
 * being missed silently and permanently.
 *
 * So the registrations are a ledger instead. What has been registered is
 * recorded, the run reports what is still outstanding, and re-running picks up
 * the rest once the allowance resets — which is the same shape as the search
 * command, for the same reason.
 * ------------------------------------------------------------------------- */

const TRIGGERS = join(ROOT, '.cache', 'unsplash-downloads.json');

function loadTriggers(): Record<string, string> {
  if (!existsSync(TRIGGERS)) return {};
  try {
    return JSON.parse(readFileSync(TRIGGERS, 'utf8')) as Record<string, string>;
  } catch {
    return {};
  }
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

/**
 * Writes the module the pages read.
 *
 * Generated here rather than discovered by walking `public/`, because this is
 * the only place that knows the intrinsic size of each crop, and because
 * `readdirSync` works during a prerender and silently answers "nothing" on a
 * Worker — which is how galleries used to come back empty on exactly the pages
 * Next chose not to prerender.
 */
function writeImageManifest(manifest: Manifest, rendered: Record<string, Rendered[]>): void {
  const slots: Record<string, unknown> = {};

  for (const [key, files] of Object.entries(rendered)) {
    const slot = manifest.slots[key];
    const avif = files.filter((f) => f.format === 'image/avif').sort((a, b) => a.width - b.width);
    const webp = files.filter((f) => f.format === 'image/webp').sort((a, b) => a.width - b.width);
    const widest = Math.max(...files.map((f) => f.width));
    const ogPath = `/images/${key}-og.jpg`;

    slots[key] = {
      width: widest,
      height: Math.round(widest / slot.crop),
      color: slot.color,
      avif: avif.map(({ path, width }) => ({ path, width })),
      webp: webp.map(({ path, width }) => ({ path, width })),
      ...(key.startsWith('cities/') || key.startsWith('services/') ? { og: ogPath } : {}),
    };
  }

  const file = join(ROOT, 'src', 'lib', 'data', 'image-manifest.ts');
  const header = readFileSync(file, 'utf8').split('export const IMAGE_SLOTS')[0];
  writeFileSync(
    file,
    `${header}export const IMAGE_SLOTS: Readonly<Record<string, ImageSlot>> = ${JSON.stringify(
      slots,
      null,
      2,
    )};\n`,
  );
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
  // Measured once per photograph and kept, so `select.ts` can avoid greyscale
  // without ever opening an image itself. See scripts/photos/monochrome.ts.
  const spreads = loadSpreads();
  const failed: { key: string; reason: string }[] = [];
  const triggers = loadTriggers();
  let registered = 0;
  let pending = 0;
  // Once the allowance is gone every further call is a wasted round trip, so
  // the first refusal stops the rest of them for this run.
  let allowanceSpent = false;
  let done = 0;

  for (const [key, slot] of entries) {
    try {
      rendered[key] = await renderSlot(key, slot);
    } catch (error) {
      // One unreachable photograph is not a reason to discard the other 191.
      // The slot simply stays out of the manifest and renders as a placeholder.
      failed.push({ key, reason: error instanceof Error ? error.message : String(error) });
      continue;
    }

    // The photograph is now genuinely in use, which is the moment the terms
    // describe. A photograph in two slots is still one registration.
    if (KEY && !triggers[slot.photoId]) {
      if (allowanceSpent) {
        pending += 1;
      } else {
        try {
          const response = await fetch(slot.downloadLocation, {
            headers: { Authorization: `Client-ID ${KEY}`, 'Accept-Version': 'v1' },
          });
          if (response.ok) {
            triggers[slot.photoId] = new Date().toISOString();
            registered += 1;
          } else {
            if (response.status === 403) allowanceSpent = true;
            pending += 1;
          }
        } catch {
          pending += 1;
        }
      }
    }
    if (spreads[slot.photoId] === undefined) {
      const source = join(SOURCES, `${slot.photoId}.jpg`);
      if (existsSync(source)) {
        spreads[slot.photoId] = Math.round((await colourSpread(source)) * 10) / 10;
      }
    }

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

  saveSpreads(spreads);

  mkdirSync(dirname(TRIGGERS), { recursive: true });
  writeFileSync(TRIGGERS, `${JSON.stringify(triggers, null, 2)}\n`);

  writeImageManifest(manifest, rendered);

  if (!KEY) {
    console.warn(
      '[photos:fetch] no UNSPLASH_KEY, so no download was registered with Unsplash.' +
        ' Re-run with the key set before shipping these photographs.',
    );
  } else if (pending > 0) {
    console.warn(
      `[photos:fetch] ${registered} download(s) registered with Unsplash, ${pending} still` +
        ' outstanding — the hourly allowance ran out. Re-run this command in an hour;' +
        ' it resumes from the ledger and re-renders nothing.',
    );
  } else if (registered > 0) {
    console.log(`[photos:fetch] ${registered} download(s) registered with Unsplash.`);
  }

  console.log(
    `[photos:fetch] ${Object.keys(rendered).length}/${entries.length} slots rendered,` +
      ' credits.json and src/lib/data/image-manifest.ts written.',
  );
  if (failed.length > 0) {
    console.log(`\n${failed.length} could not be downloaded — re-run to retry just these:`);
    for (const { key, reason } of failed) console.log(`  ${key}: ${reason}`);
  }
}

main().catch((error) => {
  console.error('[photos:fetch]', error instanceof Error ? error.message : error);
  process.exit(1);
});
