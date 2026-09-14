import type { Review } from '../types';

/**
 * Client reviews, feeding the AggregateRating node.
 *
 * Emptied in the conversion. These have to be real: an aggregate rating built
 * from invented reviews is structured data that lies, and both Google and the
 * consumer-protection regime treat it as exactly that.
 */
export const REVIEWS: Review[] = [];
