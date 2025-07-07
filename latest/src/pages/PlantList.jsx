import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockPlants } from '../services/api';
import AuthModal from '../components/AuthModal';
import './PlantList.css';

const PlantList = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated } = useAuth();

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
            <img src={plant.image} alt={plant.name} className="plant-image" />
            
            <div className="plant-info">
              <h3 className="plant-name">{plant.name}</h3>
              <p className="plant-description">{plant.description}</p>
              <div className="plant-price">NPR {plant.price.toLocaleString()}</div>
              
              <Link 
                to={`/plants/${plant.id}`} 
                className="btn btn-primary"
              >
                View Details
              </Link>
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