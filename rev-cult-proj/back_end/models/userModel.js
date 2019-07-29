const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
  username: String,
  password: String,
  token: String,
  isLoggedIn: Boolean
});

module.exports = mongoose.model("user", user);
