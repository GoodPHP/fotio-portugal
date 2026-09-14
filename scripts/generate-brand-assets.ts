/**
 * Renders the brand assets — favicon, app icons, Organization logo, default OG
 * card — from the design tokens, using the site's own display face.
 *
 * They are generated rather than drawn so they cannot drift from the masthead:
 * the "Y" here is the same Fraunces cut, at the same optical settings, as the
 * "Ylala" wordmark in the header. Re-run after changing the palette or the
 * display font:
 *
 *   npx tsx scripts/generate-brand-assets.ts
 *
 * Writing the .ico needs Pillow (`python3 -m pip install pillow`).
 */
import { chromium, type Page } from 'playwright';
import { execFile } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { promisify } from 'node:util';

const run = promisify(execFile);

/** Straight from globals.css — the assets must not invent their own palette. */
const PAPER = '#F7F4EE';
const INK = '#17150F';
const SIENNA = '#9C3B1B';

const FONT_CSS =
  'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700' +
  '&family=JetBrains+Mono:wght@500&display=swap';

/** Fraunces as the site sets it: no softening, the quirky cut, tight fit. */
const DISPLAY = `font-family:'Fraunces',Georgia,serif;font-variation-settings:'SOFT' 0,'WONK' 1;letter-spacing:-0.03em;`;

function page(body: string): string {
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="${FONT_CSS}">
<style>*{margin:0;padding:0;box-sizing:border-box}body{background:transparent}</style>
</head><body>${body}</body></html>`;
}

/**
 * The app mark: a paper "Y" on ink, over a sienna rule.
 *
 * Ink ground rather than paper because a favicon sits on browser chrome of
 * unknown colour — a light mark on dark holds its shape against both. The rule
 * is the one piece of ornament the design system allows itself, but below ~24px
 * it would render thinner than a pixel, so at those sizes the letter stands alone.
 */
function mark(size: number): string {
  const withRule = size >= 24;
  const ruleH = Math.max(1, Math.round(size * 0.045));
  const gap = Math.round(size * 0.06);
  return page(`<div style="width:${size}px;height:${size}px;background:${INK};
    display:flex;flex-direction:column;align-items:center;justify-content:center;">
    <div style="${DISPLAY}font-size:${size * (withRule ? 0.6 : 0.78)}px;line-height:0.78;
      color:${PAPER};margin-top:${size * 0.02}px;">Y</div>
    ${withRule ? `<div style="width:${size * 0.34}px;height:${ruleH}px;background:${SIENNA};margin-top:${gap}px;"></div>` : ''}
  </div>`);
}

/** The Organization logo Google may show beside the site: the wordmark itself. */
function logo(size: number): string {
  return page(`<div style="width:${size}px;height:${size}px;background:${PAPER};
    display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${size * 0.055}px;">
    <div style="${DISPLAY}font-size:${size * 0.235}px;color:${INK};">Ylala</div>
    <div style="width:${size * 0.30}px;height:${Math.round(size * 0.014)}px;background:${SIENNA};"></div>
    <div style="font-family:'JetBrains Mono',monospace;font-size:${size * 0.052}px;
      letter-spacing:0.18em;text-transform:uppercase;color:${INK};opacity:0.62;">France</div>
  </div>`);
}

/**
 * The card every page falls back to when it has no photograph of its own.
 * Laid out like the site: eyebrow, rule, wordmark, one honest line.
 */
function ogCard(w: number, h: number): string {
  return page(`<div style="width:${w}px;height:${h}px;background:${PAPER};position:relative;
    display:flex;flex-direction:column;justify-content:center;padding:0 96px;">
    <div style="font-family:'JetBrains Mono',monospace;font-size:20px;letter-spacing:0.2em;
      text-transform:uppercase;color:${SIENNA};">Photographers across France</div>
    <div style="width:100%;height:1px;background:#D8D5CF;margin:34px 0 38px;"></div>
    <div style="${DISPLAY}font-size:150px;line-height:0.9;color:${INK};">Ylala</div>
    <div style="font-family:'Fraunces',Georgia,serif;font-variation-settings:'SOFT' 0,'WONK' 1;
      font-size:31px;line-height:1.35;color:#5A554A;margin-top:34px;max-width:820px;">
      Vetted local photographers in 22 cities. Fixed prices, agreed before you book.</div>
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
  const tmp = await mkdtemp(join(tmpdir(), 'ylala-icons-'));

  console.log('[brand] rendering');
  await shoot(p, mark(512), 'src/app/icon.png', 512, 512);
  await shoot(p, mark(180), 'src/app/apple-icon.png', 180, 180);
  await shoot(p, logo(512), 'public/logo.png', 512, 512);
  await shoot(p, ogCard(1200, 630), 'public/og-default.png', 1200, 630);

  // The .ico carries three sizes, each rendered at its own scale rather than
  // downsampled from one bitmap — a serif letter resampled to 16px turns to mud.
  // Largest first: Pillow silently drops any requested size bigger than the
  // image it is given as the base frame.
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
