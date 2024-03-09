import express from "express";
import { checkUser, createUser, loginUser } from "../controller/Auth.js";
import passport from "passport";

const authRouter = express.Router();
//  /auth is already added in base path
authRouter
  .post("/signup", createUser)
  .post("/login", passport.authenticate("local"), loginUser)
  .get("/check", passport.authenticate("jwt"), checkUser);

export default authRouter;
