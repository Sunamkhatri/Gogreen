import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { mockPlants } from '../services/api';
import PlantImage from '../components/PlantImage';
import './PlantDetail.css';

const PlantDetail = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      const foundPlant = mockPlants.find(p => p.id === parseInt(id));
      setPlant(foundPlant);
      setLoading(false);
      setQuantity(1);
    }, 500);
  }, [id]);

  const handleAddToCart = () => {
    if (plant && plant.inStock && quantity > 0) {
      for (let i = 0; i < quantity; i++) {
        addToCart(plant);
      }
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    }
  };

  const handleQuantityChange = (val) => {
    if (val < 1) return;
    setQuantity(val);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = plant.image.startsWith('.') ? plant.image.replace('./', '/') : plant.image;
    link.download = plant.name.replace(/\s+/g, '_').toLowerCase() + '.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
          <PlantImage src={plant.image} alt={plant.name} />
          <button className="btn btn-secondary download-btn" onClick={handleDownload} style={{marginTop: '1rem', width: '100%'}}>
            📥 Download Image
          </button>
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

          <div className="quantity-selector" style={{ display: 'flex', alignItems: 'center', marginTop: '1.5rem', gap: 10 }}>
            <button
              className="btn btn-secondary"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              style={{ fontSize: 20, width: 36, height: 36 }}
            >
              -
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={e => handleQuantityChange(Number(e.target.value))}
              style={{ width: 50, textAlign: 'center', fontSize: 18, borderRadius: 6, border: '1px solid #ccc', height: 36 }}
              disabled={!plant.inStock}
            />
            <button
              className="btn btn-secondary"
              onClick={() => handleQuantityChange(quantity + 1)}
              style={{ fontSize: 20, width: 36, height: 36 }}
              disabled={!plant.inStock}
            >
              +
            </button>
          </div>
          <div className="action-buttons" style={{ marginTop: '1.5rem', display: 'flex', gap: '10px' }}>
            <button
              className="btn btn-primary add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={!plant.inStock || added}
              style={{ flex: 1, minWidth: 160 }}
            >
              {plant.inStock ? (added ? '✅ Added!' : '🛒 Add to Cart') : '❌ Out of Stock'}
            </button>
            <Link to="/cart" className="btn btn-secondary" style={{ padding: '12px 20px' }}>
              🛒 View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetail; 