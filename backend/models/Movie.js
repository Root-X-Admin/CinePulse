// Movie model: title, year, cast array, synopsis, trailer (YouTube id or url), posterUrl, reviews ref
const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: Number,
  cast: [String],
  synopsis: String,
  trailerUrl: String,
  posterUrl: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Movie', MovieSchema);
