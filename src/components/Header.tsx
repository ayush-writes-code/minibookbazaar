"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo">
          <Link href="/">Mini Book Bazaar</Link>
        </div>
        <nav className="nav">
          <Link 
            href="/shop" 
            className="nav-link" 
            style={pathname.startsWith('/shop') ? { color: 'var(--color-accent-primary)' } : {}}
          >
            Shop
          </Link>
          <Link 
            href="/cart" 
            className="nav-link"
            style={pathname === '/cart' ? { color: 'var(--color-accent-primary)' } : {}}
          >
            Cart {mounted && totalItems > 0 && `(${totalItems})`}
          </Link>
        </nav>
      </div>
    </header>
  );
}
