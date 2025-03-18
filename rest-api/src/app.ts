import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import cookieParser from "cookie-parser";

dotenv.config(); // Load environment variables

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes); // Use the /auth routes

export default app;
