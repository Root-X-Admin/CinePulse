// Main backend server: connects DB, mounts routes
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const adminRoutes = require('./routes/admin');

const app = express();
connectDB();

app.use(cors());
app.use(express.json({ limit: '5mb' }));

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
