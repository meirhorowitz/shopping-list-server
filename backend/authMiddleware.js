const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key'; // חייב להיות זהה למה שהגדרת ב-authRoutes

module.exports = function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // קבלת ה-token מה-Header
 console.log('authMiddleware')
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // מוסיף את userId מהטוקן ל-request
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};
