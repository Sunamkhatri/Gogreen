// Cart Controller for mock/demo
import { mockPlants } from './plantController.js';

let cart = [];

export const getCart = (req, res) => {
  res.json(cart);
};

export const addToCart = (req, res) => {
  const { plantId, quantity } = req.body;
  const plant = mockPlants.find(p => p.id === plantId);
  if (!plant) return res.status(404).json({ message: 'Plant not found' });
  const existing = cart.find(item => item.plant.id === plantId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ plant, quantity });
  }
  res.json(cart);
};

export const updateCartItem = (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;
  const item = cart.find(item => item.plant.id === parseInt(itemId));
  if (!item) return res.status(404).json({ message: 'Item not found' });
  item.quantity = quantity;
  res.json(cart);
};

export const removeFromCart = (req, res) => {
  const { itemId } = req.params;
  cart = cart.filter(item => item.plant.id !== parseInt(itemId));
  res.json(cart);
};

export const clearCart = (req, res) => {
  cart = [];
  res.json(cart);
};
