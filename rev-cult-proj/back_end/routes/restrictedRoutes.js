const mongoose = require("mongoose");
const express = require("express");
const userRoutes = express.Router();
const jwt = require("jsonwebtoken");

userRoutes.get("/home", verifyToken, function(req, res) {
  res.json({ message: "Welcome to home page" });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = userRoutes;
