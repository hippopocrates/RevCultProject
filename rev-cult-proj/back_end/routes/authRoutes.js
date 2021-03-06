const mongoose = require("mongoose");
const express = require("express");
const userRoutes = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

userRoutes.post("/signup", async (req, res) => {
  console.log("enter signup");
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

userRoutes.post("/login", async (req, res) => {
  console.log("enter login");
  User.findOne({ username: req.body.username }, (err, user) => {
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, same) => {
        if (same) {
          jwt.sign({ user: user.username }, "secretKey", (err, token) => {
            console.log(token);
            console.log("user", user.username);
            res.json({
              token
            });
          });
        } else {
          // "invalid password", reset?
        }
      });
    } else {
      // add "this username does not exist" alert
    }
  });
});

userRoutes.put("/passwordreset", async (req, res) => {
  console.log("enter passwordreset");
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  User.findOneAndUpdate(
    { username: req.body.username },
    { password: hashedPassword }
  )
    .then(function() {
      console.log("password updated successfully");
    })
    .catch(err => {
      res.status(400).send("password update failed");
    });
});

module.exports = userRoutes;
