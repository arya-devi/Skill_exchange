const { Server } = require('socket.io');

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*', // Allow all origins, you may want to restrict this in production
      methods: ['GET', 'POST','PUT', 'DELETE']
    },
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinChat', (chatId) => {
      socket.join(chatId);
    });

    socket.on('sendMessage', (messageData) => {
      io.to(messageData.chatId).emit('receiveMessage', messageData);
    });

    socket.on('editMessage', (messageData) => {
      io.to(messageData.chatId).emit('messageEdited', messageData);
    });

    socket.on('deleteMessage', (messageId) => {
      io.emit('messageDeleted', messageId);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

module.exports = setupSocket;
