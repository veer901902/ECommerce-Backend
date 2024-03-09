import Cart from "../model/Cart.js";

export const addToCart = async (req, res) => {
  const {id} = req.user;
  try {
    const query = await Cart.create({...req.body, user: id});
    const item = await query.populate("product");
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const fetchCartByUser = async (req, res) => {
  const { id } = req.user;
  try {
    const cartItems = await Cart.find({ user: id }).populate("product");

    res.status(200).json(cartItems);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const updateCart = async (req, res) => {
  const { id } = req.params;
  try {
    const query = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const cartItem = await query.populate("product");
    res.status(200).json(cartItem);
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
