const express = require("express");
const authController = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/register", (req, res) => {
  res.send("hello");
});

module.exports = authRouter;
