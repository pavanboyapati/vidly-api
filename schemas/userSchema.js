const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, min: 5, max: 255 },
  email: { type: String, required: true, min: 5, max: 255, unique: true },
  password: { type: String, required: true, min: 5, max: 1024 }
});
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};
const validateUser = user => {
  const schema = {
    name: Joi.string()
      .required()
      .min(5)
      .max(255),
    email: Joi.string()
      .email()
      .required()
      .min(5)
      .max(255),
    password: Joi.string()
      .required()
      .min(5)
      .max(255)
  };
  return Joi.validate(user, schema);
};
exports.User = mongoose.model("User", userSchema);
exports.validate = validateUser;
