// backend/src/controllers/movieController.js
const Movie = require("../models/Movie");

exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    console.error("Get movies error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (err) {
    console.error("Get movie by ID error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (err) {
    console.error("Create movie error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
