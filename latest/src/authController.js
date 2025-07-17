import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const login = async (req, res) => {
    try {
        if (req.body.email == null) {
            return res.status(400).json({ message: "Email is required" });
        }
        if (req.body.password == null) {
            return res.status(400).json({ message: "Password is required" });
        }
        
        
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