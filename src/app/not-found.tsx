import type { Metadata } from 'next';

/**
 * Root 404, outside the [locale] segment.
 *
 * With `localePrefix: 'as-needed'` a request the middleware cannot localize
 * never reaches the localized not-found page, so without this one Next would
 * fall back to its own unstyled default. English only: there is no locale to
 * read here.
 */
export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

export default function RootNotFound() {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#F5F2ED', color: '#1A1A1A' }}>
        <main
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 1.5rem',
          }}
        >
          <p style={{ letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.8rem', color: '#E67E22' }}>404</p>
          <h1 style={{ fontSize: '2rem', margin: '0.5rem 0 0' }}>Page not found</h1>
          <p style={{ color: '#555', marginTop: '0.75rem' }}>This page does not exist, or it has moved.</p>
          <a
            href="/"
            style={{
              marginTop: '2rem',
              background: '#1A1A1A',
              color: '#fff',
              padding: '0.75rem 1.5rem',
              borderRadius: '999px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.875rem',
            }}
          >
            Back to the home page
          </a>
        </main>
      </body>
    </html>
  );
}
