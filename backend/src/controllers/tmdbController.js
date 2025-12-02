// backend/src/controllers/tmdbController.js
const axios = require("axios");

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

exports.searchMovies = async (req, res) => {
  const { query, year } = req.query;

  if (!query || !query.trim()) {
    return res.status(400).json({ message: "Query is required" });
  }

  try {
    const { data } = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        query,
        year: year || undefined,
        include_adult: false,
      },
    });

    const results = (data.results || []).slice(0, 8).map((m) => ({
      tmdbId: m.id,
      title: m.title,
      year: m.release_date ? m.release_date.slice(0, 4) : null,
      overview: m.overview,
      posterUrl: m.poster_path
        ? `${TMDB_IMAGE_BASE}/w342${m.poster_path}`
        : null,
      backdropUrl: m.backdrop_path
        ? `${TMDB_IMAGE_BASE}/w780${m.backdrop_path}`
        : null,
    }));

    res.json(results);
  } catch (err) {
    console.error("TMDb search error:", err.response?.data || err.message);
    res.status(500).json({ message: "TMDb search failed" });
  }
};

exports.getMovieDetails = async (req, res) => {
  const { tmdbId } = req.params;

  if (!tmdbId) {
    return res.status(400).json({ message: "tmdbId is required" });
  }

  try {
    const { data } = await axios.get(`${TMDB_BASE_URL}/movie/${tmdbId}`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        append_to_response: "videos",
      },
    });

    let trailerUrl = null;
    const videos = data.videos?.results || [];
    const trailer =
      videos.find(
        (v) =>
          v.type === "Trailer" &&
          v.site === "YouTube" &&
          v.official === true
      ) ||
      videos.find((v) => v.type === "Trailer" && v.site === "YouTube");

    if (trailer) {
      trailerUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
    }

    const payload = {
      title: data.title,
      year: data.release_date ? data.release_date.slice(0, 4) : null,
      overview: data.overview,
      tagline: data.tagline,
      runtime: data.runtime,
      genres: data.genres ? data.genres.map((g) => g.name) : [],
      posterUrl: data.poster_path
        ? `${TMDB_IMAGE_BASE}/w500${data.poster_path}`
        : null,
      backdropUrl: data.backdrop_path
        ? `${TMDB_IMAGE_BASE}/w1280${data.backdrop_path}`
        : null,
      trailerUrl,
    };

    res.json(payload);
  } catch (err) {
    console.error("TMDb movie details error:", err.response?.data || err.message);
    res.status(500).json({ message: "TMDb movie details fetch failed" });
  }
};
