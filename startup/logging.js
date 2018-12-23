require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");

module.exports = function() {
  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  winston.add(new winston.transports.Console());
  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost:27017/vidly",
      options: { useNewUrlParser: true },
      level: "info"
    })
  );

  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyprint: true }),
    new winston.transports.File({ filename: "uncaughtexceptions.log" })
  );
  process.on("unhandledRejection", ex => {
    throw ex;
  });
};
