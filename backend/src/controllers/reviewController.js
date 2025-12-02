// backend/src/controllers/reviewController.js
const Review = require("../models/Review");
const Movie = require("../models/Movie");

exports.getReviewsForMovie = async (req, res) => {
  const { movieId } = req.params;

  try {
    const reviews = await Review.find({ movie: movieId })
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    console.error("Get reviews error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createReview = async (req, res) => {
  const { movieId } = req.params;
  const { rating, title, body, containsSpoilers } = req.body;

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    if (rating < 0 || rating > 10) {
      return res.status(400).json({ message: "Rating must be between 0 and 10" });
    }

    const review = await Review.create({
      movie: movieId,
      user: req.user._id,
      rating,
      title,
      body,
      containsSpoilers: !!containsSpoilers,
    });

    // Recalculate avg rating
    const stats = await Review.aggregate([
      { $match: { movie: movie._id } },
      { $group: { _id: null, avgRating: { $avg: "$rating" } } },
    ]);

    const avgRating = stats.length ? stats[0].avgRating : 0;
    movie.avgRating = avgRating;
    await movie.save();

    // Populate user for frontend
    const populatedReview = await Review.findById(review._id).populate(
      "user",
      "username"
    );

    res.status(201).json({
      review: populatedReview,
      avgRating,
    });
  } catch (err) {
    console.error("Create review error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
