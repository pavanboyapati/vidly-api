const winston = require("winston");
const express = require("express");
const app = express();

require("./startup/logging")();
require("./startup/db")();
require("./startup/routes")(app);
require("./startup/validation")();
require("./startup/config")();

const port = process.env.PORT || 4200;
app.listen(port, () => winston.info(`Express app is listening @${port}`));
