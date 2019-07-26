const mongoose = require("mongoose");
const express = require("express");
const app = express();
const userRoutes = express.Router();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");

const User = require("./models/userModel");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb://localhost:27017/revcult",
  { useNewUrlParser: true }
);

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection establishes successfully");
});

userRoutes.route("/").get(function(req, res) {});

//bcrypt is an async library
userRoutes.route("/signup").post(async (req, res) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  let user = new User({ name: req.body.name, password: hashedPassword });
  user
    .save()
    .then(user => {
      res.status(200).json({ user: "user added successfully" });
    })
    .catch(err => {
      res.status(400).send("adding new user failed");
    });
});

const PORT = 4000;

app.listen(PORT, function() {
  console.log("Server is running on port: " + PORT);
});

// connect()
//   .then(async connection => {
//     const user = await User.create({ username: "hippo" });
//     console.log(user);
//   })
//   .catch(e => console.error(e));
