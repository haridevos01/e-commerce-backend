import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import orderRoutes from "./routes/order.routes.js";
import productRoutes from "./routes/product.routes.js";
dotenv.config();
connectDB();

const app =express();
app.use(cors());

app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/products",productRoutes);


app.listen(process.env.PORT,()=>console.log(`server running on port ${process.env.PORT}`))