// backend/src/routes/reviewRoutes.js
const express = require("express");
const router = express.Router();
const { getReviewsForMovie, createReview } = require("../controllers/reviewController");
const { protect } = require("../middleware/authMiddleware");

// GET /api/reviews/movie/:movieId
router.get("/movie/:movieId", getReviewsForMovie);

// POST /api/reviews/movie/:movieId  (auth required)
router.post("/movie/:movieId", protect, createReview);

module.exports = router;
