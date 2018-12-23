const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function admin(req, res, next) {
  if (!req.user.isAdmin)
    res.status(403).send("User not authorized to perform this operation.");
  next();
};
