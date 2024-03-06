import express from "express"
import { fetchUserById, updateUser } from "../controller/User.js";

const userRouter = express.Router();
//  /users is already added in base path
userRouter.get('/:id', fetchUserById)
      .patch('/:id', updateUser)

export default userRouter;
