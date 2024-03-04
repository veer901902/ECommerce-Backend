
import express from "express"
import {createCategory, fetchCategories } from "../controller/Category.js";

const categoryRouter = express.Router();

categoryRouter.get('/', fetchCategories)
              .post("/", createCategory)


export default categoryRouter;