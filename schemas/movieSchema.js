const Joi = require("joi");
const mongoose = require("mongoose");
const { genreSchema } = require("./genresSchema");

const movieSchema = mongoose.Schema({
  title: { type: String, required: true, min: 3, max: 255 },
  genre: { type: genreSchema, required: true },
  numberInStock: { type: Number, default: 0, min: 0, max: 255 },
  dailyrentalRate: { type: Number, default: 0, min: 0, max: 255 }
});

const validateMovie = object => {
  const schema = {
    title: Joi.string()
      .required()
      .min(3)
      .max(255),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number()
      .min(0)
      .max(255),
    dailyrentalRate: Joi.number()
      .min(0)
      .max(255)
  };
  return Joi.validate(object, schema);
};

exports.Movie = mongoose.model("Movie", movieSchema);
exports.validate = validateMovie;
