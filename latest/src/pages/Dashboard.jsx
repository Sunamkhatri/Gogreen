
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Dashboard.css';


const products = [
  {
    id: 1,
    name: 'Monstera Deliciosa',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400',
  },
  {
    id: 2,
    name: 'Fiddle Leaf Fig',
    image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400',
  },
  {
    id: 3,
    name: 'Snake Plant',
    image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400',
  },
  {
    id: 4,
    name: 'Peace Lily',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400',
  },
  {
    id: 5,
    name: 'ZZ Plant',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400',
  },
];


export default function Dashboard() {
  const { user, logout } = useAuth();
  const { addToCart, cart, cartCount } = useCart();
  const getProductQuantity = (productId) => {
    const item = cart.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };
  return (
    <div className="dashboard-container">
      <h2>Welcome, {user?.name || 'User'}!</h2>
      <p>This is your dashboard.</p>
      <div style={{marginBottom: 16, fontWeight: 500}}>
        Cart Items: {cartCount}
      </div>
      <div className="dashboard-products">
        {products.map(product => (
          <div key={product.id} className="dashboard-product-card">
            <img src={product.image} alt={product.name} className="dashboard-product-img" />
            <div className="dashboard-product-name">{product.name}</div>
            <button className="dashboard-add-btn" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
            {getProductQuantity(product.id) > 0 && (
              <div className="dashboard-product-qty">In Cart: {getProductQuantity(product.id)}</div>
            )}
          </div>
        ))}
      </div>
      <button onClick={logout} className="logout-button">Logout</button>
    </div>
  );
}
