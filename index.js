import express from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import productRouter from "./routes/Product.js";
import categoryRouter from "./routes/Category.js";
import brandRouter from "./routes/Brands.js";
import authRouter from "./routes/Auth.js";
import userRouter from "./routes/User.js";
import cartRouter from "./routes/Cart.js";
import orderRouter from "./routes/Order.js";
import passport from "passport";
import session from "express-session";
import bcrypt from "bcrypt";
import { cookieExtractor, isAuth, sanitizeUser } from "./services/common.js";
import User from "./model/User.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import cookieParser from "cookie-parser";

const SECRET_KEY = "SECRET_KEY";
// JWT options
const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = SECRET_KEY; // TODO: should not be in code;

app.use(express.static("build"));
app.use(cookieParser());

app.use(
  session({
    secret: "keyboard cat",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);
app.use(passport.authenticate("session"));

app.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);

app.use(express.json());

app.use("/products", isAuth(), productRouter);
app.use("/categories", isAuth(), categoryRouter);
app.use("/brands", isAuth(), brandRouter);
app.use("/users", isAuth(), userRouter);
app.use("/auth", authRouter);
app.use("/cart", isAuth(), cartRouter);
app.use("/orders", isAuth(), orderRouter);

// Passport Strategies
passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email", // Specify your custom field name here
    },
    async function (username, password, done) {
      try {
        const user = await User.findOne({ email: username });
        if (!user) {
          return done(null, false, { message: "invalid credentials" }); // for safety
        }

        // Compare the password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return done(null, false, { message: "invalid credentials" });
        }

        const token = jwt.sign(sanitizeUser(user), SECRET_KEY);
        done(null, { token }); // this line sends to serializer
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    // console.log({ jwt_payload });
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, sanitizeUser(user)); // this calls serializer
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

// this creates session variable req.user on being called from callbacks
passport.serializeUser(function (user, cb) {
  console.log("serialize", user);
  process.nextTick(function () {
    return cb(null, { id: user.id, role: user.role });
  });
});

// this changes session variable req.user when called from authorized request
passport.deserializeUser(function (user, cb) {
  console.log("de-serialize", user);
  process.nextTick(function () {
    return cb(null, user);
  });
});

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
  console.log("database connected");
}

app.get("/", (req, res) => {
  res.json({ message: "success" });
});

app.listen("8000", () => {
  console.log("Server connected");
});
