import React, { useState, useEffect } from 'react';
import { mockPlants } from '../services/api';
import './Admin.css';

const Admin = () => {
  const [plants, setPlants] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setPlants(mockPlants);
    // TODO: Replace with real API call for orders
    setOrders([{ id: 1, items: ['Monstera'], total: 1899, status: 'Placed' }]);
  }, []);

  const restockPlant = (id) => {
    setPlants(plants => plants.map(p => p.id === id ? { ...p, inStock: true } : p));
    // TODO: Add API call to update backend
  };

  return (
    <div className="admin-page">
      <h2>Admin Panel</h2>
      <div className="admin-section">
        <h3>Restock Products</h3>
        <ul>
          {plants.map(plant => (
            <li key={plant.id}>
              {plant.name} - {plant.inStock ? 'In Stock' : 'Out of Stock'}
              {!plant.inStock && (
                <button onClick={() => restockPlant(plant.id)} className="btn btn-primary" style={{marginLeft:8}}>Restock</button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="admin-section">
        <h3>View Orders</h3>
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              Order #{order.id} - Items: {order.items.join(', ')} - Total: NPR {order.total} - Status: {order.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
