const mongoose = require("mongoose");
const express = require("express");
const userRoutes = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const secret = "secret";

userRoutes.get("/home", verifyToken, function(req, res) {
  console.log("entered home");
  console.log(req.headers["currentUser"]);
  res.json({ message: "Welcome to home page" });
});

userRoutes.get("/logout", function(req, res, next) {
  if (req.headers["authorization"]) {
    delete req.headers["authorization"];
    res.redirect("/");
  }
});

function verifyToken(req, res, next) {
  console.log("enter verifyToken");
  const token = req.headers["authorization"];

  if (token) {
    // jwt.verify(token, secret, (err, decodedToken) => {
    //   console.log(decodedToken);
    // });
    next();
  } else {
    res.redirect("/");
  }
}

module.exports = userRoutes;
