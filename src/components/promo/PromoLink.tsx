'use client';

import type { ComponentProps } from 'react';
import { Link } from '@/i18n/navigation';
import { track } from '@/lib/analytics';
import { rememberPromo, type PromoId } from '@/lib/promo';

/**
 * An internal link that reports `promo_click` and remembers the promo for the
 * lead event later. No UTM tags: they would start a new GA session.
 */
export default function PromoLink({
  promoId,
  placement,
  onClick,
  ...props
}: ComponentProps<typeof Link> & { promoId: PromoId; placement: string }) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        rememberPromo(promoId);
        track('promo_click', { promo_id: promoId, placement });
        onClick?.(e);
      }}
    />
  );
}
