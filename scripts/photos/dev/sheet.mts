import sharp from 'sharp';
import { IMAGE_SLOTS } from '../../../src/lib/data/image-manifest';

const prefix = process.argv[2] ?? 'cities/';
const cities = Object.keys(IMAGE_SLOTS).filter((k) => k.startsWith(prefix)).sort();
const W = 420, H = 236, COLS = 4;
const tiles = await Promise.all(
  cities.map(async (k) => ({
    k,
    buf: await sharp(`public${IMAGE_SLOTS[k].webp[1].path}`).resize(W, H, { fit: 'cover' }).toBuffer(),
  })),
);
const rows = Math.ceil(tiles.length / COLS);
await sharp({ create: { width: W * COLS, height: H * rows, channels: 3, background: '#ffffff' } })
  .composite(tiles.map((t, i) => ({ input: t.buf, left: (i % COLS) * W, top: Math.floor(i / COLS) * H })))
  .jpeg({ quality: 82 })
  .toFile(process.argv[3] ?? '/tmp/sheet.jpg');
console.log(cities.map((c, i) => `${i + 1}. ${c}`).join('   '));
