import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import authRoutes from './routes/auth.js';
import plantRoutes from './routes/plant.js';
import userRoutes from './routes/user.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/order.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/plantdb'
});

// Middleware
app.use(cors());
app.use(express.json());

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

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
app.get('/api/plants', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM plants');
    res.json({ message: 'Plants retrieved successfully', plants: result.rows });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving plants', error: err.message });
  }
});

// Get single plant (public)
app.get('/api/plants/:id', async (req, res) => {
  try {
    const plantId = parseInt(req.params.id);
    const result = await pool.query('SELECT * FROM plants WHERE id = $1', [plantId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    res.json({ message: 'Plant retrieved successfully', plant: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving plant', error: err.message });
  }
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