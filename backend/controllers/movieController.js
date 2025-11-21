const Movie = require('../models/Movie');
const Review = require('../models/Review');

exports.list = async (req, res) => {
  try {
    const q = req.query.q || '';
    const movies = await Movie.find({ title: { $regex: q, $options: 'i' } }).limit(50);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Not found' });
    const reviews = await Review.find({ movie: movie._id }).sort({ createdAt: -1 });
    res.json({ movie, reviews });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const m = new Movie(req.body);
    await m.save();
    res.status(201).json(m);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const m = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!m) return res.status(404).json({ error: 'Not found' });
    res.json(m);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addReview = async (req, res) => {
  try {
    const movieId = req.params.id;
    const review = new Review({ ...req.body, movie: movieId });
    await review.save();
    // update movie aggregate
    const agg = await Review.aggregate([
      { $match: { movie: review.movie } },
      { $group: { _id: '$movie', avg: { $avg: '$rating' }, cnt: { $sum: 1 } } }
    ]);
    if (agg.length) {
      await Movie.findByIdAndUpdate(movieId, { rating: agg[0].avg, reviewsCount: agg[0].cnt });
    }
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
