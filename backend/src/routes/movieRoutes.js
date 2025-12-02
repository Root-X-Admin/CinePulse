// backend/src/routes/movieRoutes.js
const express = require("express");
const router = express.Router();
const {
  getMovies,
  getMovieById,
  createMovie,
} = require("../controllers/movieController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// GET /api/movies
router.get("/", getMovies);

// GET /api/movies/:id
router.get("/:id", getMovieById);

// POST /api/movies (admin only)
router.post("/", protect, adminOnly, createMovie);

module.exports = router;
