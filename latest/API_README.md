# Plant Paradise API - Backend Setup & Postman Testing

This guide will help you set up the backend server and test it with Postman.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
# Start the server
npm run server

# Or for development with auto-restart
npm run dev:server
```

The server will start on `http://localhost:5000`

## 📋 Available Endpoints

### Health Check
- **GET** `/api/health` - Check if server is running

### Authentication
- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Login user

### Plants (Public)
- **GET** `/api/plants` - Get all plants
- **GET** `/api/plants/:id` - Get plant by ID

### Protected Routes
- **GET** `/api/profile` - Get user profile (requires authentication)

## 🔧 Postman Setup

### Option 1: Import Collection (Recommended)
1. Open Postman
2. Click "Import" button
3. Select the file: `Plant_Paradise_API.postman_collection.json`
4. The collection will be imported with all endpoints ready to test

### Option 2: Manual Setup
If you prefer to create requests manually, here are the details:

#### Environment Variables
Create a new environment in Postman with these variables:
- `baseUrl`: `http://localhost:5000`
- `authToken`: (leave empty, will be set automatically)

## 🧪 Testing with Postman

### 1. Health Check
- **Method**: GET
- **URL**: `{{baseUrl}}/api/health`
- **Expected Response**: `{"message": "Server is running!", "timestamp": "..."}`

### 2. Register User
- **Method**: POST
- **URL**: `{{baseUrl}}/api/auth/register`
- **Headers**: `Content-Type: application/json`
- **Body** (raw JSON):
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```
- **Expected Response**: 201 with user data and JWT token

### 3. Login User
- **Method**: POST
- **URL**: `{{baseUrl}}/api/auth/login`
- **Headers**: `Content-Type: application/json`
- **Body** (raw JSON):
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Expected Response**: 200 with user data and JWT token

### 4. Get All Plants
- **Method**: GET
- **URL**: `{{baseUrl}}/api/plants`
- **Expected Response**: 200 with array of plants

### 5. Get Plant by ID
- **Method**: GET
- **URL**: `{{baseUrl}}/api/plants/1`
- **Expected Response**: 200 with single plant data

### 6. Get User Profile (Protected)
- **Method**: GET
- **URL**: `{{baseUrl}}/api/profile`
- **Headers**: `Authorization: Bearer {{authToken}}`
- **Expected Response**: 200 with user profile data

## 🔐 Authentication Flow

1. **Register** or **Login** to get a JWT token
2. The token is automatically saved to the `authToken` variable
3. Use the token in the `Authorization` header for protected routes
4. Format: `Bearer <your-token>`

## 📝 Sample Test Data

### Pre-existing Users
- Email: `john@example.com`, Password: `password123`
- Email: `jane@example.com`, Password: `password123`

### Available Plants
- ID: 1 - Monstera Deliciosa
- ID: 2 - Fiddle Leaf Fig
- ID: 3 - Snake Plant

## 🛠️ Troubleshooting

### Common Issues

1. **Server won't start**
   - Check if port 5000 is available
   - Try: `lsof -i :5000` to see what's using the port
   - Change PORT in server.js if needed

2. **CORS errors**
   - The server includes CORS middleware
   - If you still get CORS errors, check your Postman settings

3. **Authentication fails**
   - Make sure you're using the correct email/password
   - Check that the token is properly set in the Authorization header
   - Verify the token format: `Bearer <token>`

4. **Import fails in Postman**
   - Make sure you're using the latest version of Postman
   - Try copying the JSON content manually

## 🔄 Development

### Adding New Endpoints
1. Add the route in `server.js`
2. Update this README with the new endpoint details
3. Add the request to the Postman collection

### Environment Variables
- `PORT`: Server port (default: 5000)
- `JWT_SECRET`: Secret key for JWT tokens (default: 'your-secret-key')

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [JWT Documentation](https://jwt.io/)
- [Postman Learning Center](https://learning.postman.com/)

---

Happy testing! 🌱 