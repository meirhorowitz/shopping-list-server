const express = require('express');
const { register, login, getMe, getUsers } = require('./authController'); // ייבוא הפונקציות
const authMiddleware = require('./authMiddleware'); // אם יש לך Middleware לאימות טוקן
const router = express.Router();

// רישום משתמש חדש
router.post('/register', register);

// התחברות וקבלת טוקן
router.post('/login', login);

// פרטי המשתמש המחובר
router.get('/me', authMiddleware, getMe);

// קבלת כל המשתמשים (כמובן שזה תלוי בצורך שלך)
router.get('/users', getUsers);

module.exports = router;
