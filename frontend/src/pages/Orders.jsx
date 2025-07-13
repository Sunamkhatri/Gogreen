import React, { useState, useEffect } from 'react';
import { orderAPI } from '../services/api';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Mock orders data for demonstration
  const mockOrders = [
    {
      id: 1,
      orderNumber: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 15999,
      items: [
        { id: 1, name: 'Monstera Deliciosa', quantity: 2, price: 5999 },
        { id: 3, name: 'Snake Plant', quantity: 1, price: 3999 }
      ],
      shippingAddress: {
        street: '123 Main St',
        city: 'Kathmandu',
        state: 'Bagmati',
        zipCode: '44600'
      }
    },
    {
      id: 2,
      orderNumber: 'ORD-2024-002',
      date: '2024-01-10',
      status: 'Shipped',
      total: 11999,
      items: [
        { id: 2, name: 'Fiddle Leaf Fig', quantity: 1, price: 11999 }
      ],
      shippingAddress: {
        street: '123 Main St',
        city: 'Kathmandu',
        state: 'Bagmati',
        zipCode: '44600'
      }
    }
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // In a real app, you would use: const response = await orderAPI.getOrders();
      // For now, using mock data
      setTimeout(() => {
        setOrders(mockOrders);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to load orders. Please try again.');
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'status-delivered';
      case 'shipped':
        return 'status-shipped';
      case 'processing':
        return 'status-processing';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-pending';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="orders-page">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-page">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h1>My Orders</h1>
        <p>Track your plant orders and view order history</p>
      </div>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <div className="empty-orders-icon">📦</div>
          <h2>No orders yet</h2>
          <p>You haven't placed any orders yet. Start shopping to see your orders here!</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3 className="order-number">{order.orderNumber}</h3>
                  <p className="order-date">Ordered on {formatDate(order.date)}</p>
                </div>
                <div className={`order-status ${getStatusColor(order.status)}`}>
                  {order.status}
                </div>
              </div>

              <div className="order-items">
                <h4>Items:</h4>
                {order.items.map(item => (
                  <div key={item.id} className="order-item">
                    <span className="item-name">{item.name}</span>
                    <span className="item-quantity">x{item.quantity}</span>
                    <span className="item-price">NPR {item.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="order-details">
                <div className="shipping-address">
                  <h4>Shipping Address:</h4>
                  <p>
                    {order.shippingAddress.street}<br />
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                  </p>
                </div>

                <div className="order-total">
                  <span>Total:</span>
                  <span className="total-amount">NPR {order.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="order-actions">
                <button className="btn btn-secondary">View Details</button>
                {order.status === 'Shipped' && (
                  <button className="btn btn-primary">Track Package</button>
                )}
                {order.status === 'Processing' && (
                  <button className="btn btn-danger">Cancel Order</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders; 