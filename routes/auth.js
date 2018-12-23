const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

const { User } = require("../schemas/userSchema");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validUser = await bcrypt.compare(req.body.password, user.password);
  if (!validUser) return res.status(400).send("Invalid email or password.");
  const token = user.generateAuthToken();
  res.header("x-auth-token", token);
  res.send("valid");
});
const validate = req => {
  const schema = {
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
  return Joi.validate(req, schema);
};
module.exports = router;
