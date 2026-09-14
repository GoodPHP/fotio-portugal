/**
 * Chooses one photograph per slot. Pure: reads the cache, writes the manifest,
 * spends no API quota.
 *
 *   npx tsx scripts/photos/select.ts [--refresh <slot key>…]
 *
 * This is the file that decides whether the site looks like every other site.
 * The previous fetcher took `results[0]` of a single relevance-ordered search,
 * which is by construction the most-downloaded photograph for that query — the
 * same one everybody else took. The scoring below penalises popularity
 * explicitly, and the global assignment map makes a photograph usable exactly
 * once across the whole site.
 *
 * The result is committed. That is what makes selection reproducible: the
 * *choice* is data in the repository, not a side effect of whatever happened to
 * be in a cache directory.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { readCached, type UnsplashPhoto } from './cache';
import { allSlots, type Slot } from './targets';

const MANIFEST = join(process.cwd(), 'public', 'images', 'images.manifest.json');
const ORDERINGS = ['relevant', 'latest'] as const;
/** A gallery that is one person's portfolio reads as scraped. */
const MAX_PER_PHOTOGRAPHER_PER_GROUP = 2;

export interface SlotAssignment {
  photoId: string;
  photographer: string;
  username: string;
  htmlLink: string;
  downloadLocation: string;
  rawUrl: string;
  width: number;
  height: number;
  color: string | null;
  blurHash: string | null;
  description: string;
  crop: number;
  widths: number[];
  score: number;
  chosenAt: string;
}

export interface Manifest {
  version: number;
  slots: Record<string, SlotAssignment>;
}

function loadManifest(): Manifest {
  if (!existsSync(MANIFEST)) return { version: 2, slots: {} };
  return JSON.parse(readFileSync(MANIFEST, 'utf8')) as Manifest;
}

/** Candidates for a slot, across both orderings of each of its queries. */
function candidates(slot: Slot): { photo: UnsplashPhoto; rank: number }[] {
  const orientation = slot.crop < 1 ? 'portrait' : 'landscape';
  const out: { photo: UnsplashPhoto; rank: number }[] = [];
  const seen = new Set<string>();
  for (const query of slot.queries) {
    for (const orderBy of ORDERINGS) {
      const cached = readCached(query, orientation, orderBy);
      if (!cached) continue;
      cached.results.forEach((photo, index) => {
        if (seen.has(photo.id)) return;
        seen.add(photo.id);
        out.push({ photo, rank: index + 1 });
      });
    }
  }
  return out;
}

/** How close the source is to what the slot needs, 0 to 1. */
function aspectFit(photo: UnsplashPhoto, slot: Slot): number {
  if (!photo.width || !photo.height) return 0;
  const aspect = photo.width / photo.height;
  if (aspect < slot.minAspect) return 0;
  // Cropping away more than a third of the frame usually loses the subject.
  const waste = Math.abs(aspect - slot.crop) / slot.crop;
  return Math.max(0, 1 - waste);
}

function recency(photo: UnsplashPhoto): number {
  const age = Date.now() - Date.parse(photo.created_at);
  const years = age / (365 * 24 * 60 * 60 * 1000);
  return Math.max(0, 1 - years / 8);
}

/**
 * The anti-ubiquity term is the whole point.
 *
 * A tram photograph with twelve thousand likes is the one on every competitor's
 * homepage. Subtracting log10(likes) lets a well-composed photograph with a
 * hundred and eighty beat it, which is the difference between a site that looks
 * researched and one that looks scraped.
 */
function score(photo: UnsplashPhoto, rank: number, slot: Slot, authorUses: number): number {
  return (
    1.0 * (1 / rank) +
    0.6 * aspectFit(photo, slot) +
    0.4 * recency(photo) -
    0.8 * Math.log10(1 + photo.likes) -
    1.5 * (authorUses >= MAX_PER_PHOTOGRAPHER_PER_GROUP ? 1 : 0)
  );
}

function main(): void {
  const refresh = new Set(
    process.argv.includes('--refresh')
      ? process.argv.slice(process.argv.indexOf('--refresh') + 1)
      : [],
  );

  const manifest = loadManifest();
  const slots = allSlots();

  // A photograph may be used exactly once on the site. Seeded from whatever is
  // already assigned, so an incremental run cannot reuse a committed choice.
  const assigned = new Map<string, string>();
  for (const [key, value] of Object.entries(manifest.slots)) {
    if (!refresh.has(key)) assigned.set(value.photoId, key);
  }

  const authorsByGroup = new Map<string, Map<string, number>>();
  const bump = (group: string, username: string): number => {
    const counts = authorsByGroup.get(group) ?? new Map<string, number>();
    const used = counts.get(username) ?? 0;
    counts.set(username, used + 1);
    authorsByGroup.set(group, counts);
    return used;
  };

  let chosen = 0;
  let kept = 0;
  const empty: string[] = [];

  for (const slot of slots) {
    if (manifest.slots[slot.key] && !refresh.has(slot.key)) {
      kept += 1;
      continue;
    }

    let best: { photo: UnsplashPhoto; value: number } | null = null;
    for (const { photo, rank } of candidates(slot)) {
      if (assigned.has(photo.id)) continue;
      if (aspectFit(photo, slot) === 0) continue;
      const counts = authorsByGroup.get(slot.group);
      const authorUses = counts?.get(photo.user.username) ?? 0;
      const value = score(photo, rank, slot, authorUses);
      if (!best || value > best.value) best = { photo, value };
    }

    if (!best) {
      empty.push(slot.key);
      continue;
    }

    const { photo, value } = best;
    assigned.set(photo.id, slot.key);
    bump(slot.group, photo.user.username);
    manifest.slots[slot.key] = {
      photoId: photo.id,
      photographer: photo.user.name,
      username: photo.user.username,
      htmlLink: photo.links.html,
      downloadLocation: photo.links.download_location,
      rawUrl: photo.urls.raw,
      width: photo.width,
      height: photo.height,
      color: photo.color,
      blurHash: photo.blur_hash,
      description: photo.alt_description ?? photo.description ?? '',
      crop: slot.crop,
      widths: slot.widths,
      score: Math.round(value * 1000) / 1000,
      chosenAt: new Date().toISOString(),
    };
    chosen += 1;
  }

  writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);

  const ids = new Set(Object.values(manifest.slots).map((s) => s.photoId));
  console.log(
    `[photos:select] ${chosen} chosen, ${kept} kept, ${empty.length} with no candidate.` +
      ` ${Object.keys(manifest.slots).length} slots filled by ${ids.size} distinct photographs.`,
  );
  if (ids.size !== Object.keys(manifest.slots).length) {
    console.error('[photos:select] a photograph is assigned to more than one slot');
    process.exit(1);
  }
  if (empty.length > 0) {
    console.log('\nNo candidate cached for:');
    for (const key of empty.slice(0, 20)) console.log(`  ${key}`);
    if (empty.length > 20) console.log(`  … and ${empty.length - 20} more`);
    console.log('\nRun `npm run photos:search` until it reports complete, then re-run this.');
  }
}

main();
