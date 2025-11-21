const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const moviesRouter = require('./routes/movies');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/movies', moviesRouter);

app.get('/', (req, res) => res.send('CinePulse API running'));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cinepulse';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error', err);
  });
