const mongoose = require("mongoose");
const express = require("express");
const app = express();
const userRoutes = express.Router();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const User = require("./models/userModel");

const authRoutes = require("./routes/authRoutes");
const restrictedRoutes = require("./routes/restrictedRoutes");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb://127.0.0.1:27017/revcult",
  { useNewUrlParser: true }
);

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection establishes successfully");
});

app.use("/revcult", authRoutes);
app.use("/revcult/restricted", restrictedRoutes);

const PORT = 4000;

app.listen(PORT, function() {
  console.log("Server is running on port: " + PORT);
});
