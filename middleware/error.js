module.exports = function(error, req, res, next) {
  winston.error("Something failed" + error);
  res.status(500).send("Somthing failed");
};
