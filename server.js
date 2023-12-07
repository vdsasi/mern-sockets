const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const cors = require("cors");
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});
const authRoutes = require("./routes/authRoutes");

app.use("/auth", authRoutes);

io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle chat messages
  socket.on("chat message", (payload) => {
    io.emit("chat message", payload);
    console.log("chat message");
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(8000, () => {
  console.log("Server listening on port 3000");
});
