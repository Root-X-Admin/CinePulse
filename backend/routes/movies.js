// Movie routes: list movies, single movie (with reviews), add review (auth required)
const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const Review = require('../models/Review');
const { auth } = require('../middleware/auth');

// List movies (simple search / pagination optional)
router.get('/', async (req, res) => {
  try {
    const q = req.query.q ? { title: new RegExp(req.query.q, 'i') } : {};
    const movies = await Movie.find(q).sort({ createdAt: -1 }).limit(50);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Movie details + its reviews
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if(!movie) return res.status(404).json({ msg: 'Movie not found' });
    const reviews = await Review.find({ movie: movie._id }).populate('user', 'name');
    res.json({ movie, reviews });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Add review
router.post('/:id/reviews', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const movie = await Movie.findById(req.params.id);
    if(!movie) return res.status(404).json({ msg: 'Movie not found' });
    const existing = await Review.findOne({ movie: movie._id, user: req.user._id });
    if(existing) return res.status(400).json({ msg: 'You already reviewed this movie' });
    const review = new Review({ movie: movie._id, user: req.user._id, rating, comment });
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
