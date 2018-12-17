const express = require("express");
const { Movie, validate } = require("../schemas/movieSchema");
const { Genre } = require("../schemas/genresSchema");
const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("title");
  if (movies.length == 0)
    return res.status(404).send("No movies found at this time");
  res.send(movies);
});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre Id");
  const movie = new Movie({
    title: req.body.title,
    genre: { _id: genre._id, name: genre.name },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  const movieId = await movie.save();
  res.send(movieId);
});

module.exports = router;
