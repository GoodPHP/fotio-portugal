import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Skip API routes, the WhatsApp redirect, Next internals, and files with an
  // extension.
  matcher: ['/((?!api|wa(?:/|$)|_next|_vercel|.*\\..*).*)'],
};
