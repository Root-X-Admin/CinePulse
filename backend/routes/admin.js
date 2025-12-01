// Admin routes: create/update/delete movies (adminOnly)
const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const { auth, adminOnly } = require('../middleware/auth');

// Create movie
router.post('/movies', auth, adminOnly, async (req, res) => {
  try {
    // We explicitly destructure the fields to match the new Schema
    const {
      title,
      genre,
      imdbRating,
      nioRating,
      releaseYear,
      description,
      posterUrl,
      trailerUrl,
      cast
    } = req.body;

    const movie = new Movie({
      title,
      genre,
      imdbRating,
      nioRating,
      releaseYear,
      description,
      posterUrl,
      trailerUrl,
      cast,
      createdBy: req.user._id // Taken from the auth token
    });

    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Update movie
router.put('/movies/:id', auth, adminOnly, async (req, res) => {
  try {
    // findByIdAndUpdate will automatically update any fields present in req.body
    // that match the schema (e.g. if you only send { nioRating: 9.0 })
    const movie = await Movie.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } // Return the updated document
    );

    if (!movie) return res.status(404).json({ msg: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Delete movie
router.delete('/movies/:id', auth, adminOnly, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ msg: 'Movie not found' });
    res.json({ msg: 'Movie deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;