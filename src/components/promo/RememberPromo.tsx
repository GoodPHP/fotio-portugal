'use client';

import { useEffect } from 'react';
import { rememberPromo, type PromoId } from '@/lib/promo';

/** Marks the visit as coming through a promo page, so a later lead carries `promo_id`. */
export default function RememberPromo({ promoId }: { promoId: PromoId }) {
  useEffect(() => rememberPromo(promoId), [promoId]);
  return null;
}
