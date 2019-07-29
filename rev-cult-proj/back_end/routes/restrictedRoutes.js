const mongoose = require("mongoose");
const express = require("express");
const userRoutes = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const secret = "secret";

userRoutes.get("/home", verifyToken, function(req, res) {
  res.json({ message: "Welcome to home page" });
});

function verifyToken(req, res, next) {
  const token = window.localStorage.getItem("token");
  console.log(token);
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {});
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = userRoutes;
