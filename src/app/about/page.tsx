import Image from 'next/image';
import Link from 'next/link';
import '@/app/globals.css';

export const metadata = {
  title: 'Our Story - Mini Book Bazaar',
  description: 'Learn about our mission to bring the joy of reading to our local community through affordable, hand-checked new and pre-loved books.',
};

export default function AboutPage() {
  return (
    <div className="page-wrapper">
      <div className="container section">
        <div className="about-header" style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
          <h1 style={{ fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)' }}>More Than Just a Bookstore</h1>
          <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            We believe that every book deserves to be read, and everyone deserves access to great stories.
          </p>
        </div>

        <div className="about-content" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-12)' }}>
          
          <div className="about-block" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div style={{ backgroundColor: 'var(--color-bg-primary)', padding: 'var(--space-8)', borderRadius: 'var(--radius-md)' }}>
              <h2 style={{ marginBottom: 'var(--space-4)' }}>Our Mission</h2>
              <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-4)' }}>
                Mini Book Bazaar started with a simple observation: beautiful, independent bookstores often feel financially inaccessible, while affordable bargain bins lack the joy of curation and trust. We wanted to build a bridge.
              </p>
              <p style={{ lineHeight: 1.8 }}>
                Based locally, our mission is to provide an editorial, warm, and highly curated browsing experience for readers of all budgets. Whether you are buying a brand-new release or a deeply discounted pre-loved classic, you deserve a premium bookstore experience.
              </p>
            </div>
          </div>

          <div className="about-block" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
             <div style={{ backgroundColor: 'var(--color-bg-primary)', padding: 'var(--space-8)', borderRadius: 'var(--radius-md)' }}>
              <h2 style={{ marginBottom: 'var(--space-4)' }}>The Pre-Loved Promise</h2>
              <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-4)' }}>
                Buying a used book shouldn't be a gamble. That's why we don't just act as a marketplace. Every single pre-loved book that passes through our doors is individually hand-checked.
              </p>
              <ul style={{ lineHeight: 1.8, paddingLeft: 'var(--space-6)', listStyleType: 'disc' }}>
                <li>No missing pages.</li>
                <li>No severe water damage.</li>
                <li>Clear, honest condition ratings ("Excellent" vs "Good").</li>
              </ul>
            </div>
          </div>

          <div className="about-block" style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
            <h2 style={{ marginBottom: 'var(--space-6)' }}>Ready to find your next read?</h2>
            <Link href="/shop" className="btn btn-primary" style={{ padding: 'var(--space-4) var(--space-8)' }}>
              Browse the Catalog
            </Link>
          </div>

        </div>
      </div>
      
      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Mini Book Bazaar. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
