/**
 * The booking flow's constants, apart from the option lists.
 *
 * Separate from `booking-options.ts` because that module imports the
 * catalogue, and the flow is a client component: importing one constant from
 * it put every city's prose into the home page's JavaScript — sixty kilobytes
 * for the word "other".
 */

/** Sent in place of a slug when the visitor picks "Other". The API accepts it. */
export const OTHER = 'other';
