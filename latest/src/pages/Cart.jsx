import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cartAPI, mockPlants } from '../services/api';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [purchased, setPurchased] = useState(false);

  // Mock cart data for demonstration
  const mockCartItems = [
      plantId: 1,
      quantity: 2,
      plant: mockPlants[0] // Monstera Deliciosa
    },
    {
      id: 2,
      plantId: 3,
      quantity: 1,
      plant: mockPlants[2] // Snake Plant
    }
  ];

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      // In a real app, you would use: const response = await cartAPI.getCart();
      // For now, using mock data
      setTimeout(() => {
        setCartItems(mockCartItems);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to load cart. Please try again.');
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      // In a real app, you would use: await cartAPI.updateCartItem(itemId, newQuantity);
      setCartItems(prev => 
        prev.map(item => 
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      setError('Failed to update quantity. Please try again.');
    }
  };

  const removeItem = async (itemId) => {
    try {
      // In a real app, you would use: await cartAPI.removeFromCart(itemId);
      setCartItems(prev => prev.filter(item => item.id !== itemId));
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './Cart.css';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [purchased, setPurchased] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

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
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-list">
            {cart.map(item => (
              <div key={item.product.id} className="cart-item">
                <img src={item.product.image} alt={item.product.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.product.name}</div>
                  <div className="cart-item-price">NPR {item.product.price}</div>
                  <div className="cart-item-qty">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
                  </div>
                  <button className="cart-item-remove" onClick={() => removeFromCart(item.product.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <strong>Total: NPR {total}</strong>
          </div>
          <button className="cart-purchase-btn" onClick={handlePurchase}>Purchase</button>
        </>
      )}
    </div>
  );
}
    } catch (err) {
      setError('Failed to remove item. Please try again.');
    }
  };

  const clearCart = async () => {
    try {
      // In a real app, you would use: await cartAPI.clearCart();
      setCartItems([]);
    } catch (err) {
      setError('Failed to clear cart. Please try again.');
    }
  };

  const applyPromoCode = () => {
    if (promoCode.trim().toUpperCase() === 'PLANT20') {
      setDiscount(0.2); // 20% discount
      setPromoError('');
    } else {
      setDiscount(0);
      setPromoError('Invalid promo code');
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      // Ensure price per plant does not exceed 2000
      const cappedPrice = Math.min(item.plant.price, 2000);
      return total + (cappedPrice * item.quantity);
    }, 0);
  };

  const calculateDiscount = () => {
    return calculateSubtotal() * discount;
  };

  const calculateTax = () => {
    return (calculateSubtotal() - calculateDiscount()) * 0.13;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount() + calculateTax();
  };

  const handlePurchase = () => {
    setPurchased(true);
    clearCart();
  };

  if (loading) {
    return (
      <div className="cart-page">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cart-page">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

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
        {cartItems.length > 0 && (
          <button onClick={clearCart} className="btn btn-danger clear-cart-btn">
            Clear Cart
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
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
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.plant.image} alt={item.plant.name} />
                </div>
                
                <div className="item-details">
                  <h3 className="item-name">{item.plant.name}</h3>
                  <p className="item-description">{item.plant.description}</p>
                  <div className="item-price">NPR {item.plant.price.toLocaleString()}</div>
                </div>
                
                <div className="item-quantity">
                  <label>Quantity:</label>
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="quantity-btn"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="item-total">
                  <div className="item-total-price">
                    NPR {(item.plant.price * item.quantity).toLocaleString()}
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
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
};

export default Cart;