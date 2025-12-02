// backend/src/scripts/makeAdmin.js

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const User = require("../models/User");

// Load .env
dotenv.config();

const makeAdmin = async () => {
  const email = process.argv[2]; // email passed from CLI

  if (!email) {
    console.error("❌ Please provide an email.\nUsage: node src/scripts/makeAdmin.js user@example.com");
    process.exit(1);
  }

  try {
    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      console.error(`❌ No user found with email: ${email}`);
      process.exit(1);
    }

    user.role = "ADMIN";
    await user.save();

    console.log(`✅ User ${user.email} is now an ADMIN.`);
  } catch (err) {
    console.error("Error updating user role:", err);
  } finally {
    // Close Mongo connection so script ends
    await mongoose.connection.close();
    process.exit(0);
  }
};

makeAdmin();
