import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { getInventory } from '@/lib/inventory';
import { Metadata } from 'next';
import HeroSearch from '@/components/HeroSearch';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mini Book Bazaar - Handpicked New & Pre-loved Books',
  description: 'Discover your next great read. A premium local bookstore offering highly curated new releases and hand-checked pre-loved classics.',
};

export default async function Home() {
  const inventory = await getInventory();

  // Categorize books for different sections
  const trending = inventory.filter(b => b.featured);
  const newArrivals = inventory.filter(b => b.condition === 'New').slice(0, 8);
  const preLoved = inventory.filter(b => b.condition.includes('Pre-loved')).slice(0, 8);
  const dealOfTheWeek = inventory.find(b => b.originalPrice && b.originalPrice > b.price);

  return (
    <div className="home-page">
      {/* Top Promotional Banner */}
      <div className="promo-banner">
        <span>🎉 Summer Reading Sale! Get up to 30% off selected classics.</span>
      </div>

      {/* Hero Section with Poster */}
      <section className="hero section with-poster">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1>Curated books for everyday readers.</h1>
          <p>A modern independent bookstore offering affordable reads, thoughtfully presented in Laxmi Nagar.</p>
          <HeroSearch books={inventory} />
        </div>
      </section>

      {/* Featured Categories (Grid) */}
      <section className="categories section container">
        <div className="section-header">
          <h2>Shop by Category</h2>
        </div>
        <div className="category-grid">
          {['Fiction', 'History', 'Science', 'Children', 'Self-Help', 'Business'].map((cat) => (
            <Link href={`/shop?category=${encodeURIComponent(cat)}`} key={cat} className="category-card card">
              <h3>{cat}</h3>
              <p>Explore collection &rarr;</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Now (Horizontal Scroll) */}
      <section className="trending section container">
        <div className="section-header">
          <h2>Trending This Week</h2>
          <Link href="/shop" className="view-all">View all</Link>
        </div>
        <div className="book-carousel">
          {trending.map((book) => (
            <Link href={`/shop/${book.id}`} key={book.id} className="book-card card carousel-item">
              <div className="book-cover">
                <Image src={book.imageUrl} alt={book.title} fill sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" style={{ objectFit: 'cover' }} />
                {book.originalPrice && book.originalPrice > book.price && (
                  <span className="discount-badge">Save {Math.round((1 - book.price / book.originalPrice) * 100)}%</span>
                )}
              </div>
              <div className="book-info">
                <h3>{book.title}</h3>
                <p className="author">{book.author}</p>
                <div className="price-action">
                  <div className="price-group">
                    <span className="price">₹{book.price}</span>
                    {book.originalPrice && <span className="original-price">₹{book.originalPrice}</span>}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Deal of the Week Banner */}
      {dealOfTheWeek && (
        <section className="deal-banner section container">
          <div className="deal-card card">
            <div className="deal-content">
              <h2>Deal of the Week</h2>
              <h3 style={{ marginTop: 'var(--space-2)' }}>{dealOfTheWeek.title}</h3>
              <p>by {dealOfTheWeek.author}</p>
              <div className="price-group" style={{ fontSize: '1.2rem', marginTop: 'var(--space-4)' }}>
                <span className="price">₹{dealOfTheWeek.price}</span>
                <span className="original-price">₹{dealOfTheWeek.originalPrice}</span>
              </div>
              <Link href={`/shop/${dealOfTheWeek.id}`} className="btn btn-primary" style={{ marginTop: 'var(--space-6)', display: 'inline-block' }}>
                Grab the deal
              </Link>
            </div>
            <div className="deal-image">
              <Image src={dealOfTheWeek.imageUrl} alt={dealOfTheWeek.title} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="bestsellers section container">
          <div className="section-header">
            <h2>New Arrivals</h2>
            <Link href="/shop?condition=New" className="view-all">View all</Link>
          </div>
          <div className="book-grid">
            {newArrivals.map((book) => (
              <Link href={`/shop/${book.id}`} key={book.id} className="book-card card">
                <div className="book-cover">
                  <Image src={book.imageUrl} alt={book.title} fill sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" style={{ objectFit: 'cover' }} />
                </div>
                <div className="book-info">
                  <h3>{book.title}</h3>
                  <p className="author">{book.author}</p>
                  <div className="price-action">
                    <span className="price">₹{book.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Pre-Loved Classics */}
      {preLoved.length > 0 && (
        <section className="bestsellers section container" style={{ background: 'var(--color-background-alt)', padding: 'var(--space-12)' }}>
          <div className="section-header">
            <h2>Pre-loved Treasures</h2>
            <Link href="/shop" className="view-all">View all</Link>
          </div>
          <div className="book-grid">
            {preLoved.map((book) => (
              <Link href={`/shop/${book.id}`} key={book.id} className="book-card card">
                <div className="book-cover">
                  <Image src={book.imageUrl} alt={book.title} fill sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" style={{ objectFit: 'cover' }} />
                </div>
                <div className="book-info">
                  <h3>{book.title}</h3>
                  <p className="author">{book.author}</p>
                  <div className="price-action">
                    <span className="price">₹{book.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Store Visit Section */}
      <section className="section container">
        <div className="store-visit">
          <div className="store-image">
            <iframe 
              src="https://maps.google.com/maps?q=Laxmi+Nagar,+Main+Market,+Delhi&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0, minHeight: '300px' }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Mini Book Bazaar Location"
            ></iframe>
          </div>
          <div className="store-details">
            <h3>Visit Our Store in Laxmi Nagar</h3>
            <div className="store-info-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <div>
                <p style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>Address</p>
                <p>Shop No. 42, Main Market<br/>Laxmi Nagar, Delhi 110092</p>
              </div>
            </div>
            <div className="store-info-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <div>
                <p style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>Opening Hours</p>
                <p>Mon - Sat: 10:00 AM - 9:00 PM<br/>Sunday: Closed</p>
              </div>
            </div>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: 'var(--space-4)', alignSelf: 'flex-start' }}>
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* Floating Customer Reviews Section */}
      <section className="section" style={{ paddingBottom: 'var(--space-16)' }}>
        <div className="container section-header" style={{ textAlign: 'center' }}>
          <h2>Loved by Readers</h2>
        </div>
        <div className="reviews-container">
          <div className="reviews-marquee">
            {/* Duplicated list for seamless infinite scroll effect */}
            {[...Array(2)].map((_, listIndex) => (
              <React.Fragment key={listIndex}>
                <div className="review-card">
                  <div className="review-stars">★★★★★</div>
                  <p className="review-text">"Found exactly what I was looking for! The pre-loved books are in pristine condition and prices are unbeatable."</p>
                  <p className="review-author">— Anjali S.</p>
                </div>
                <div className="review-card">
                  <div className="review-stars">★★★★½</div>
                  <p className="review-text">"Bhaiya ke paas novels aur books ki best collection hai Laxmi Nagar mein. Prices bhi bohot sahi hain!"</p>
                  <p className="review-author">— Rahul M.</p>
                </div>
                <div className="review-card">
                  <div className="review-stars">★★★★☆</div>
                  <p className="review-text">"Classmate se badhia quality ke registers milte hain yahan 120/kg ke hisaab se. Perfect for college students!"</p>
                  <p className="review-author">— Priya K.</p>
                </div>
                <div className="review-card">
                  <div className="review-stars">★★★★★</div>
                  <p className="review-text">"A hidden gem. Ordered a stack of thrillers and they arrived perfectly packaged the very next day. Brilliant service."</p>
                  <p className="review-author">— Sameer D.</p>
                </div>
                <div className="review-card">
                  <div className="review-stars">★★★★½</div>
                  <p className="review-text">"Purani books bilkul nayi jaisi condition mein milti hain. Must visit agar aapko padhne ka shauk hai."</p>
                  <p className="review-author">— Vikas T.</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
