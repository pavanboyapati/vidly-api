const express = require("express");
const { Genre, validate } = require("../schemas/genresSchema");

const router = express.Router();

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  if (genres.length == 0)
    return res.status(404).send("No Genres found at this time");
  res.send(genres);
});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = new Genre({ ...req.body });
  await genre.save();
  res.send(genre);
});
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre)
    return res.status(404).send(`No Genre found with id ${req.params.id}`);
  res.send(genre);
});
router.delete("/:id", async (req, res) => {
  if (!req.params.id) return res.status(400).send("ID is required");
  const genre = await Genre.findByIdAndRemove({ _id: req.params.id });
  if (!genre)
    return res.status(404).send(`No Genre found with id ${req.params.id}`);
  res.send(genre);
});

module.exports = router;
