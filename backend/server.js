require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const User = require('./models/User');

// Import Routes
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const adminRoutes = require('./routes/admin');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '5mb' }));

// Route Mounting
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/admin', adminRoutes);

// --- Helper Function: Create Default Admin ---
const createDefaultAdmin = async () => {
  try {
    // 1. Check if the admin already exists
    const existingAdmin = await User.findOne({ email: 'admin' });

    if (!existingAdmin) {
      // 2. Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin', salt);

      // 3. Create the new user
      const newAdmin = new User({
        name: 'Super Admin',
        email: 'admin',
        passwordHash: hashedPassword,
        isAdmin: true
      });

      await newAdmin.save();
      console.log('✅ Default Admin User Created!');
      console.log('   Email: admin');
      console.log('   Password: admin');
    } else {
      console.log('ℹ️ Admin user already exists (Skipping creation).');
    }
  } catch (error) {
    console.error('❌ Error creating default admin:', error);
  }
};

// --- Start Server Logic ---
const startServer = async () => {
  try {
    // 1. Connect to Database
    await connectDB();

    // 2. Run Admin Seed Check
    await createDefaultAdmin();

    // 3. Start Listening
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

// Execute start
startServer();