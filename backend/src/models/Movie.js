// backend/src/models/Movie.js
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    year: { type: Number },
    genre: [{ type: String }],
    runtime: { type: Number }, // in minutes
    posterUrl: { type: String },
    backdropUrl: { type: String },
    trailerUrl: { type: String },
    tagline: { type: String },
    overview: { type: String }, // non-spoiler summary
    spoilerSummary: { type: String }, // spoiler zone content
    avgRating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
