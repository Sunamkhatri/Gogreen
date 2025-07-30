import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';


// In-memory data stores (start empty, add via API)
let users = [];
export let mockPlants = [];
let cart = [];
let orders = [];
// Add plant (for Postman/manual testing)
export const addPlant = (req, res) => {
  const { name, price, image, description, category, careLevel, size, inStock } = req.body;
  if (!name || !price) {
    return res.status(400).json({ message: 'Name and price are required' });
  }
  const newPlant = {
    id: mockPlants.length + 1,
    name,
    price,
    image: image || '',
    description: description || '',
    category: category || '',
    careLevel: careLevel || '',
    size: size || '',
    inStock: inStock !== undefined ? inStock : true
  };
  mockPlants.push(newPlant);
  res.status(201).json(newPlant);
};
// Delete plant (for Postman/manual testing)
export const deletePlant = (req, res) => {
  const { id } = req.params;
  const idx = mockPlants.findIndex(p => p.id === parseInt(id));
  if (idx === -1) return res.status(404).json({ message: 'Plant not found' });
  mockPlants.splice(idx, 1);
  res.json({ message: 'Plant deleted' });
};

// PLANT CONTROLLER
export const getAllPlants = (req, res) => {
  res.json(mockPlants);
};

export const getPlantById = (req, res) => {
  const plant = mockPlants.find(p => p.id === parseInt(req.params.id));
  if (!plant) return res.status(404).json({ message: 'Plant not found' });
  res.json(plant);
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
export const getProfile = (req, res) => {
  // For demo, just return the first user
  res.json(users[0]);
};

export const updateProfile = (req, res) => {
  const { name, email } = req.body;
  users[0].name = name || users[0].name;
  users[0].email = email || users[0].email;
  res.json(users[0]);
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