import React, { createContext, useState, useContext } from 'react';

const PlantContext = createContext();

export const usePlants = () => useContext(PlantContext);

export const PlantProvider = ({ children }) => {
  const [plants, setPlants] = useState([
    {
      id: 1,
      name: 'Monstera Deliciosa',
      price: 1899,
      image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400',
      description: 'Beautiful Swiss cheese plant with distinctive leaf holes',
      category: 'Indoor',
      careLevel: 'Easy',
      size: 'Medium',
      inStock: true
    },
    // ...add more plants as needed
  ]);

  // Add, update, delete plant functions here if needed

  return (
    <PlantContext.Provider value={{ plants, setPlants }}>
      {children}
    </PlantContext.Provider>
  );
};
