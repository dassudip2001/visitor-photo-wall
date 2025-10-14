import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";

export function createApp() {
  const app = express();
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  // Serve static files (big screen / camera client)
  app.use(express.static("public"));

  // Socket.io connection
  io.on("connection", (socket: Socket) => {
    console.log("Client connected:", socket.id);

    socket.on("send-image", (dataURL: string) => {
      console.log("Received image from camera:", socket.id);
      // Broadcast to all other clients
      socket.broadcast.emit("new-image", dataURL);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return { app, server, io };
}
