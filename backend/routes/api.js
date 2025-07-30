import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

// Auth
router.post('/register', authController.register);
router.post('/login', authController.login);

// Plants
router.get('/plants', authController.getAllPlants);
router.get('/plants/:id', authController.getPlantById);
router.post('/plants', authController.addPlant); // Add plant
router.delete('/plants/:id', authController.deletePlant); // Delete plant

// Cart
router.get('/cart', authController.getCart);
router.post('/cart/items', authController.addToCart);
router.put('/cart/items/:itemId', authController.updateCartItem);
router.delete('/cart/items/:itemId', authController.removeFromCart);
router.delete('/cart', authController.clearCart);

// Orders
router.get('/orders', authController.getOrders);
router.post('/orders', authController.createOrder);

// User
router.get('/user/profile', authController.getProfile);
router.put('/user/profile', authController.updateProfile);

export default router;
