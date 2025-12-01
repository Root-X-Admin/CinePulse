// Auth routes: register + login
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body; // REMOVED isAdmin from destructuring

    let user = await User.findOne({ email });
    if(user) return res.status(400).json({ msg: 'User exists' });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // FORCE isAdmin to false for all new registrations
    user = new User({ 
      name, 
      email, 
      passwordHash, 
      isAdmin: false 
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    // Return the user info
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        isAdmin: user.isAdmin 
      } 
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Login (This part was fine, but including it for completeness)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 1. Check if user exists
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // 2. Check password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // 3. Create Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    // 4. Send Response (Important: Frontend needs user.isAdmin)
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        isAdmin: user.isAdmin 
      } 
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;