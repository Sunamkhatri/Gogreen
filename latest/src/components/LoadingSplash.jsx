import React from 'react';
import './LoadingSplash.css';

const LoadingSplash = () => (
  <div className="splash-bg">
    <div className="splash-logo">🌱</div>
    <div className="splash-loader">
      <div className="loader"></div>
      <div className="splash-text">Loading...</div>
    </div>
  </div>
);

export default LoadingSplash;
