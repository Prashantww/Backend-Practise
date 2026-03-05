const userModel = require("../models/user.model");
const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const isEmailExists = await userModel.findOne({ email });

  if (isEmailExists) {
    return res.status(409).json({
      message: "Email already exists",
    });
  }

  const user = await userModel.create({
    username,
    email,
    password: crypto.createHash("sha256").update(password).digest("hex"),
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "user Registerd successfully",
    user,
  });
});

authRouter.get("/get-me", async (req, res) => {
  const token = req.cookies.token;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await userModel.findById(decoded._id);

  res.json({
    name: user.username,
    email: user.email,
  });
});

module.exports = authRouter;
