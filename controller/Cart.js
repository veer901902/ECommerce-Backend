import Cart from "../model/Cart.js";

export const addToCart = async (req, res) => {
  try {
    const query = await Cart.create(req.body);
    const item = await query.populate("product");
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const fetchCartByUser = async (req, res) => {
  const { user } = req.query;
  try {
    const cartItems = await Cart.find({ user: user }).populate("product");

    res.status(200).json(cartItems);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const updateCart = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(cart);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const deleteFromCart = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Cart.findByIdAndDelete(id);
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};
