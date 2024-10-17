const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv= require('dotenv').config();


const app = express();
const http = require("http").createServer(app);

// Constants
const PORT = 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());


// MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

// Listen to the connection event
http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
