/**
 * The logomark: one azulejo.
 *
 * It is the CSS lattice in `globals.css` reduced to a single cell — four
 * quarter-circle arcs struck from the corners of a square, which is the
 * construction every interlocking tile pattern in Portugal is a variation of.
 * Drawing the mark from the same geometry as the page background is the reason
 * the two read as one idea rather than as a logo placed on a texture.
 *
 * It is inline SVG rather than a file because it is twelve elements, it has to
 * take its colour from whatever surface it lands on, and a request for a mark
 * this small is a request the site should not be making.
 */
export default function TileMark({
  className = 'h-6 w-6',
  title,
}: {
  className?: string;
  /** Only pass this when the mark stands alone; beside the wordmark it is decorative. */
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <rect width="24" height="24" fill="currentColor" />
      <g fill="none" stroke="var(--color-brand-sand)" strokeWidth="1.5">
        {/* Four arcs of radius 12, struck from each corner. They meet at the
            midpoints of the edges, which is what closes the pattern. */}
        <path d="M12 0A12 12 0 0 1 0 12" />
        <path d="M24 12A12 12 0 0 1 12 0" />
        <path d="M12 24A12 12 0 0 1 24 12" />
        <path d="M0 12A12 12 0 0 1 12 24" />
      </g>
      {/* The centre lozenge: the point where all four arcs are equidistant. */}
      <rect
        x="12"
        y="8.1"
        width="5.5"
        height="5.5"
        fill="var(--color-brand-sand)"
        transform="rotate(45 12 12)"
      />
    </svg>
  );
}
