
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { mockPlants } from '../services/api';
import PlantImage from '../components/PlantImage';
import WeatherWidget from '../components/WeatherWidget';
import './Dashboard.css';

// Mock data for dashboard statistics
const mockStats = {
  totalOrders: 12,
  totalSpent: 45999,
  plantsOwned: 8,
  favoriteCategory: 'Indoor Plants'
};

// Mock recent orders
const mockRecentOrders = [
  {
    id: 1,
    orderNumber: 'ORD-2024-001',
    date: '2024-01-15',
    status: 'Delivered',
    total: 15999,
    items: 3
  },
  {
    id: 2,
    orderNumber: 'ORD-2024-002',
    date: '2024-01-10',
    status: 'Shipped',
    total: 11999,
    items: 1
  }
];

// Plant care tips
const plantCareTips = [
  {
    id: 1,
    title: "Watering Schedule",
    tip: "Most houseplants prefer to dry out slightly between waterings. Check soil moisture with your finger!",
    icon: "💧"
  },
  {
    id: 2,
    title: "Light Requirements",
    tip: "Bright, indirect light is perfect for most indoor plants. Avoid direct sunlight which can scorch leaves.",
    icon: "☀️"
  },
  {
    id: 3,
    title: "Humidity Levels",
    tip: "Group plants together or use a humidifier to increase humidity, especially during winter months.",
    icon: "🌿"
  }
];


export default function Dashboard() {
  const { user } = useAuth();
  const { addToCart, cartCount } = useCart();
  const [featuredPlants, setFeaturedPlants] = useState([]);
  const [addedItems, setAddedItems] = useState(new Set());

  useEffect(() => {
    // Get featured plants (first 4 plants)
    setFeaturedPlants(mockPlants.slice(0, 4));
  }, []);

  const handleQuickAdd = (plant) => {
    addToCart(plant);
    setAddedItems(prev => new Set([...prev, plant.id]));

    // Remove the "added" state after 2 seconds
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(plant.id);
        return newSet;
      });
    }, 2000);
  };

  const formatCurrency = (amount) => {
    return `NPR ${amount.toLocaleString()}`;
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>{getGreeting()}, {user?.name || 'Plant Lover'}! 🌱</h1>
          <p>Welcome to your Plant Paradise dashboard. Discover, care for, and grow your plant collection.</p>
        </div>
        <div className="quick-stats">
          <div className="stat-card">
            <div className="stat-icon">🛒</div>
            <div className="stat-info">
              <div className="stat-number">{cartCount}</div>
              <div className="stat-label">Items in Cart</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-info">
              <div className="stat-number">{mockStats.totalOrders}</div>
              <div className="stat-label">Total Orders</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🌿</div>
            <div className="stat-info">
              <div className="stat-number">{mockStats.plantsOwned}</div>
              <div className="stat-label">Plants Owned</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <div className="stat-number">{formatCurrency(mockStats.totalSpent)}</div>
              <div className="stat-label">Total Spent</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions & Weather */}
      <div className="dashboard-row">
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-cards">
            <Link to="/plants" className="action-card">
              <div className="action-icon">🛍️</div>
              <div className="action-content">
                <h3>Browse Plants</h3>
                <p>Discover new plants for your collection</p>
              </div>
            </Link>
            <Link to="/cart" className="action-card">
              <div className="action-icon">🛒</div>
              <div className="action-content">
                <h3>View Cart</h3>
                <p>Review items and checkout</p>
              </div>
            </Link>
            <Link to="/orders" className="action-card">
              <div className="action-icon">📋</div>
              <div className="action-content">
                <h3>My Orders</h3>
                <p>Track your plant deliveries</p>
              </div>
            </Link>
            <Link to="/profile" className="action-card">
              <div className="action-icon">👤</div>
              <div className="action-content">
                <h3>Profile</h3>
                <p>Manage your account settings</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="weather-section">
          <WeatherWidget />
        </div>
      </div>

      {/* Featured Plants */}
      <div className="featured-section">
        <div className="section-header">
          <h2>Featured Plants</h2>
          <Link to="/plants" className="view-all-link">View All →</Link>
        </div>
        <div className="featured-plants">
          {featuredPlants.map(plant => (
            <div key={plant.id} className="featured-plant-card">
              <div className="plant-image-container">
                <PlantImage src={plant.image} alt={plant.name} />
                <button
                  className={`quick-add-btn ${addedItems.has(plant.id) ? 'added' : ''}`}
                  onClick={() => handleQuickAdd(plant)}
                  disabled={addedItems.has(plant.id)}
                >
                  {addedItems.has(plant.id) ? '✅' : '🛒'}
                </button>
              </div>
              <div className="plant-info">
                <h3>{plant.name}</h3>
                <p className="plant-price">{formatCurrency(plant.price)}</p>
                <div className="plant-meta">
                  <span className="care-level">{plant.careLevel}</span>
                  <span className="category">{plant.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="recent-orders">
        <div className="section-header">
          <h2>Recent Orders</h2>
          <Link to="/orders" className="view-all-link">View All →</Link>
        </div>
        <div className="orders-list">
          {mockRecentOrders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-info">
                <div className="order-number">{order.orderNumber}</div>
                <div className="order-date">{new Date(order.date).toLocaleDateString()}</div>
              </div>
              <div className="order-details">
                <div className="order-items">{order.items} items</div>
                <div className="order-total">{formatCurrency(order.total)}</div>
              </div>
              <div className={`order-status status-${order.status.toLowerCase()}`}>
                {order.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plant Care Tips */}
      <div className="care-tips">
        <h2>Plant Care Tips</h2>
        <div className="tips-grid">
          {plantCareTips.map(tip => (
            <div key={tip.id} className="tip-card">
              <div className="tip-icon">{tip.icon}</div>
              <div className="tip-content">
                <h3>{tip.title}</h3>
                <p>{tip.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="newsletter-section">
        <div className="newsletter-content">
          <h2>🌱 Stay Updated with Plant Paradise</h2>
          <p>Get weekly plant care tips, new arrivals, and exclusive offers delivered to your inbox!</p>
          <div className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email address"
              className="newsletter-input"
            />
            <button className="newsletter-btn">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
}
