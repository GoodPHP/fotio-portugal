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
import { loadSpreads, MONOCHROME_BELOW } from './monochrome';

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

interface Candidate {
  photo: UnsplashPhoto;
  rank: number;
  ordering: (typeof ORDERINGS)[number];
}

/**
 * Candidates for a slot, across both orderings of each of its queries.
 *
 * `seenState` records why a slot might come up empty, because the three causes
 * need three different answers and the report used to give one:
 *
 *   - a query has not been fetched yet      → run the search again
 *   - every query was fetched and matched   → the query is too narrow; broaden
 *     nothing at all                          it, searching again cannot help
 *   - results exist but none is usable      → they are taken by other slots or
 *                                             the wrong shape; widen the pool
 *
 * The middle case is the one that mattered: two five-word service queries
 * matched zero photographs, and the report sent you back to a search command
 * that would have produced the same nothing forever.
 */
function candidates(slot: Slot, seenState?: { uncached: boolean; results: number }): Candidate[] {
  const orientation = slot.crop < 1 ? 'portrait' : 'landscape';
  const out: Candidate[] = [];
  const seen = new Set<string>();
  for (const query of slot.queries) {
    for (const orderBy of ORDERINGS) {
      const cached = readCached(query, orientation, orderBy);
      if (!cached) {
        if (seenState) seenState.uncached = true;
        continue;
      }
      if (seenState) seenState.results += cached.results.length;
      cached.results.forEach((photo, index) => {
        if (seen.has(photo.id)) return;
        seen.add(photo.id);
        out.push({ photo, rank: index + 1, ordering: orderBy });
      });
    }
  }
  return out;
}

/** Lower-case and strip diacritics, so "Évora" matches "evora". */
function fold(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

/**
 * Evidence that a photograph is actually of the place the slot is about.
 *
 * Unsplash matches a long query loosely, so "Escadório do Bom Jesus do Monte
 * Braga Portugal" happily returns a photograph of Lisbon and "Paço das Escolas
 * Coimbra Portugal" returns a beach. Without this check the first run put
 * Lisbon on the Braga page and an Algarve beach on Coimbra's — which is worse
 * than a generic photograph, because it is a wrong one.
 *
 * The search endpoint returns no tags or location, so the only evidence
 * available is the description. That is weak evidence, which is why this is a
 * strong preference rather than a filter: a good photograph with a silent
 * description should still be able to win.
 */
function placeMatch(photo: UnsplashPhoto, slot: Slot): number {
  if (slot.matchTokens.length === 0) return 0;
  const text = fold(`${photo.alt_description ?? ''} ${photo.description ?? ''}`);
  if (!text.trim()) return 0;
  return slot.matchTokens.some((token) => text.includes(fold(token))) ? 1 : 0;
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
 * Popularity, as a band rather than a penalty.
 *
 * The first version of this simply subtracted log10(likes), and measuring the
 * result showed it had overshot badly: the median chosen photograph had zero
 * likes against twenty-three for a naive results[0] pipeline. That is not
 * avoiding the photograph everyone has, it is picking the worst frame in the
 * result set — on Unsplash a photograph nobody has ever liked is usually one
 * nobody should.
 *
 * So the term rewards being known a little and penalises being famous. Below
 * about twenty likes the reward ramps up; above about a hundred the penalty
 * starts and grows with the logarithm. The sweet spot is a competent
 * photograph that has not been downloaded ten thousand times — which is the
 * actual goal, and is not the same thing as obscurity.
 */
const KNOWN_ENOUGH = 25;
const TOO_FAMOUS = 2.0; // log10 — about a hundred likes.

function popularity(photo: UnsplashPhoto): number {
  const likes = Math.max(0, photo.likes);
  const reward = 0.45 * (Math.min(likes, KNOWN_ENOUGH) / KNOWN_ENOUGH);
  const penalty = 0.8 * Math.max(0, Math.log10(1 + likes) - TOO_FAMOUS);
  return reward - penalty;
}

/**
 * Rank only counts when the ordering was by relevance.
 *
 * The first version treated position 1 of an `order_by=latest` search as if it
 * meant something, and it means only "uploaded most recently" — no relevance
 * signal whatsoever. That is how a beach ended up on the Coimbra page: it was
 * rank 1 of the recency pool and scored as if it were rank 1 of the relevance
 * pool. The recency pool is a diversity source, so it gets a flat, modest
 * value and has to win on the other terms.
 */
function rankValue(candidate: Candidate): number {
  return candidate.ordering === 'relevant' ? 1.4 / Math.sqrt(candidate.rank) : 0.35;
}

/*
 * Greyscale, as a heavy penalty rather than a filter.
 *
 * The site gives photographs the only colour on the page, so a monochrome one
 * reads as a broken image rather than as a choice. A penalty rather than a
 * `continue` because the failure mode matters: if every candidate for a slot
 * happens to be greyscale, the best greyscale photograph is still a better
 * outcome than an empty frame. Two points is larger than any other term can
 * recover, so it only ever wins when there is nothing else.
 *
 * `spreads` is empty until `fetch.ts` has run, and then the penalty simply does
 * not apply — which is the behaviour this had before the measurement existed.
 */
const MONOCHROME_PENALTY = 2.0;

function score(
  candidate: Candidate,
  slot: Slot,
  authorUses: number,
  spreads: Record<string, number>,
): number {
  const { photo } = candidate;
  const spread = spreads[photo.id];
  const monochrome = spread !== undefined && spread < MONOCHROME_BELOW;
  return (
    rankValue(candidate) +
    0.9 * aspectFit(photo, slot) +
    0.9 * placeMatch(photo, slot) +
    0.3 * recency(photo) +
    popularity(photo) -
    1.5 * (authorUses >= MAX_PER_PHOTOGRAPHER_PER_GROUP ? 1 : 0) -
    MONOCHROME_PENALTY * (monochrome ? 1 : 0)
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
  const spreads = loadSpreads();

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
  /** Slots waiting on a query the search has not fetched yet. */
  const empty: string[] = [];
  /** Slots whose queries were all fetched and all came back with nothing. */
  const barren: string[] = [];
  /** Slots whose queries returned photographs, none of them usable here. */
  const exhausted: string[] = [];

  for (const slot of slots) {
    if (manifest.slots[slot.key] && !refresh.has(slot.key)) {
      kept += 1;
      continue;
    }

    let best: { photo: UnsplashPhoto; value: number } | null = null;
    const seenState = { uncached: false, results: 0 };
    for (const candidate of candidates(slot, seenState)) {
      const { photo } = candidate;
      if (assigned.has(photo.id)) continue;
      if (aspectFit(photo, slot) === 0) continue;
      const counts = authorsByGroup.get(slot.group);
      const authorUses = counts?.get(photo.user.username) ?? 0;
      const value = score(candidate, slot, authorUses, spreads);
      if (!best || value > best.value) best = { photo, value };
    }

    if (!best) {
      if (seenState.uncached) empty.push(slot.key);
      else if (seenState.results === 0) barren.push(slot.key);
      else exhausted.push(slot.key);
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
    `[photos:select] ${chosen} chosen, ${kept} kept, ${empty.length} awaiting search,` +
      ` ${barren.length} with an empty query, ${exhausted.length} with nothing left.` +
      ` ${Object.keys(manifest.slots).length} slots filled by ${ids.size} distinct photographs.`,
  );
  if (ids.size !== Object.keys(manifest.slots).length) {
    console.error('[photos:select] a photograph is assigned to more than one slot');
    process.exit(1);
  }
  if (empty.length > 0) {
    console.log('\nNot searched yet:');
    for (const key of empty.slice(0, 20)) console.log(`  ${key}`);
    if (empty.length > 20) console.log(`  … and ${empty.length - 20} more`);
    console.log('\nRun `npm run photos:search` until it reports complete, then re-run this.');
  }

  /*
   * A barren slot is a different problem with different advice. Every query it
   * has was fetched and every one of them matched nothing, so re-running the
   * search will produce exactly the same nothing — the query itself is too
   * narrow and needs a broader fallback in `targets.ts`.
   */
  if (barren.length > 0) {
    console.log('\nSearched, but the query matched no photograph at all:');
    for (const key of barren.slice(0, 20)) {
      const slot = slots.find((s) => s.key === key);
      console.log(`  ${key}  ← ${slot?.queries.map((q) => `"${q}"`).join(', ')}`);
    }
    if (barren.length > 20) console.log(`  … and ${barren.length - 20} more`);
    console.log('\nBroaden the query in scripts/photos/targets.ts — searching again will not help.');
  }

  /*
   * The pool was not empty; this slot just could not have any of it. Every
   * candidate was either already assigned to another slot — a photograph is
   * used once site-wide — or the wrong shape for this crop. A second, differently
   * worded query is what widens the pool; searching the same one again will not.
   */
  if (exhausted.length > 0) {
    console.log('\nCandidates existed but none was usable (already assigned, or wrong shape):');
    for (const key of exhausted.slice(0, 20)) console.log(`  ${key}`);
    if (exhausted.length > 20) console.log(`  … and ${exhausted.length - 20} more`);
  }
}

main();
