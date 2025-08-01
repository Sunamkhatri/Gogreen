-- Plant Paradise Sample Data
-- Run this after creating the schema

-- Insert categories
INSERT INTO categories (name, description) VALUES
('Indoor Plants', 'Perfect plants for indoor environments'),
('Outdoor Plants', 'Plants that thrive in outdoor conditions'),
('Succulents', 'Low-maintenance drought-resistant plants'),
('Flowering Plants', 'Beautiful plants that produce flowers'),
('Herbs', 'Edible and aromatic plants for cooking')
ON CONFLICT (name) DO NOTHING;

-- Insert sample plants
INSERT INTO plants (name, description, price, image, category_id, care_level, size, in_stock, stock_quantity) VALUES
('Monstera Deliciosa', 'Beautiful Swiss cheese plant with distinctive leaf holes. Perfect for bright, indirect light.', 1899.00, '/assets/plants/monstera.jpg', 1, 'Easy', 'Medium', true, 25),
('Fiddle Leaf Fig', 'Popular indoor tree with large, glossy leaves. A statement piece for any room.', 1999.00, '/assets/plants/fiddle-leaf-fig.jpg', 1, 'Medium', 'Large', true, 15),
('Snake Plant', 'Low-maintenance plant perfect for beginners. Tolerates low light and infrequent watering.', 1299.00, '/assets/plants/snake-plant.jpg', 1, 'Easy', 'Small', true, 40),
('Peace Lily', 'Elegant plant with white flowers. Great for improving indoor air quality.', 1599.00, '/assets/plants/peace-lily.jpg', 1, 'Medium', 'Medium', true, 20),
('ZZ Plant', 'Extremely hardy plant that can survive in almost any condition. Perfect for offices.', 1399.00, '/assets/plants/zz-plant.jpg', 1, 'Easy', 'Small', true, 30),
('Spider Plant', 'Easy-to-grow plant that produces baby plants. Great for hanging baskets.', 999.00, '/assets/plants/spider-plant.jpg', 1, 'Easy', 'Small', true, 35),
('Pothos', 'Trailing vine plant perfect for shelves and hanging baskets. Very forgiving.', 899.00, '/assets/plants/pothos.jpg', 1, 'Easy', 'Small', true, 50),
('Aloe Vera', 'Medicinal succulent with healing properties. Great for sunny windowsills.', 799.00, '/assets/plants/aloe-vera.jpg', 3, 'Easy', 'Small', true, 45),
('Chinese Evergreen', 'Colorful foliage plant that tolerates low light conditions beautifully.', 1699.00, '/assets/plants/chinese-evergreen.jpg', 1, 'Medium', 'Medium', true, 18),
('Jade Plant', 'Lucky succulent that brings prosperity. Easy to care for and long-lasting.', 1199.00, '/assets/plants/jade-plant.jpg', 3, 'Easy', 'Small', true, 25),
('Philodendron', 'Heart-shaped leaves with trailing vines. Perfect for beginners.', 1799.00, '/assets/plants/philodendron.jpg', 1, 'Easy', 'Medium', true, 22),
('Cactus Collection', 'Set of 3 beautiful desert cacti in decorative pots. Very low maintenance.', 1499.00, '/assets/plants/cactus-collection.jpg', 3, 'Easy', 'Small', true, 12)
ON CONFLICT DO NOTHING;

-- Insert sample users (passwords are hashed for 'password123')
INSERT INTO users (name, email, password, role) VALUES
('John Doe', 'john@example.com', '$2a$10$rOzJqQZQZQZQZQZQZQZQZOzJqQZQZQZQZQZQZQZQZOzJqQZQZQZQZQ', 'user'),
('Jane Smith', 'jane@example.com', '$2a$10$rOzJqQZQZQZQZQZQZQZQZOzJqQZQZQZQZQZQZQZQZOzJqQZQZQZQZQ', 'user'),
('Admin User', 'admin@plantparadise.com', '$2a$10$rOzJqQZQZQZQZQZQZQZQZOzJqQZQZQZQZQZQZQZQZOzJqQZQZQZQZQ', 'admin'),
('Plant Lover', 'plantlover@example.com', '$2a$10$rOzJqQZQZQZQZQZQZQZQZOzJqQZQZQZQZQZQZQZQZOzJqQZQZQZQZQ', 'user')
ON CONFLICT (email) DO NOTHING;

-- Insert sample orders (using the first user's ID)
DO $$
DECLARE
    user_uuid UUID;
    order_uuid UUID;
BEGIN
    -- Get the first user's ID
    SELECT id INTO user_uuid FROM users WHERE email = 'john@example.com' LIMIT 1;
    
    IF user_uuid IS NOT NULL THEN
        -- Insert first order
        INSERT INTO orders (id, user_id, order_number, status, subtotal, tax, total, shipping_address)
        VALUES (
            uuid_generate_v4(),
            user_uuid,
            'ORD-2024-001',
            'delivered',
            3198.00,
            415.74,
            3613.74,
            '{"street": "123 Main St", "city": "Kathmandu", "state": "Bagmati", "zipCode": "44600"}'
        ) RETURNING id INTO order_uuid;
        
        -- Insert order items for first order
        INSERT INTO order_items (order_id, plant_id, quantity, price) VALUES
        (order_uuid, 1, 2, 1899.00),
        (order_uuid, 3, 1, 1299.00);
        
        -- Insert second order
        INSERT INTO orders (id, user_id, order_number, status, subtotal, tax, total, shipping_address)
        VALUES (
            uuid_generate_v4(),
            user_uuid,
            'ORD-2024-002',
            'shipped',
            1999.00,
            259.87,
            2258.87,
            '{"street": "123 Main St", "city": "Kathmandu", "state": "Bagmati", "zipCode": "44600"}'
        ) RETURNING id INTO order_uuid;
        
        -- Insert order items for second order
        INSERT INTO order_items (order_id, plant_id, quantity, price) VALUES
        (order_uuid, 2, 1, 1999.00);
    END IF;
END $$;

-- Insert sample reviews
DO $$
DECLARE
    user_uuid UUID;
BEGIN
    SELECT id INTO user_uuid FROM users WHERE email = 'jane@example.com' LIMIT 1;
    
    IF user_uuid IS NOT NULL THEN
        INSERT INTO reviews (user_id, plant_id, rating, comment) VALUES
        (user_uuid, 1, 5, 'Amazing plant! The leaves are so beautiful and it''s growing really well.'),
        (user_uuid, 3, 4, 'Perfect for beginners. Very low maintenance and looks great.'),
        (user_uuid, 5, 5, 'This plant is indestructible! Perfect for my office.');
    END IF;
END $$;
