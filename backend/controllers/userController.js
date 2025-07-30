// User Controller for mock/demo
const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: '$2a$10$mockhashedpassword'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: '$2a$10$mockhashedpassword'
  }
];

export const getProfile = (req, res) => {
  // For demo, just return the first user
  res.json(users[0]);
};

export const updateProfile = (req, res) => {
  const { name, email } = req.body;
  users[0].name = name || users[0].name;
  users[0].email = email || users[0].email;
  res.json(users[0]);
};
