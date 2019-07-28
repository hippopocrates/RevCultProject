const mongoose = require("mongoose");
const express = require("express");
const app = express();
const userRoutes = express.Router();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const User = require("./models/userModel");

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

userRoutes.route("/home").get(function(req, res) {
  res.json({ message: "Welcome to home page" });
});

userRoutes.route("/signup").post(async (req, res) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  let user = new User({
    username: req.body.username,
    password: hashedPassword
  });
  user
    .save()
    .then(user => {
      res.status(200).json({ user: "user added successfully" });
      console.log(user);
    })
    .catch(err => {
      res.status(400).send("adding new user failed");
    });
});

userRoutes.route("/login").post(async (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, same) => {
        jwt.sign({ user }, "secretKey", (err, token) => {
          res.json({
            token
          });
        });
      });
    }
  });
});

app.use("/revcult", userRoutes);

const PORT = 4000;

app.listen(PORT, function() {
  console.log("Server is running on port: " + PORT);
});
