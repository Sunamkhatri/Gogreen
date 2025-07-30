// Order Controller for mock/demo
let orders = [];

export const getOrders = (req, res) => {
  res.json(orders);
};

export const createOrder = (req, res) => {
  const { items, total } = req.body;
  const newOrder = {
    id: orders.length + 1,
    items,
    total,
    date: new Date().toISOString(),
    status: 'Placed'
  };
  orders.push(newOrder);
  res.status(201).json(newOrder);
};
