// require("dotenv").config();
// const express = require("express");

// const mongoose = require("mongoose");
// const cors = require("cors");
// const http = require("http");
// const db = require("./config/db");
// const authRouter = require("./routes/authRoutes");
// const userRouter = require("./routes/userRoutes");
// const skillRouter = require("./routes/skillRoutes");

// const app = express();
// const server = http.createServer(app);

// // Middleware

// app.use(express.json());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: "GET,POST,PUT,DELETE",
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );
// // Routes
// app.use("/api/auth", authRouter);
// app.use("/api/user", userRouter);
// app.use("/api/skill", skillRouter);
// // Test Route

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io"); // Import Socket.io
const db = require("./config/db");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const skillRouter = require("./routes/skillRoutes");
const requestRouter = require("./routes/requestRoutes");
const chatRouter = require("./routes/chatRoutes");
const messageRouter = require("./routes/messageRoutes");
const paymentRoutes = require("./routes/paymentRoutes");


const app = express();
const server = http.createServer(app); // Create HTTP server

// Socket.io configuration
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

// Socket.io event handling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Example event for joining a chat
  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
  });

  // Example event for sending messages
  socket.on("sendMessage", (messageData) => {
    io.to(messageData.chatId).emit("receiveMessage", messageData);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/skill", skillRouter);
app.use("/api/request", requestRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);
app.use("/api/payment", paymentRoutes);
// Test Route
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
