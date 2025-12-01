const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  genre: { 
    type: String,
    required: true
  },
  imdbRating: { 
    type: Number // Mongoose uses 'Number' for both floats and integers
  },
  nioRating: { 
    type: Number 
  },
  releaseYear: { 
    type: Number 
  },
  description: { 
    type: String 
  },
  posterUrl: { 
    type: String 
  },
  trailerUrl: { 
    type: String 
  },
  cast: { 
    type: String // Storing as a single string (e.g., "Actor 1, Actor 2")
  },
  // Optional: Keep this if you still need to track who uploaded the movie
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Movie', MovieSchema);