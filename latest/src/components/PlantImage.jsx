import React, { useState } from 'react';
import './PlantImage.css';

const PlantImage = ({ src, alt, className = '', fallbackSrc = '/assets/plants/default-plant.jpg' }) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
    // Try fallback image if not already using it
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
  };

  return (
    <div className={`plant-image-container ${className}`}>
      {isLoading && (
        <div className="image-placeholder">
          <div className="loading-spinner"></div>
        </div>
      )}
      
      <img
        src={imageSrc}
        alt={alt}
        className={`plant-image ${isLoading ? 'loading' : ''} ${hasError ? 'error' : ''}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
      
      {hasError && imageSrc === fallbackSrc && (
        <div className="image-fallback">
          <span className="fallback-icon">🌱</span>
          <span className="fallback-text">Image not available</span>
        </div>
      )}
    </div>
  );
};

export default PlantImage;
