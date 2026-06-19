"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Book } from '@/lib/inventory';

export interface CartItem {
  book: Book;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (book: Book, quantity: number) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('minibookbazaar_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
  }, []);

  // Save to localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('minibookbazaar_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (book: Book, quantity: number) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.book.id === book.id);
      if (existingItem) {
        // If it exists, update quantity (capped at stock)
        return prev.map(item => 
          item.book.id === book.id 
            ? { ...item, quantity: Math.min(item.quantity + quantity, book.stock) } 
            : item
        );
      }
      // Add new item
      return [...prev, { book, quantity }];
    });
  };

  const removeFromCart = (bookId: string) => {
    setCartItems(prev => prev.filter(item => item.book.id !== bookId));
  };

  const updateQuantity = (bookId: string, quantity: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.book.id === bookId) {
        return { ...item, quantity: Math.max(1, Math.min(quantity, item.book.stock)) };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce((total, item) => total + (item.book.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
