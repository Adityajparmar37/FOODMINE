import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import cors from "cors";
import foodRouter from "./routers/food.router.js";
import userRouter from "./routers/user.router.js";
import orderRouter from "./routers/order.router.js";
import uploadRouter from "./routers/upload.router.js";
import { dbconnect } from "./config/database.config.js";

//databse connection
dbconnect();

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log("serving on port " + PORT);
});
