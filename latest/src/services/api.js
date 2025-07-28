import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Plant API endpoints
export const plantAPI = {
  // Get all plants (no token required)
  getAllPlants: () => api.get('/plants'),
  
  // Get single plant (no token required)
  getPlant: (id) => api.get(`/plants/${id}`),
  
  // Search plants (no token required)
  searchPlants: (query) => api.get(`/plants/search?q=${query}`),
  
  // Get plants by category (no token required)
  getPlantsByCategory: (category) => api.get(`/plants/category/${category}`),
};

// Cart API endpoints (token required)
export const cartAPI = {
  // Get user's cart
  getCart: () => api.get('/cart'),
  
  // Add item to cart
  addToCart: (plantId, quantity = 1) => api.post('/cart/items', { plantId, quantity }),
  
  // Update cart item quantity
  updateCartItem: (itemId, quantity) => api.put(`/cart/items/${itemId}`, { quantity }),
  
  // Remove item from cart
  removeFromCart: (itemId) => api.delete(`/cart/items/${itemId}`),
  
  // Clear cart
  clearCart: () => api.delete('/cart'),
};

// Order API endpoints (token required)
export const orderAPI = {
  // Get user's orders
  getOrders: () => api.get('/orders'),
  
  // Get single order
  getOrder: (orderId) => api.get(`/orders/${orderId}`),
  
  // Create new order
  createOrder: (orderData) => api.post('/orders', orderData),
  
  // Cancel order
  cancelOrder: (orderId) => api.put(`/orders/${orderId}/cancel`),
};

// User API endpoints (token required)
export const userAPI = {
  // Get user profile
  getProfile: () => api.get('/user/profile'),
  
  // Update user profile
  updateProfile: (profileData) => api.put('/user/profile', profileData),
  
  // Change password
  changePassword: (passwordData) => api.put('/user/password', passwordData),
  
  // Get user addresses
  getAddresses: () => api.get('/user/addresses'),
  
  // Add new address
  addAddress: (addressData) => api.post('/user/addresses', addressData),
  
  // Update address
  updateAddress: (addressId, addressData) => api.put(`/user/addresses/${addressId}`, addressData),
  
  // Delete address
  deleteAddress: (addressId) => api.delete(`/user/addresses/${addressId}`),
};

// NOTE: Place the following images in src/assets/plants/ with the given filenames.
// Example: src/assets/plants/monstera.jpg
export const mockPlants = [
  {
    id: 1,
    name: 'Monstera Deliciosa',
    price: 1899,
    image: './assets/plants/monstera.jpg',
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
    image: './assets/plants/fiddle-leaf-fig.jpg',
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
    image: './assets/plants/snake-plant.jpg',
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
    image: './assets/plants/peace-lily.jpg',
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
    image: './assets/plants/zz-plant.jpg',
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
    image: './assets/plants/pothos.jpg',
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
    image: './assets/plants/aloe-vera.jpg',
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
    image: './assets/plants/spider-plant.jpg',
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
    image: './assets/plants/chinese-evergreen.jpg',
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
    image: './assets/plants/jade-plant.jpg',
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
    image: './assets/plants/philodendron.jpg',
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
    image: './assets/plants/cactus-collection.jpg',
    description: 'Set of 3 beautiful desert cacti',
    category: 'Succulents',
    careLevel: 'Easy',
    size: 'Small',
    inStock: true
  }
];

export default api; 