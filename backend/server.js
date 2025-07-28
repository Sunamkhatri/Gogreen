import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authRoutes from './routes/auth.js';
import plantRoutes from './routes/plant.js';
import userRoutes from './routes/user.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/order.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Mock database
const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: '$2a$10$mockhashedpassword' // In real app, this would be properly hashed
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: '$2a$10$mockhashedpassword'
  }
];

const plants = [
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
  {
    id: 2,
    name: 'Fiddle Leaf Fig',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400',
    description: 'Popular indoor tree with large, glossy leaves',
    category: 'Indoor',
    careLevel: 'Medium',
    size: 'Large',
    inStock: true
  },
  {
    id: 3,
    name: 'Snake Plant',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400',
    description: 'Low-maintenance plant perfect for beginners',
    category: 'Indoor',
    careLevel: 'Easy',
    size: 'Small',
    inStock: false
  }
];

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!', timestamp: new Date().toISOString() });
});

// Use the new auth routes
app.use('/api/auth', authRoutes);
app.use('/api/plants', plantRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Get all plants (public)
app.get('/api/plants', (req, res) => {
  res.json({
    message: 'Plants retrieved successfully',
    plants
  });
});

// Get single plant (public)
app.get('/api/plants/:id', (req, res) => {
  const plantId = parseInt(req.params.id);
  const plant = plants.find(p => p.id === plantId);

  if (!plant) {
    return res.status(404).json({ message: 'Plant not found' });
  }

  res.json({
    message: 'Plant retrieved successfully',
    plant
  });
});

// Protected route example
app.get('/api/profile', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.userId);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({
    message: 'Profile retrieved successfully',
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`API Documentation:`);
  console.log(`- POST /api/auth/register - Register new user`);
  console.log(`- POST /api/auth/login - Login user`);
  console.log(`- GET /api/plants - Get all plants`);
  console.log(`- GET /api/plants/:id - Get single plant`);
  console.log(`- GET /api/profile - Get user profile (protected)`);
}); 