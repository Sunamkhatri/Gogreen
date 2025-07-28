import express from 'express';
// Mock data - replace with a real database
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
];

const router = express.Router();

// GET /api/plants - Get all plants
router.get('/', (req, res) => {
    res.json({
        message: 'Plants retrieved successfully',
        plants
    });
});

// GET /api/plants/:id - Get a single plant by ID
router.get('/:id', (req, res) => {
    const plant = plants.find(p => p.id === parseInt(req.params.id));
    if (!plant) {
        return res.status(404).json({ message: 'Plant not found' });
    }
    res.json({
        message: 'Plant retrieved successfully',
        plant
    });
});


export default router; 