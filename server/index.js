const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv= require('dotenv').config();

const userRoute = require("./routes/user");
const queryRoute = require("./routes/query");

const app = express();
const http = require("http").createServer(app);

// Socket.io instance
const io = require("socket.io")(http, {
  cors: {
    origin: `*`,
  },
});

// Constants
const PORT = 5000;
const MONGO_URI = "mongodb+srv://mahikagarg23:vA7N2571OUC5EAMJ@cluster0.qtsb9h6.mongodb.net/support-chat";

// Middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api/user", userRoute);
app.use("/api/query",queryRoute);

// MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

// Listen to the connection event
http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Socket.io connection
io.on("connection", (socket) => {
  socket.on("message", ({ userId, message }) => {
    io.emit("message", { userId, message });
  });
  socket.on("resolve", ({ queryId, solution }) => {
    io.emit("resolve", { queryId, solution });
  });
});