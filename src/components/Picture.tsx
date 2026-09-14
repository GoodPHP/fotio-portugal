import ReactDOM from 'react-dom';
import { IMAGE_SLOTS, type ImageSlot } from '@/lib/data/image-manifest';

interface PictureProps {
  /** Slot key, e.g. "cities/lisboa" or "portfolio/wedding/2". */
  slot: string;
  alt: string;
  /** The `sizes` attribute. Required: without it the browser assumes 100vw. */
  sizes: string;
  className?: string;
  /** Above the fold. Loads eagerly and asks the browser to prioritise it. */
  priority?: boolean;
  /**
   * Fill the nearest positioned ancestor, the way `next/image`'s `fill` did.
   * The <picture> element is display:contents so it does not itself become a
   * box between the container and the image.
   */
  fill?: boolean;
}

const FILL_CLASS = 'absolute inset-0 h-full w-full';

const srcSet = (sources: ImageSlot['avif']): string =>
  sources.map((s) => `${s.path} ${s.width}w`).join(', ');

/**
 * A photograph, as a plain `<picture>` over files rendered at build time.
 *
 * This replaced `next/image`, and the reasons are specific rather than
 * ideological. Every image on this site is known at build time and none of them
 * needs dynamic sizing, so the runtime transform was buying nothing and costing
 * four things: a cold edge transform on the first request for each (src, width,
 * quality) — paid on the LCP image in particular; responses that are not
 * Workers Static Assets and so never get the immutable cache policy in
 * `_headers`; a per-operation bill; and a client runtime.
 *
 * The fourth cost is the one that mattered most: with `next/image` the LCP
 * image cannot usefully be preloaded, because its URL depends on the srcset the
 * browser resolves. Here the URL is a static asset with a content hash, so a
 * preload is exact.
 *
 * A slot with no photograph renders a coloured box of the right shape rather
 * than a broken image, so the page holds its layout while the catalogue is
 * ahead of the photography.
 */
export default function Picture({
  slot,
  alt,
  sizes,
  className,
  priority = false,
  fill = false,
}: PictureProps) {
  const image = IMAGE_SLOTS[slot];
  const classes = [fill ? FILL_CLASS : '', className ?? ''].filter(Boolean).join(' ');

  /*
   * Preload the LCP image, in both formats.
   *
   * This is the single largest lever on this page and the thing next/image
   * could not do: there, the URL depends on the srcset the browser resolves,
   * so a preload is either a guess or a second download. Here every candidate
   * is a static asset with a content hash, so the preload is exact.
   *
   * Both formats are declared because the server cannot know which the browser
   * decodes. A browser ignores a preload whose `type` it cannot handle, so
   * exactly one of the two ever fetches anything.
   */
  if (priority && image) {
    for (const [type, sources] of [
      ['image/avif', image.avif],
      ['image/webp', image.webp],
    ] as const) {
      ReactDOM.preload(sources[sources.length - 1].path, {
        as: 'image',
        type,
        imageSrcSet: srcSet(sources),
        imageSizes: sizes,
        fetchPriority: 'high',
      });
    }
  }

  if (!image) {
    return (
      <div
        className={classes}
        role="img"
        aria-label={alt}
        style={{ backgroundColor: 'var(--color-brand-cream)' }}
      />
    );
  }

  const largest = image.webp[image.webp.length - 1];

  return (
    <picture className="contents">
      <source type="image/avif" srcSet={srcSet(image.avif)} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(image.webp)} sizes={sizes} />
      <img
        src={largest.path}
        alt={alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        className={classes}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : undefined}
        // Painted behind the photograph so the space is never blank white.
        style={image.color ? { backgroundColor: image.color } : undefined}
      />
    </picture>
  );
}
