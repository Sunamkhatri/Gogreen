// Plant Controller for mock/demo
export const mockPlants = [
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
  // ...add more mock plants as needed
];

export const getAllPlants = (req, res) => {
  res.json(mockPlants);
};

export const getPlantById = (req, res) => {
  const plant = mockPlants.find(p => p.id === parseInt(req.params.id));
  if (!plant) return res.status(404).json({ message: 'Plant not found' });
  res.json(plant);
};
