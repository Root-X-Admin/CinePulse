// Movie routes: list movies, single movie (with reviews), add review (auth required)
const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const Review = require('../models/Review');
const { auth } = require('../middleware/auth');

// List movies
// Usage: /api/movies?q=avengers OR /api/movies?genre=action&year=2023
router.get('/', async (req, res) => {
  try {
    let query = {};

    // 1. General Search (Matches Title, Description, or Genre)
    if (req.query.q) {
      const regex = new RegExp(req.query.q, 'i');
      query.$or = [
        { title: regex },
        { description: regex },
        { genre: regex }
      ];
    }

    // 2. Specific Filters (if provided)
    if (req.query.genre) {
      // strict case-insensitive match for genre
      query.genre = new RegExp(`^${req.query.genre}$`, 'i');
    }
    
    if (req.query.year) {
      // map 'year' query param to 'releaseYear' schema field
      query.releaseYear = req.query.year;
    }

    const movies = await Movie.find(query)
      .sort({ createdAt: -1 }) // Show newest added movies first
      .limit(50);
      
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
    
    // Get reviews and populate the user's name
    const reviews = await Review.find({ movie: movie._id })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.json({ movie, reviews });
  } catch (err) {
    if(err.kind === 'ObjectId') return res.status(404).json({ msg: 'Movie not found' });
    res.status(500).json({ msg: err.message });
  }
});

// Add review
router.post('/:id/reviews', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    const movie = await Movie.findById(req.params.id);
    if(!movie) return res.status(404).json({ msg: 'Movie not found' });

    // Prevent duplicate reviews from the same user
    const existing = await Review.findOne({ movie: movie._id, user: req.user._id });
    if(existing) return res.status(400).json({ msg: 'You already reviewed this movie' });

    const review = new Review({ 
      movie: movie._id, 
      user: req.user._id, 
      rating, 
      comment 
    });
    
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;