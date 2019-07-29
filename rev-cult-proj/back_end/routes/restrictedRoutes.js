const mongoose = require("mongoose");
const express = require("express");
const userRoutes = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const secret = "secret";

userRoutes.get("/home", verifyToken, function(req, res) {
  console.log("entered home");
  res.json({ message: "Welcome to home page" });
});

function verifyToken(req, res, next) {
  console.log("enter verifyToken");
  const token = req.headers["authorization"];
  console.log("token", token);
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {});
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = userRoutes;
