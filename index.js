import express from "express";
import mongoose from "mongoose";
import productRouter from "./routes/Product.js";
import categoryRouter from "./routes/Category.js";
import brandRouter from "./routes/Brands.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);

app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/brands", brandRouter);

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
