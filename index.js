const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const mongoose = require("mongoose");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
mongoose
  .connect(
    "mongodb://localhost/vidly",
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to Mongo DB ..."))
  .catch(ex => console.log("Couldn't connect to Mongo DB " + ex));

const app = express();
//request body parser
app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.get("/", (req, res) => res.send("Welcome to VIDLY-API"));

const port = process.env.PORT || 4200;
console.log(`process.env.PORT ${process.env.PORT}`);
app.listen(port, () => console.log(`Express app is listening @${port}`));
