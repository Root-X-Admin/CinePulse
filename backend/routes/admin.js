// Admin routes: create/update/delete movies (adminOnly)
const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const { auth, adminOnly } = require('../middleware/auth');

// Create movie
router.post('/movies', auth, adminOnly, async (req, res) => {
  try {
    const payload = req.body; // expect title, year, cast, synopsis, trailerUrl, posterUrl
    const movie = new Movie({ ...payload, createdBy: req.user._id });
    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Update movie
router.put('/movies/:id', auth, adminOnly, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!movie) return res.status(404).json({ msg: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Delete movie
router.delete('/movies/:id', auth, adminOnly, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if(!movie) return res.status(404).json({ msg: 'Movie not found' });
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
