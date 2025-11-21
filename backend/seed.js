const mongoose = require('mongoose');
const Movie = require('./models/Movie');
const Review = require('./models/Review');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cinepulse';

const sampleMovies = [
  {
    title: 'The Neon Night',
    year: 2023,
    genres: ['Drama', 'Thriller'],
    synopsis: 'A stylized noir about fame, revenge and neon-lit streets.',
    poster: 'https://via.placeholder.com/400x600?text=The+Neon+Night',
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    cast: [
      { name: 'A. Star', role: 'Lead', photo: '' },
      { name: 'B. Actor', role: 'Support', photo: '' }
    ],
    runtime: 122
  },
  {
    title: 'Space Sonata',
    year: 2021,
    genres: ['Sci-Fi', 'Adventure'],
    synopsis: 'An intimate space odyssey with classical music motifs.',
    poster: 'https://via.placeholder.com/400x600?text=Space+Sonata',
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    cast: [
      { name: 'C. Voyager', role: 'Commander', photo: '' }
    ],
    runtime: 140
  }
];

async function seed() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await Movie.deleteMany({});
  await Review.deleteMany({});
  const created = await Movie.insertMany(sampleMovies);
  console.log('Seeded movies:', created.map(m => m.title));
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
