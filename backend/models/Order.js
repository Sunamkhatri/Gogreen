import React, { createContext, useState, useContext } from 'react';

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]); // Each order: { id, user, items, total, status, createdAt }

  // Place a new order
  const placeOrder = (user, items, total) => {
    const newOrder = {
      id: Date.now(),
      user,
      items,
      total,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setOrders(prev => [...prev, newOrder]);
    return newOrder;
  };

  // Get all orders for a user
  const getUserOrders = (userId) => orders.filter(order => order.user.id === userId);

  return (
    <OrderContext.Provider value={{ orders, placeOrder, getUserOrders }}>
      {children}
    </OrderContext.Provider>
  );
};
