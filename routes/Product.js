import { createProduct, fetchAllProducts, fetchProductById, updateProduct } from "../controller/Product.js";

import express from "express"

const productRouter = express.Router();

productRouter.post('/', createProduct)
             .get('/', fetchAllProducts)
             .get('/:id', fetchProductById)
             .patch('/:id', updateProduct)


export default productRouter;