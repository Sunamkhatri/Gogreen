import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Each item: { plant, quantity }

  // Add item to cart
  const addToCart = (plant, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.plant.id === plant.id);
      if (existing) {
        return prev.map(item =>
          item.plant.id === plant.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { plant, quantity }];
    });
  };

  // Remove item from cart
  const removeFromCart = (plantId) => {
    setCart(prev => prev.filter(item => item.plant.id !== plantId));
  };

  // Update item quantity
  const updateQuantity = (plantId, quantity) => {
    setCart(prev =>
      prev.map(item =>
        item.plant.id === plantId ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
