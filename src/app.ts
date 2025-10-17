import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import { connectDb } from "./db/database";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import cors from "cors";
import { Image } from "./models/Image";

dotenv.config();

export async function createApp() {
  // Connect to DB first
  await connectDb();

  // Initialize Express and Socket.IO
  const app = express();
  const server = http.createServer(app);

  // Security middleware
  app.use(helmet());
  app.use(cors());
  app.use(compression());
  app.use(express.json({ limit: "10mb" })); // To handle large image payloads
  // Body parsing middleware
  app.use(express.urlencoded({ extended: true }));

  // logging middleware
  app.use(morgan("combined"));

  const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  // Serve static files (for clients)
  app.use(express.static("public"));

  // Health check endpoint
  app.get("/health", (req, res) => {
    res.status(200).json({
      status: "OK",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  //  Socket.io events
  io.on("connection", (socket: Socket) => {
    console.log("Client connected:", socket.id);

    socket.on("send-image", async (data: { image: string; client: number }) => {
      console.log("Received image from camera:", socket.id, data);

      try {
        // Example: save to DB (pseudo, replace with your actual model)
        // await Image.create({ dataURL });
        // await Image.create({ dataURL });

        // Broadcast to all other clients
        socket.broadcast.emit("new-image", data.image);
        // io.to(`client-${data.client}`).emit("new-image", data.image);
      } catch (error) {
        console.error("Error saving image:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return { app, server, io };
}
