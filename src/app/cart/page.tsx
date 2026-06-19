"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import '@/app/globals.css';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    preference: 'Delivery',
  });

  const handleCheckout = () => {
    if (!formData.name || !formData.phone) {
      alert("Please provide your name and phone number.");
      return;
    }

    const orderLines = cartItems.map(
      item => `${item.quantity}x ${item.book.title} - ₹${item.book.price * item.quantity}`
    ).join('\n');

    const message = `Hello Mini Book Bazaar! I'd like to place an order:

${orderLines}

*Subtotal: ₹${subtotal}*

Name: ${formData.name}
Phone: ${formData.phone}
Preference: ${formData.preference}
${formData.preference === 'Delivery' ? `Address: ${formData.address}` : ''}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/918178038016?text=${encodedMessage}`, '_blank');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container section empty-state" style={{ marginTop: 'var(--space-12)' }}>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any books yet.</p>
        <Link href="/shop" className="btn btn-primary">Browse Books</Link>
      </div>
    );
  }

  return (
    <div className="container section cart-layout">
      <div className="cart-items">
        <h1 style={{ marginBottom: 'var(--space-8)' }}>Your Cart ({totalItems} items)</h1>
        
        {cartItems.map((item) => (
          <div key={item.book.id} className="cart-item">
            <div className="cart-item-img" style={{ backgroundImage: `url(${item.book.imageUrl})` }}></div>
            <div className="cart-item-details">
              <h3>{item.book.title}</h3>
              <p className="cart-item-author">{item.book.author}</p>
              <div className="cart-item-actions">
                <div className="quantity-selector">
                  <button onClick={() => updateQuantity(item.book.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.book.id, item.quantity + 1)}>+</button>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.book.id)}>Remove</button>
              </div>
            </div>
            <div className="cart-item-price">
              ₹{item.book.price * item.quantity}
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary card">
        <h2>Order Summary</h2>
        <div className="summary-row">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <p className="shipping-note">Shipping calculated via WhatsApp.</p>
        
        <div className="checkout-form">
          <div className="form-group">
            <label>Full Name *</label>
            <input 
              type="text" 
              required
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label>Phone Number *</label>
            <input 
              type="tel" 
              required
              value={formData.phone} 
              onChange={e => setFormData({...formData, phone: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label>Preference</label>
            <select 
              value={formData.preference} 
              onChange={e => setFormData({...formData, preference: e.target.value})}
            >
              <option value="Delivery">Home Delivery</option>
              <option value="Store Pickup">Store Pickup (Laxmi Nagar)</option>
            </select>
          </div>
          {formData.preference === 'Delivery' && (
            <div className="form-group">
              <label>Delivery Address</label>
              <textarea 
                rows={3} 
                value={formData.address} 
                onChange={e => setFormData({...formData, address: e.target.value})} 
              />
            </div>
          )}
        </div>

        <button className="btn btn-primary whatsapp-btn" style={{ width: '100%' }} onClick={handleCheckout}>
          Send Order on WhatsApp
        </button>
      </div>
    </div>
  );
}
