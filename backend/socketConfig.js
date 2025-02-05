// socketConfig.js
const { Server } = require('socket.io');
let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('📡 משתמש מחובר:', socket.id);
    
    socket.on('joinRoom', (userId) => {
      console.log(`📌 משתמש הצטרף לחדר: ${userId}`);
      socket.join(userId);
    });
    
    socket.on('disconnect', () => {
      console.log('❌ משתמש התנתק:', socket.id);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};

module.exports = {
  initializeSocket,
  getIO
};