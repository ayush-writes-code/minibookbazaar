"use client";

import Image from 'next/image';
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Book } from '@/lib/inventory';

export default function CatalogClient({ books }: { books: Book[] }) {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const initialCat = searchParams.get('category') || 'All';
  const initialCondition = searchParams.get('condition') || '';

  const [searchQuery, setSearchQuery] = useState(initialQ);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCat);
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const categories = ['All', ...Array.from(new Set(books.map(b => b.category)))];

  const filteredAndSortedBooks = useMemo(() => {
    let result = [...books];

    // Filter by search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(b => 
        b.title.toLowerCase().includes(q) || 
        b.author.toLowerCase().includes(q)
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(b => b.category === selectedCategory);
    }

    // Filter by condition if set via URL initially (we can just add it as a basic filter, or it could be a state)
    if (initialCondition) {
      result = result.filter(b => b.condition.includes(initialCondition));
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'title-a-z':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      // 'recommended' relies on default order
      default:
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy, books]);

  return (
    <div className="container catalog-layout section">
      <div className="mobile-filter-toggle">
        <button className="btn btn-secondary" onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={{ width: '100%' }}>
          {isSidebarOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>
      {/* Sidebar Filters */}
      <aside className={`catalog-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="filter-group">
          <h3>Search</h3>
          <input 
            type="text" 
            placeholder="Title, author..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <h3>Categories</h3>
          <ul className="category-list">
            {categories.map(cat => (
              <li key={cat}>
                <button 
                  className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="filter-group">
          <h3>Sort By</h3>
          <select 
            className="sort-select" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="recommended">Recommended</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="title-a-z">Title: A to Z</option>
          </select>
        </div>
      </aside>

      {/* Main Content */}
      <main className="catalog-main">
        <div className="catalog-header">
          <h1>All Books</h1>
          <p>{filteredAndSortedBooks.length} results</p>
        </div>

        {filteredAndSortedBooks.length === 0 ? (
          <div className="empty-state">
            <p>No books found matching your criteria.</p>
            <button className="btn btn-secondary" onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}>Clear Filters</button>
          </div>
        ) : (
          <div className="book-grid">
            {filteredAndSortedBooks.map((book) => (
              <Link href={`/shop/${book.id}`} key={book.id} className="book-card card">
                <div className="book-cover">
                  <Image src={book.imageUrl} alt={book.title} fill sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" style={{ objectFit: 'cover' }} />
                  {book.originalPrice && book.originalPrice > book.price && (
                    <span className="discount-badge">Save {Math.round((1 - book.price / book.originalPrice) * 100)}%</span>
                  )}
                </div>
                <div className="book-info">
                  <div className="book-meta">
                    <span className="category-tag">{book.category}</span>
                    <span className={`condition-tag ${book.condition === 'New' ? 'new' : 'preloved'}`}>{book.condition}</span>
                  </div>
                  <h3>{book.title}</h3>
                  <p className="author">{book.author}</p>
                  <div className="price-action">
                    <div className="price-group">
                      <span className="price">₹{book.price}</span>
                      {book.originalPrice && <span className="original-price">₹{book.originalPrice}</span>}
                    </div>
                    <button className="btn btn-primary btn-sm">View</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
