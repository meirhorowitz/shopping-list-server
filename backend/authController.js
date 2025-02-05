const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./user'); // מודל המשתמשים

const JWT_SECRET = 'your_secret_key'; // 🔒 סוד החתימה של ה-JWT

// רישום משתמש חדש
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // בדיקה אם המשתמש כבר קיים
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    // הצפנת הסיסמה
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// התחברות וקבלת טוקן
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // חיפוש המשתמש
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    // השוואת סיסמאות
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

    // יצירת טוקן
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    // שליחת הטוקן + userId ללקוח
    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// אימות טוקן והחזרת פרטי המשתמש
const getMe = async (req, res) => {
  try {
    const user = req.user; // המידע כבר נמצא במידלוור
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// קבלת כל המשתמשים
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // לא מחזירים את הסיסמה
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

module.exports = {
  register,
  login,
  getMe,
  getUsers
};
