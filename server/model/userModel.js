const mongoose = require("mongoose");

let userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const USERS = mongoose.model("users", userSchema);

module.exports = USERS;
