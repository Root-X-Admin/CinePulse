// Auth middleware: verifies JWT, attach user; isAdmin check helper
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if(!token) return res.status(401).json({ msg: 'No token, auth denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-passwordHash');
    if(!req.user) return res.status(401).json({ msg: 'User not found' });
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

const adminOnly = (req, res, next) => {
  if(!req.user?.isAdmin) return res.status(403).json({ msg: 'Admin only' });
  next();
};

module.exports = { auth, adminOnly };
