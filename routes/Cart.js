import express from "express";
import { addToCart, deleteFromCart, fetchCartByUser, updateCart } from "../controller/Cart.js";

const cartRouter = express.Router();
//  /products is already added in base path
cartRouter.post('/', addToCart)
      .get('/', fetchCartByUser)
      .delete('/:id', deleteFromCart)
      .patch('/:id', updateCart)


export default cartRouter;
