import Order from "../model/Order.js";

export const createOrder = async (req, res) => {
    try {
      const order = await Order.create(req.body);
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json(error);
    }
  };
  
  export const fetchOrdersByUser = async (req, res) => {
    const { user } = req.query;
    try {
      const orders = await Order.find({ user: user });
  
      res.status(200).json(orders);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  
  export const updateOrder = async (req, res) => {
    const { id } = req.params;
    try {
      const order = await Cart.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(order);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  
  export const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
      const doc = await Order.findByIdAndDelete(id);
      res.status(200).json(doc);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  