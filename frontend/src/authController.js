/**
 * Authentication Controller
 * 
 * This file contains authentication functions for user login.
 * Note: This is currently set up for a frontend environment with mock data.
 * For production use, this should be moved to a backend server with proper database integration.
 * 
 * Dependencies: bcryptjs, jsonwebtoken
 */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// Note: User model import commented out as this appears to be a frontend project
// import User from '../models/User.js';

const login = async (req, res) => {
    try {
        if (req.body.email == null) {
            return res.status(400).json({ message: "Email is required" });
        }
        if (req.body.password == null) {
            return res.status(400).json({ message: "Password is required" });
        }
        
        // Note: This would need a proper User model in a backend environment
        // const user = await User.findOne({ email: req.body.email });
        // if (!user) {
        //     return res.status(400).json({ message: "User not found" });
        // }
        
        // For now, we'll simulate user authentication
        // In a real backend, you would use the User model above
        const mockUser = {
            _id: 'mock-user-id',
            email: req.body.email,
            name: 'Mock User',
            password: '$2a$10$mockhashedpassword' // This would be the hashed password from database
        };
        
        // Verify password
        const isPasswordValid = await bcrypt.compare(req.body.password, mockUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }
        
        // Generate JWT token
        // Use import.meta.env for Vite environment variables, with fallback
        const jwtSecret = import.meta.env?.VITE_JWT_SECRET || 'your-secret-key';
        const token = jwt.sign(
            { userId: mockUser._id, email: mockUser.email },
            jwtSecret,
            { expiresIn: '24h' }
        );
        
        // Return success response with token
        res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                id: mockUser._id,
                email: mockUser.email,
                name: mockUser.name
            }
        });
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export { login };