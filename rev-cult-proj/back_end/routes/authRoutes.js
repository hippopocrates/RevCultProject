const mongoose = require("mongoose");
const express = require("express");
const userRoutes = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

userRoutes.post("/signup", async (req, res) => {
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

module.exports = userRoutes;
