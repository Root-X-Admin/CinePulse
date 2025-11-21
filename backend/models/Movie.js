const mongoose = require('mongoose');

const CastSchema = new mongoose.Schema({
  name: String,
  role: String,
  photo: String
});

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: Number,
  genres: [String],
  synopsis: String,
  poster: String,
  trailerUrl: String,
  cast: [CastSchema],
  runtime: Number,
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Movie', MovieSchema);
