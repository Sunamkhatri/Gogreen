import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useParams } from 'react-router-dom';
import { mockPlants } from '../services/api';
import './PlantDetail.css';

const PlantDetail = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const handleAddToCart = () => {
    if (plant && plant.inStock) {
      addToCart(plant);
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    }
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundPlant = mockPlants.find(p => p.id === parseInt(id));
      setPlant(foundPlant);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="plant-detail-page">
        <div className="loading">Loading plant details...</div>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="plant-detail-page">
        <div className="error">Plant not found</div>
      </div>
    );
  }

  return (
    <div className="plant-detail-page">
      <div className="plant-detail-container">
        <div className="plant-image">
          <img src={plant.image} alt={plant.name} />
        </div>

        <div className="plant-info">
          <h1 className="plant-title">{plant.name}</h1>
          <div className="plant-price">NPR {plant.price.toLocaleString()}</div>
          <div className="plant-description">
            <p>{plant.description}</p>
          </div>

          <div className="plant-specs">
            <div className="spec-item">
              <span className="spec-label">Category:</span>
              <span className="spec-value">{plant.category}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Care Level:</span>
              <span className="spec-value">{plant.careLevel}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Size:</span>
              <span className="spec-value">{plant.size}</span>
            </div>
          </div>

          <button
            className="btn btn-primary add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={!plant.inStock || added}
            style={{ marginTop: '1.5rem', minWidth: 160 }}
          >
            {plant.inStock ? (added ? 'Added!' : 'Add to Cart') : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantDetail; 