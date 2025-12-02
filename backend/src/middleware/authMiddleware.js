// backend/src/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      return next();
    } catch (err) {
      console.error("Auth error:", err);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) return res.status(401).json({ message: "Not authorized, no token" });
};

// ✅ Add this
exports.adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};
