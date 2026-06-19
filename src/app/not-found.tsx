import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container section" style={{ textAlign: 'center', marginTop: 'var(--space-12)', minHeight: '50vh' }}>
      <h1 style={{ fontSize: 'var(--text-4xl)', color: 'var(--color-accent-primary)', marginBottom: 'var(--space-4)' }}>404</h1>
      <h2>Page Not Found</h2>
      <p style={{ margin: 'var(--space-4) 0 var(--space-8) 0', color: 'var(--color-text-secondary)' }}>
        Oops! We couldn't find the page or book you were looking for.
      </p>
      <Link href="/shop" className="btn btn-primary">
        Return to Shop
      </Link>
    </div>
  );
}
