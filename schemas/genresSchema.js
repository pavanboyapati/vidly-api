const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = mongoose.Schema({
  name: { type: String, required: true }
});
function validateGenre(genre) {
  const schema = {
    name: Joi.string()
      .required()
      .min(3)
  };
  return Joi.validate(genre, schema);
}
exports.genreSchema = genreSchema;
exports.Genre = mongoose.model("Genre", genreSchema);
exports.validate = validateGenre;
