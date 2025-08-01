import React, { useState, useEffect } from 'react';
import './WeatherWidget.css';

const WeatherWidget = () => {
  const [weather, setWeather] = useState({
    temperature: 24,
    humidity: 65,
    condition: 'Partly Cloudy',
    icon: '⛅',
    plantCareAdvice: 'Perfect weather for watering your plants!'
  });

  // Mock weather data - in a real app, you'd fetch from a weather API
  useEffect(() => {
    const mockWeatherData = [
      {
        temperature: 24,
        humidity: 65,
        condition: 'Partly Cloudy',
        icon: '⛅',
        plantCareAdvice: 'Perfect weather for watering your plants!'
      },
      {
        temperature: 28,
        humidity: 45,
        condition: 'Sunny',
        icon: '☀️',
        plantCareAdvice: 'High temperature - check soil moisture more frequently.'
      },
      {
        temperature: 18,
        humidity: 80,
        condition: 'Rainy',
        icon: '🌧️',
        plantCareAdvice: 'High humidity - reduce watering frequency.'
      }
    ];

    // Simulate changing weather
    const randomWeather = mockWeatherData[Math.floor(Math.random() * mockWeatherData.length)];
    setWeather(randomWeather);
  }, []);

  const getHumidityColor = (humidity) => {
    if (humidity < 40) return '#e53e3e'; // Red for low humidity
    if (humidity < 60) return '#dd6b20'; // Orange for medium humidity
    return '#38a169'; // Green for good humidity
  };

  const getTemperatureColor = (temp) => {
    if (temp < 15) return '#3182ce'; // Blue for cold
    if (temp < 25) return '#38a169'; // Green for ideal
    return '#e53e3e'; // Red for hot
  };

  return (
    <div className="weather-widget">
      <div className="weather-header">
        <h3>🌤️ Plant Care Weather</h3>
        <div className="weather-location">Kathmandu, Nepal</div>
      </div>
      
      <div className="weather-main">
        <div className="weather-icon">{weather.icon}</div>
        <div className="weather-info">
          <div className="temperature" style={{ color: getTemperatureColor(weather.temperature) }}>
            {weather.temperature}°C
          </div>
          <div className="condition">{weather.condition}</div>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Humidity</span>
          <span className="detail-value" style={{ color: getHumidityColor(weather.humidity) }}>
            {weather.humidity}%
          </span>
        </div>
        <div className="humidity-bar">
          <div 
            className="humidity-fill" 
            style={{ 
              width: `${weather.humidity}%`,
              backgroundColor: getHumidityColor(weather.humidity)
            }}
          ></div>
        </div>
      </div>

      <div className="plant-advice">
        <div className="advice-icon">💡</div>
        <div className="advice-text">{weather.plantCareAdvice}</div>
      </div>
    </div>
  );
};

export default WeatherWidget;
