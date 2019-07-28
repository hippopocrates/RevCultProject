const mongoose = require("mongoose");
const express = require("express");
const userRoutes = express.Router();

userRoutes.route("/home").get(function(req, res) {
  res.json({ message: "Welcome to home page" });
});

module.exports = userRoutes;
