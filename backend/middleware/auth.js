// backend/middleware/auth.js

const jwt = require('jsonwebtoken');

function adminAuth(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, admin) => {
      if (err) return res.status(403).json({ message: 'Forbidden' });
      req.admin = admin;
      next();
    });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = adminAuth;
