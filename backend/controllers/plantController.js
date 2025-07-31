// Plant Controller for mock/demo
export const mockPlants = [
  {
    id: 1,
    name: 'Monstera Deliciosa',
    price: 1899,
    image: '/assets/plants/monstera.jpg',
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
    image: '/assets/plants/fiddle-leaf-fig.jpg',
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
    image: '/assets/plants/snake-plant.jpg',
    description: 'Low-maintenance plant perfect for beginners',
    category: 'Indoor',
    careLevel: 'Easy',
    size: 'Small',
    inStock: true
  },
  {
    id: 4,
    name: 'Peace Lily',
    price: 1499,
    image: '/assets/plants/peace-lily.jpg',
    description: 'Elegant flowering plant that purifies indoor air',
    category: 'Indoor',
    careLevel: 'Easy',
    size: 'Medium',
    inStock: true
  },
  {
    id: 5,
    name: 'ZZ Plant',
    price: 1699,
    image: '/assets/plants/zz-plant.jpg',
    description: 'Drought-tolerant plant with glossy leaves',
    category: 'Indoor',
    careLevel: 'Easy',
    size: 'Medium',
    inStock: false
  },
  {
    id: 6,
    name: 'Pothos',
    price: 999,
    image: '/assets/plants/pothos.jpg',
    description: 'Trailing vine plant perfect for hanging baskets',
    category: 'Indoor',
    careLevel: 'Easy',
    size: 'Small',
    inStock: true
  },
  {
    id: 7,
    name: 'Aloe Vera',
    price: 899,
    image: '/assets/plants/aloe-vera.jpg',
    description: 'Medicinal succulent with healing properties',
    category: 'Succulents',
    careLevel: 'Easy',
    size: 'Small',
    inStock: true
  },
  {
    id: 8,
    name: 'Spider Plant',
    price: 799,
    image: '/assets/plants/spider-plant.jpg',
    description: 'Air-purifying plant with cascading leaves',
    category: 'Indoor',
    careLevel: 'Easy',
    size: 'Small',
    inStock: true
  },
  {
    id: 9,
    name: 'Chinese Evergreen',
    price: 1599,
    image: '/assets/plants/chinese-evergreen.jpg',
    description: 'Colorful foliage plant perfect for low light',
    category: 'Indoor',
    careLevel: 'Easy',
    size: 'Medium',
    inStock: true
  },
  {
    id: 10,
    name: 'Jade Plant',
    price: 1199,
    image: '/assets/plants/jade-plant.jpg',
    description: 'Lucky succulent that brings prosperity',
    category: 'Succulents',
    careLevel: 'Easy',
    size: 'Small',
    inStock: true
  },
  {
    id: 11,
    name: 'Philodendron',
    price: 1799,
    image: '/assets/plants/philodendron.jpg',
    description: 'Heart-shaped leaves with trailing vines',
    category: 'Indoor',
    careLevel: 'Easy',
    size: 'Medium',
    inStock: true
  },
  {
    id: 12,
    name: 'Cactus Collection',
    price: 1499,
    image: '/assets/plants/cactus-collection.jpg',
    description: 'Set of 3 beautiful desert cacti',
    category: 'Succulents',
    careLevel: 'Easy',
    size: 'Small',
    inStock: true
  }
];

export const getAllPlants = (req, res) => {
  res.json(mockPlants);
};

export const getPlantById = (req, res) => {
  const plant = mockPlants.find(p => p.id === parseInt(req.params.id));
  if (!plant) return res.status(404).json({ message: 'Plant not found' });
  res.json(plant);
};
