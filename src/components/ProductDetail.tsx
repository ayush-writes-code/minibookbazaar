"use client";

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Book } from '@/lib/inventory';
import { useCart } from '@/context/CartContext';
import { ExtraBookDetails } from '@/lib/bookApi';

export default function ProductDetail({ book, allBooks, extraDetails }: { book: Book, allBooks: Book[], extraDetails?: ExtraBookDetails }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedCondition, setSelectedCondition] = useState<'Good' | 'New'>(
    book.condition.toLowerCase().includes('new') ? 'New' : 'Good'
  );
  const [showToast, setShowToast] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();

  const basePrice = book.price;
  const goodPrice = book.condition.toLowerCase().includes('new') ? Math.round(basePrice * 0.6) : basePrice;
  const newPrice = book.condition.toLowerCase().includes('new') ? basePrice : Math.round(basePrice * 1.6);
  const currentPrice = selectedCondition === 'New' ? newPrice : goodPrice;

  const relatedBooks = allBooks
    .filter(b => b.category === book.category && b.id !== book.id)
    .slice(0, 4);

  const increaseQuantity = () => {
    if (quantity < book.stock) setQuantity(q => q + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(q => q - 1);
  };

  const handleAddToCart = () => {
    addToCart(book, quantity);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div className="product-page">
      {/* Breadcrumbs */}
      <div className="container breadcrumbs">
        <Link href="/">Home</Link> &rsaquo; <Link href="/shop">Shop</Link> &rsaquo; <span className="current">{book.title}</span>
      </div>

      <div className="container product-layout section">
        {/* Image Column */}
        <div className="product-image-col">
          <div className="product-cover">
            <Image src={book.imageUrl} alt={book.title} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} priority />
          </div>
        </div>

        {/* Details Column */}
        <div className="product-details-col">
          <div className="book-meta large">
            <span className="category-tag">{book.category}</span>
            <span className={`condition-tag ${selectedCondition === 'New' ? 'new' : 'preloved'}`}>{selectedCondition}</span>
          </div>
          
          <h1 className="product-title">{book.title}</h1>
          <p className="product-author">by {book.author}</p>
          
          {extraDetails?.averageRating && (
            <div className="product-rating" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#e59819' }}>
              <span className="stars">
                {'★'.repeat(Math.round(extraDetails.averageRating))}
                {'☆'.repeat(5 - Math.round(extraDetails.averageRating))}
              </span>
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                {extraDetails.averageRating} ({extraDetails.ratingsCount} ratings)
              </span>
            </div>
          )}

          <div className="product-price price-group" style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 'var(--space-4) 0' }}>
            <span className="price">₹{currentPrice}</span>
            {book.originalPrice && <span className="original-price" style={{ fontSize: '1rem', fontWeight: 'normal' }}>₹{book.originalPrice}</span>}
            {book.originalPrice && book.originalPrice > currentPrice && (
              <span className="discount-badge" style={{ position: 'relative', top: 'auto', right: 'auto', display: 'inline-block', marginLeft: '10px' }}>
                Save {Math.round((1 - currentPrice / book.originalPrice) * 100)}%
              </span>
            )}
          </div>

          <div className="condition-selector">
            <div 
              className={`condition-option ${selectedCondition === 'Good' ? 'selected' : ''}`}
              onClick={() => setSelectedCondition('Good')}
            >
              <div className="condition-option-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                Good
              </div>
              <div className="condition-option-price">₹ {goodPrice}</div>
            </div>
            <div 
              className={`condition-option ${selectedCondition === 'New' ? 'selected' : ''}`}
              onClick={() => setSelectedCondition('New')}
            >
              <div className="condition-option-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M12 13l-3-3m0 0l3-3m-3 3h8"/></svg>
                New
              </div>
              <div className="condition-option-price">₹ {newPrice}</div>
            </div>
          </div>

          <div className="quality-checks-box">
            <div className="quality-checks-header">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
              {selectedCondition === 'Good' ? '32 Quality Checks' : '100% Brand New'}
            </div>
            <ul className="quality-checks-list">
              {selectedCondition === 'Good' ? (
                <>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
                    <span><strong>Spine :</strong> The spine is undamaged, however there are noticeable creases.<br/>• Dried up Spine</span>
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
                    <span><strong>Inside :</strong> Could be light toned pages.<br/>• Highlighted spots may be present</span>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
                    <span><strong>Condition :</strong> Brand new, unused and unread condition.</span>
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
                    <span><strong>Authenticity :</strong> Sourced directly from publishers or authorized distributors.</span>
                  </li>
                </>
              )}
            </ul>
          </div>
          
          <p className="product-description">{book.description}</p>

          <div className="book-attributes" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', margin: 'var(--space-6) 0', padding: 'var(--space-4)', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)' }}>
            <div><span style={{ color: 'var(--color-text-tertiary)' }}>Publisher:</span> {extraDetails?.publisher || book.publisher || 'Unknown'}</div>
            <div><span style={{ color: 'var(--color-text-tertiary)' }}>Published Year:</span> {extraDetails?.publishedDate || book.publishedYear || 'Unknown'}</div>
            <div><span style={{ color: 'var(--color-text-tertiary)' }}>Pages:</span> {extraDetails?.pageCount || book.pages || 'Unknown'}</div>
            <div><span style={{ color: 'var(--color-text-tertiary)' }}>Condition:</span> {selectedCondition}</div>
            {extraDetails?.averageRating && (
              <div style={{ gridColumn: '1 / -1' }}>
                <span style={{ color: 'var(--color-text-tertiary)' }}>Rating:</span> ⭐ {extraDetails.averageRating} / 5 ({extraDetails.ratingsCount} reviews)
              </div>
            )}
          </div>
          
          <div className="product-availability">
            {book.stock > 0 ? (
              <span className="in-stock">✓ In Stock ({book.stock} available)</span>
            ) : (
              <span className="out-of-stock">✗ Out of Stock</span>
            )}
          </div>
          
          <div className="product-actions">
            <div className="product-quantity" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
              <span style={{ fontWeight: 500 }}>Quantity:</span>
              <div className="quantity-selector" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <button 
                  className="btn btn-secondary btn-sm" 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity <= 1 || book.stock === 0}
                >-</button>
                <span style={{ width: '30px', textAlign: 'center' }}>{book.stock === 0 ? 0 : quantity}</span>
                <button 
                  className="btn btn-secondary btn-sm" 
                  onClick={() => setQuantity(q => Math.min(book.stock, q + 1))}
                  disabled={quantity >= book.stock || book.stock === 0}
                >+</button>
              </div>
              <span className="stock-status" style={{ fontSize: 'var(--text-sm)', color: book.stock > 0 ? 'var(--color-text-secondary)' : '#c94b4b' }}>
                {book.stock > 0 ? `${book.stock} in stock` : 'Out of stock'}
              </span>
            </div>
            
            <div className="action-buttons">
              <button 
                className="btn btn-primary" 
                disabled={book.stock === 0}
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <button 
                className="btn btn-secondary whatsapp-btn" 
                disabled={book.stock === 0}
                onClick={() => {
                  addToCart(book, quantity);
                  router.push('/cart');
                }}
              >
                Buy Now via WhatsApp
              </button>
            </div>
          </div>
          
          <div className="trust-badges-container">
            <div className="trust-badge-item">
              <div className="trust-badge-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div className="trust-badge-text">7 Million +<br/>Happy Customers</div>
            </div>
            <div className="trust-badge-item">
              <div className="trust-badge-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
              </div>
              <div className="trust-badge-text">100% Original<br/>Products</div>
            </div>
            <div className="trust-badge-item">
              <div className="trust-badge-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <path d="M9 12l2 2 4-4"></path>
                </svg>
              </div>
              <div className="trust-badge-text">32 Points<br/>Quality Check</div>
            </div>
          </div>
        </div>
      </div>

      {/* Review / Snippet Section */}
      {extraDetails?.snippet && (
        <section className="product-review section container" style={{ marginTop: '0', paddingTop: '0' }}>
          <div className="section-header">
            <h2>About this edition</h2>
          </div>
          <div className="card" style={{ padding: 'var(--space-6)' }}>
            <p style={{ fontStyle: 'italic', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>"{extraDetails?.snippet}"</p>
          </div>
        </section>
      )}

      {/* Product Details Section */}
      <section className="product-details-specs section container" style={{ marginTop: '0', paddingTop: '0' }}>
        <div className="section-header">
          <h2>Product Details</h2>
        </div>
        <div className="card" style={{ padding: 'var(--space-6)' }}>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
            <li><strong>Publisher:</strong> {extraDetails?.publisher || book.publisher || 'Unknown'}</li>
            <li><strong>Publication Date:</strong> {extraDetails?.publishedDate || book.publishedYear || 'Unknown'}</li>
            <li><strong>Language:</strong> {extraDetails?.language ? extraDetails.language.toUpperCase() : 'EN'}</li>
            <li><strong>Pages:</strong> {extraDetails?.pageCount || book.pages || 'Unknown'}</li>
            <li><strong>ISBN:</strong> {extraDetails?.isbn || book.isbn || 'N/A'}</li>
            <li><strong>Condition:</strong> {selectedCondition}</li>
          </ul>
        </div>
      </section>

      {/* Related Books */}
      {relatedBooks.length > 0 && (
        <section className="related-books section container">
          <div className="section-header">
            <h2>You might also like</h2>
          </div>
          <div className="book-grid">
            {relatedBooks.map((relatedBook) => (
              <Link href={`/shop/${relatedBook.id}`} key={relatedBook.id} className="book-card card">
                <div className="book-cover">
                  <Image src={relatedBook.imageUrl} alt={relatedBook.title} fill sizes="(max-width: 768px) 50vw, 25vw" style={{ objectFit: 'cover' }} />
                </div>
                <div className="book-info">
                  <h3>{relatedBook.title}</h3>
                  <p className="author">{relatedBook.author}</p>
                  <div className="price-action">
                    <span className="price">₹{relatedBook.price}</span>
                    <button className="btn btn-secondary btn-sm">View</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Animated Toast Notification */}
      <div className={`toast ${showToast ? 'show' : ''}`}>
        <div className="toast-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
        <div className="toast-content">
          <span className="toast-title">Added to Cart</span>
          <span className="toast-subtitle">{quantity}x {book.title}</span>
        </div>
      </div>
    </div>
  );
}
