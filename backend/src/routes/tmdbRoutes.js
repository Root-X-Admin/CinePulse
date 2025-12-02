// backend/src/routes/tmdbRoutes.js
const express = require("express");
const router = express.Router();
const { searchMovies, getMovieDetails } = require("../controllers/tmdbController");

// GET /api/tmdb/search?query=...&year=...
router.get("/search", searchMovies);

// GET /api/tmdb/movie/:tmdbId
router.get("/movie/:tmdbId", getMovieDetails);

module.exports = router;
