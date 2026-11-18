'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { track } from '@/lib/analytics';
import { isWithin, type PromoId, type PromoWindowName } from '@/lib/promo';

/**
 * Renders its children only inside a promo window, checked in the browser, and
 * reports `promo_view` once when they appear. Nothing is in the server HTML,
 * so a prerendered page cannot show a promotion outside its dates.
 */
export default function PromoWindow({
  window: name,
  promoId,
  placement,
  children,
}: {
  window: PromoWindowName;
  promoId: PromoId;
  placement: string;
  children: ReactNode;
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = isWithin(name);
    setShow(on);
    if (on) track('promo_view', { promo_id: promoId, placement });
  }, [name, promoId, placement]);
  return show ? <>{children}</> : null;
}
