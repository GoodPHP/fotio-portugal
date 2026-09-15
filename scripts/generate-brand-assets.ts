/**
 * Renders the brand assets — favicon, app icons, Organization logo, default OG
 * card — from the design tokens, using the site's own mark and display face.
 *
 * They are generated rather than drawn so they cannot drift from the masthead.
 * That is the intention; the practice had drifted badly. Until this rewrite the
 * generator still painted the *previous* site: the old sienna-on-paper palette,
 * Fraunces as the display face, a hardcoded "Y" for a brand that no longer
 * begins with one, and the line "Photographers across France" on a site that
 * covers Portugal. Those bitmaps were committed, so every share of a page
 * without its own photograph showed the wrong brand and the wrong country.
 *
 * Re-run after changing the brand name, the palette or the display font:
 *
 *   npx tsx scripts/generate-brand-assets.ts
 *
 * Writing the .ico needs Pillow (`python3 -m pip install pillow`).
 */
import { chromium, type Page } from 'playwright';
import { SITE_NAME, SITE_TAGLINE } from '../src/lib/site';
import { CITIES } from '../src/lib/catalog';
import { execFile } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { promisify } from 'node:util';

const run = promisify(execFile);

/** Straight from globals.css — the assets must not invent their own palette. */
const BONE = '#F3F3EE';
const INK = '#0E1417';
const COBALT = '#1B4FA8';
const GROUT = '#D5D7D1';
const MUTED = '#535E61';

const FONT_CSS =
  'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..800' +
  '&family=Inter:wght@500;600&display=swap';

/** Bricolage as the site sets it: optical sizing on, tight fit. */
const DISPLAY =
  "font-family:'Bricolage Grotesque',Helvetica,Arial,sans-serif;font-optical-sizing:auto;letter-spacing:-0.045em;font-weight:700;";
const LABEL =
  "font-family:'Inter',system-ui,sans-serif;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;";

/**
 * The logomark, as SVG: one azulejo.
 *
 * The same construction as src/components/TileMark.tsx — four arcs of radius
 * equal to half the square, struck from its corners, and a lozenge at the
 * centre. Kept as a string here rather than imported because this script
 * renders HTML in a browser rather than React, and the geometry is four paths.
 */
function tileMark(size: number, ground: string): string {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24">
    <rect width="24" height="24" fill="${COBALT}"/>
    <g fill="none" stroke="${ground}" stroke-width="1.5">
      <path d="M12 0A12 12 0 0 1 0 12"/><path d="M24 12A12 12 0 0 1 12 0"/>
      <path d="M12 24A12 12 0 0 1 24 12"/><path d="M0 12A12 12 0 0 1 12 24"/>
    </g>
    <rect x="12" y="8.1" width="5.5" height="5.5" fill="${ground}" transform="rotate(45 12 12)"/>
  </svg>`;
}

function page(body: string): string {
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="${FONT_CSS}">
<style>*{margin:0;padding:0;box-sizing:border-box}body{background:transparent}</style>
</head><body>${body}</body></html>`;
}

/**
 * The app mark: the azulejo, edge to edge.
 *
 * It was a letter over a rule, which needed a special case below 24px where the
 * rule renders thinner than a pixel. The tile has no such floor: it is four
 * arcs and a lozenge on a solid cobalt field, so it reads at 16px and at 512px
 * as the same shape — which is the whole argument for a geometric mark over an
 * initial. It also no longer has to know what letter the brand starts with.
 */
function mark(size: number): string {
  return page(`<div style="width:${size}px;height:${size}px;display:flex;">
    ${tileMark(size, BONE)}
  </div>`);
}

/** The Organization logo Google may show beside the site: mark and wordmark. */
function logo(size: number): string {
  return page(`<div style="width:${size}px;height:${size}px;background:${BONE};
    display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${size * 0.07}px;">
    ${tileMark(Math.round(size * 0.2), BONE)}
    <div style="${DISPLAY}font-size:${size * 0.2}px;color:${INK};line-height:1;">${SITE_NAME}</div>
    <div style="${LABEL}font-size:${size * 0.048}px;color:${MUTED};">Portugal</div>
  </div>`);
}

/**
 * The card every page falls back to when it has no photograph of its own.
 *
 * Laid out like the site: eyebrow, grout line, wordmark, one honest line, and
 * the lattice running down the right edge. The city count comes from the
 * catalogue rather than being typed here — the old card claimed 22 cities,
 * which was the previous country's number and was wrong the day it was
 * committed.
 */
function ogCard(w: number, h: number): string {
  const cell = 64;
  return page(`<div style="width:${w}px;height:${h}px;background:${BONE};position:relative;
    display:flex;flex-direction:column;justify-content:center;padding:0 96px;overflow:hidden;">
    <div style="position:absolute;top:0;right:0;bottom:0;width:${w * 0.42}px;
      background-image:
        radial-gradient(circle at 0 0,transparent ${cell * 0.6 - 1}px,${COBALT}44 ${cell * 0.6 - 1}px ${cell * 0.6}px,transparent ${cell * 0.6}px),
        radial-gradient(circle at 100% 0,transparent ${cell * 0.6 - 1}px,${COBALT}44 ${cell * 0.6 - 1}px ${cell * 0.6}px,transparent ${cell * 0.6}px),
        radial-gradient(circle at 0 100%,transparent ${cell * 0.6 - 1}px,${COBALT}44 ${cell * 0.6 - 1}px ${cell * 0.6}px,transparent ${cell * 0.6}px),
        radial-gradient(circle at 100% 100%,transparent ${cell * 0.6 - 1}px,${COBALT}44 ${cell * 0.6 - 1}px ${cell * 0.6}px,transparent ${cell * 0.6}px);
      background-size:${cell}px ${cell}px;
      -webkit-mask-image:linear-gradient(to left,#000 25%,transparent 95%);"></div>
    <div style="position:relative;display:flex;align-items:center;gap:18px;">
      ${tileMark(40, BONE)}
      <div style="${LABEL}font-size:20px;color:${COBALT};">${SITE_TAGLINE.en}</div>
    </div>
    <div style="position:relative;width:100%;height:1px;background:${GROUT};margin:34px 0 38px;"></div>
    <div style="${DISPLAY}position:relative;font-size:150px;line-height:0.9;color:${INK};">${SITE_NAME}</div>
    <div style="font-family:'Inter',system-ui,sans-serif;position:relative;
      font-size:31px;line-height:1.35;color:${MUTED};margin-top:34px;max-width:760px;">
      Vetted local photographers in ${CITIES.length} places. Fixed prices, agreed before you book.</div>
    <div style="position:absolute;left:0;right:0;bottom:0;height:14px;background:${INK};"></div>
  </div>`);
}

async function shoot(p: Page, html: string, out: string, w: number, h: number) {
  await p.setViewportSize({ width: w, height: h });
  await p.setContent(html, { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: out, clip: { x: 0, y: 0, width: w, height: h } });
  console.log(`  ${out}  ${w}×${h}`);
}

async function main() {
  const browser = await chromium.launch();
  const p = await browser.newPage({ deviceScaleFactor: 1 });
  const tmp = await mkdtemp(join(tmpdir(), 'brand-icons-'));

  console.log('[brand] rendering');
  await shoot(p, mark(512), 'src/app/icon.png', 512, 512);
  await shoot(p, mark(180), 'src/app/apple-icon.png', 180, 180);
  await shoot(p, logo(512), 'public/logo.png', 512, 512);
  await shoot(p, ogCard(1200, 630), 'public/og-default.png', 1200, 630);

  // The .ico carries three sizes, each rendered at its own scale rather than
  // downsampled from one bitmap — the lattice strokes are hairlines, and
  // resampling 48px down to 16px loses them entirely. Largest first: Pillow
  // silently drops any requested size bigger than the base frame it is given.
  const icoSizes = [48, 32, 16];
  for (const s of icoSizes) await shoot(p, mark(s), join(tmp, `${s}.png`), s, s);
  await browser.close();

  await run('python3', [
    '-c',
    `from PIL import Image
imgs=[Image.open(f"${tmp}/{s}.png").convert("RGBA") for s in ${JSON.stringify(icoSizes)}]
imgs[0].save("src/app/favicon.ico",format="ICO",append_images=imgs[1:],
             sizes=[(i.width,i.height) for i in imgs])`,
  ]);
  console.log('  src/app/favicon.ico  16/32/48');
  await rm(tmp, { recursive: true, force: true });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
