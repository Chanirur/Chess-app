import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";

dotenv.config(); // Load environment variables

const app = express();

app.use(express.json()); // Middleware to parse JSON requests

app.use("/auth", authRoutes); // Use the /auth routes

export default app;
