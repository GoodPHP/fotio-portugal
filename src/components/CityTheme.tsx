import type { ReactNode } from 'react';
import type { CityThemeId } from '@/lib/theme';

/**
 * Applies a city's palette to everything it wraps.
 *
 * Deliberately scoped to the page content rather than the document: the header
 * and footer keep the house palette, so moving between a themed city and the
 * rest of the site reads as one site with a local accent rather than as two
 * different websites.
 *
 * With no theme it renders nothing of its own, so untheme d cities pay nothing.
 */
export default function CityTheme({
  theme,
  children,
}: {
  theme?: CityThemeId;
  children: ReactNode;
}) {
  if (!theme) return <>{children}</>;
  return <div data-city-theme={theme}>{children}</div>;
}
