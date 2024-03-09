import express from "express"
import { createOrder, deleteOrder, fetchAllOrders, fetchOrdersByUser, updateOrder } from "../controller/Order.js";

const orderRouter = express.Router();
//  /orders is already added in base path
orderRouter.post('/', createOrder)
      .get('/own/', fetchOrdersByUser)
      .delete('/:id', deleteOrder)
      .patch('/:id', updateOrder)
      .get('/', fetchAllOrders)


export default orderRouter;