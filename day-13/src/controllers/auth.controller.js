const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerController(req, res) {
  const { username, email, password, profileImage } = req.body;

  console.log("check");

  const isUserValid = userModel.findOne({
    $or: [{ username }, { email }],
  });

  console.log("This is isUserValid: " + isUserValid);

  if (!isUserValid) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    hash,
    profileImage,
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
    message: "user registered successfully",
    username,
    email,
  });
}

module.exports = { registerController };
