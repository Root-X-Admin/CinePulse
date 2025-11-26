// Review model: rating + comment by user for a movie
const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 0, max: 10 },
  comment: String
}, { timestamps: true });

module.exports = mongoose.model('Review', ReviewSchema);
