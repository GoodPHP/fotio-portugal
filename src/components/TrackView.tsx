'use client';

import { useEffect } from 'react';
import { track, type AnalyticsEvent } from '@/lib/analytics';

/** Records one event when the page it sits on is shown. Renders nothing. */
export default function TrackView({
  event,
  props = {},
}: {
  event: AnalyticsEvent;
  props?: Record<string, string>;
}) {
  const key = JSON.stringify(props);
  useEffect(() => {
    track(event, JSON.parse(key) as Record<string, string>);
  }, [event, key]);
  return null;
}
