import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import cookieParser from "cookie-parser";
import http from "http";
import { WebSocketServer } from "ws";
import handleWebSocketConnections from "./ws/ws"; // Import the WebSocket handler

dotenv.config(); // Load environment variables

const app = express();
const server = http.createServer(app); // Create HTTP server

const wss = new WebSocketServer({ server, path: '/ws' }); // Create WebSocket server using HTTP server

// Use the imported WebSocket handler
handleWebSocketConnections(wss);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes); // Use the /auth routes

export default server; // Export the HTTP server for use in server.ts
