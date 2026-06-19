"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Book } from "@/lib/inventory";

export default function HeroSearch({ books }: { books: Book[] }) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLFormElement>(null);

  const filteredBooks = query.length > 1 
    ? books.filter(b => b.title.toLowerCase().includes(query.toLowerCase()) || b.author.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowSuggestions(false);
      router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSuggestionClick = (bookId: string) => {
    setShowSuggestions(false);
    router.push(`/shop/${bookId}`);
  };

  return (
    <form className="search-bar" onSubmit={handleSearch} ref={searchRef} style={{ position: 'relative' }}>
      <input 
        type="text" 
        placeholder="Search by title, author, or category..." 
        className="search-input"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
      />
      <button type="submit" className="btn btn-primary">Search</button>

      {showSuggestions && filteredBooks.length > 0 && (
        <div className="search-suggestions" style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'var(--color-bg-primary)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-lg)',
          marginTop: 'var(--space-2)',
          zIndex: 50,
          maxHeight: '300px',
          overflowY: 'auto',
          border: '1px solid var(--color-border)'
        }}>
          {filteredBooks.map((book) => (
            <div 
              key={book.id} 
              className="suggestion-item"
              onClick={() => handleSuggestionClick(book.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                padding: 'var(--space-3)',
                borderBottom: '1px solid var(--color-border)',
                cursor: 'pointer',
                transition: 'background 0.2s',
                color: 'var(--color-text-primary)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <div style={{ position: 'relative', width: '40px', height: '60px', flexShrink: 0, backgroundColor: '#E8DFD5' }}>
                <Image src={book.imageUrl} alt={book.title} fill sizes="40px" style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{book.title}</div>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>by {book.author}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </form>
  );
}
