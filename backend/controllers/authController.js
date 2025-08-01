import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

let cart = [];
let orders = [];
// Add plant (PostgreSQL)
export const addPlant = async (req, res) => {
  const { name, price, image, description, category, careLevel, size, inStock } = req.body;
  if (!name || !price) {
    return res.status(400).json({ message: 'Name and price are required' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO plants (name, price, image, description, category, careLevel, size, inStock) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
      [name, price, image, description, category, careLevel, size, inStock !== undefined ? inStock : true]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error adding plant', error: err.message });
  }
};

// Delete plant (PostgreSQL)
export const deletePlant = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM plants WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Plant not found' });
    res.json({ message: 'Plant deleted', plant: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting plant', error: err.message });
  }
};

// PLANT CONTROLLER
export const getAllPlants = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM plants');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving plants', error: err.message });
  }
};

export const getPlantById = async (req, res) => {
  try {
    const plantId = parseInt(req.params.id);
    const result = await pool.query('SELECT * FROM plants WHERE id = $1', [plantId]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Plant not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving plant', error: err.message });
  }
};

// CART CONTROLLER
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

// ORDER CONTROLLER
export const getOrders = (req, res) => {
  res.json(orders);
};

export const createOrder = (req, res) => {
  const { items, total } = req.body;
  const newOrder = {
    id: orders.length + 1,
    items,
    total,
    date: new Date().toISOString(),
    status: 'Placed'
  };
  orders.push(newOrder);
  cart = [];
  res.status(201).json(newOrder);
};

// USER CONTROLLER
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING *',
      [name, email, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) return res.status(401).json({ message: 'Invalid credentials' });
    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};

export const getProfile = async (req, res) => {
  const userId = req.user.userId;
  try {
    const result = await pool.query('SELECT id, name, email FROM users WHERE id = $1', [userId]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving profile', error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  const userId = req.user.userId;
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email',
      [name, email, userId]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile', error: err.message });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: (users.length + 1).toString(),
      name,
      email,
      password: hashedPassword
    };
    users.push(newUser);
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 