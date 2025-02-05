const { initializeSocket } = require('./socketConfig');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const {MONGO_PUBLIC_URL}=require('./mongodbConfig')
const authRoutes = require('./authRoutes');
const shoppingRoutes = require('./shoppingRoutes'); // ייבוא הנתיבים למוצרים
const authMiddleware = require('./authMiddleware');
const app = express();
const port = 3000;
const server = http.createServer(app);

app.use(cors({
  origin: 'http://localhost:8100', // Allow requests only from localhost:8100
}));
// יצירת חיבור socket.io
const io = initializeSocket(server); // initialize socket.io

// חיבור עם ה-client
io.on('connection', (socket) => {
  console.log('📡 משתמש מחובר:', socket.id);

  socket.on('joinRoom', (userId) => {
    console.log(`📌 משתמש הצטרף לחדר: ${userId}`);
    socket.join(userId); // הכנסת המשתמש לחדר שלו
  });

  socket.on('disconnect', () => {
    console.log('❌ משתמש התנתק:', socket.id);
  });
});

// חיבור ל- MongoDB
mongoose.connect(MONGO_PUBLIC_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// שימוש ב-CORS ואמצעי עיבוד נתונים
app.use(cors());
app.use(bodyParser.json());

// הגדרת נתיבים
app.use('/auth', authRoutes);
app.use('/shopping', shoppingRoutes); // נתיבי שירותי קניות

// התחלת השרת
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


