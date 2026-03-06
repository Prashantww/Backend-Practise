const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "User already exists"],
    // required: true,
  },

  email: {
    type: String,
    unique: [true, "User already exists"],
    // required: true,
  },

  password: String,

  profileImage: String,
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
