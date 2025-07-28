import express from 'express';

const router = express.Router();

// Mock data - replace with a real database
const users = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
    },
];

// GET /api/users/:id - Get user profile
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json({
        message: 'User profile retrieved successfully',
        user
    });
});

// PUT /api/users/:id - Update user profile
router.put('/:id', (req, res) => {
    // Logic to update user profile
    res.json({ message: `User ${req.params.id} updated successfully` });
});


export default router; 