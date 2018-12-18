const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
const { User } = require("../schemas/userSchema");

exports = async function(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(400).send("Access denied. No token provided.");
  try {
    req.user = jwt.verify(token, config.get("jwtPrivateKey"));
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }

  user = await User.findById(user._id);
  if (!user) return res.status(401).send("Invalid token provided.");
  next();
};
