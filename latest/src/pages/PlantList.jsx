import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { mockPlants } from '../services/api';
import AuthModal from '../components/AuthModal';
import PlantImage from '../components/PlantImage';
import './PlantList.css';

const PlantList = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [addedItems, setAddedItems] = useState(new Set());
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPlants(mockPlants);
      setLoading(false);
    }, 500);
  }, []);

  const openAuthModal = () => {
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  const handleQuickAddToCart = (plant) => {
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }

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

  if (loading) {
    return (
      <div className="plant-list-page">
        <div className="loading">Loading plants...</div>
      </div>
    );
  }

  return (
    <div className="plant-list-page">
      <div className="plant-list-header">
        <h1>Our Plant Collection</h1>
        <p>Discover beautiful plants for your home</p>
        {!isAuthenticated && (
          <button onClick={openAuthModal} className="btn btn-primary">
            Login to Save Favorites
          </button>
        )}
      </div>

      <div className="plants-grid">
        {plants.map(plant => (
          <div key={plant.id} className="plant-card">
            <div className="plant-image-wrapper">
              <PlantImage src={plant.image} alt={plant.name} className="plant-image" />
              {plant.inStock && (
                <button
                  className={`quick-add-btn ${addedItems.has(plant.id) ? 'added' : ''}`}
                  onClick={() => handleQuickAddToCart(plant)}
                  disabled={addedItems.has(plant.id)}
                >
                  {addedItems.has(plant.id) ? '✅' : '🛒'}
                </button>
              )}
            </div>

            <div className="plant-info">
              <h3 className="plant-name">{plant.name}</h3>
              <p className="plant-description">{plant.description}</p>
              <div className="plant-meta">
                <div className="plant-price">NPR {plant.price.toLocaleString()}</div>
                <div className={`stock-status ${plant.inStock ? 'in-stock' : 'out-of-stock'}`}>
                  {plant.inStock ? '✅ In Stock' : '❌ Out of Stock'}
                </div>
              </div>

              <div className="plant-actions">
                <Link
                  to={`/plants/${plant.id}`}
                  className="btn btn-primary"
                >
                  View Details
                </Link>
                {plant.inStock && (
                  <button
                    className={`btn btn-secondary ${addedItems.has(plant.id) ? 'added' : ''}`}
                    onClick={() => handleQuickAddToCart(plant)}
                    disabled={addedItems.has(plant.id)}
                  >
                    {addedItems.has(plant.id) ? 'Added!' : 'Add to Cart'}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={closeAuthModal}
        initialMode="login"
      />
    </div>
  );
};

export default PlantList; 