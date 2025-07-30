import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [purchased, setPurchased] = useState(false);

  // Calculate subtotal
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  // Calculate discount
  const calculateDiscount = () => {
    return calculateSubtotal() * discount;
  };

  // Calculate VAT (13%)
  const calculateTax = () => {
    return (calculateSubtotal() - calculateDiscount()) * 0.13;
  };

  // Calculate total
  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount() + calculateTax();
  };

  // Handle promo code
  const applyPromoCode = () => {
    if (promoCode.trim().toUpperCase() === 'PLANT20') {
      setDiscount(0.2); // 20% discount
      setPromoError('');
    } else {
      setDiscount(0);
      setPromoError('Invalid promo code');
    }
  };

  // Handle purchase
  const handlePurchase = () => {
    setPurchased(true);
    clearCart();
  };

  if (purchased) {
    return (
      <div className="cart-container">
        <h2>Thank you for your purchase!</h2>
        <p>Your order has been placed successfully.</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        {cart.length > 0 && (
          <button onClick={clearCart} className="btn btn-danger clear-cart-btn">
            Clear Cart
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any plants to your cart yet.</p>
          <Link to="/plants" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-container">
          {/* Cart Items */}
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.product.id} className="cart-item">
                <div className="item-image">
                  <img src={item.product.image} alt={item.product.name} />
                </div>
                <div className="item-details">
                  <h3 className="item-name">{item.product.name}</h3>
                  <p className="item-description">{item.product.description}</p>
                  <div className="item-price">NPR {item.product.price.toLocaleString()}</div>
                </div>
                <div className="item-quantity">
                  <label>Quantity:</label>
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="quantity-btn"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="item-total">
                  <div className="item-total-price">
                    NPR {(item.product.price * item.quantity).toLocaleString()}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="btn btn-danger remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="promo-section">
              <input
                type="text"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={e => setPromoCode(e.target.value)}
                className="promo-input"
              />
              <button onClick={applyPromoCode} className="btn btn-secondary promo-btn">Apply</button>
              {promoError && <div className="promo-error">{promoError}</div>}
              {discount > 0 && <div className="promo-success">Promo code applied! 20% off</div>}
            </div>
            <div className="summary-item">
              <span>Subtotal:</span>
              <span>NPR {calculateSubtotal().toLocaleString()}</span>
            </div>
            {discount > 0 && (
              <div className="summary-item">
                <span>Discount:</span>
                <span>- NPR {calculateDiscount().toLocaleString()}</span>
              </div>
            )}
            <div className="summary-item">
              <span>VAT (13%):</span>
              <span>NPR {calculateTax().toLocaleString()}</span>
            </div>
            <div className="summary-item total">
              <span>Total:</span>
              <span>NPR {calculateTotal().toLocaleString()}</span>
            </div>
            <button className="btn btn-primary checkout-btn" onClick={handlePurchase}>
              Proceed to Checkout
            </button>
            <Link to="/plants" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}