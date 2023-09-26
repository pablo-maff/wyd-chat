const { Server } = require('socket.io');
const User = require('../models/user');

class SocketServer {
  constructor(httpServer) {
    this.io = new Server(httpServer, {
      cors: {
        origin: 'http://localhost:5173'
      }
    });

    this.setupSocketListeners();
  }

  setupSocketListeners() {
    this.io.on('connection', (socket) => {
      console.log('A client connected.');

      socket.on('login', async ({ id }) => {
        console.log(`⚡: ${socket.id} user just connected!`);
        await User.findByIdAndUpdate(id, {
          socketId: socket.id,
          online: true,
        });
      });

      socket.on('disconnect', async () => {
        console.log(`🔥: DISCONNECT! ${socket.id} user disconnected`);
      });

      socket.on('end', async (id) => {
        console.log(`🔥: ${socket.id} user disconnected`);
        await User.findByIdAndUpdate(id, { online: false });
        socket.disconnect(0)
      });

      // Add your socket event listeners here
    })
  }

  emitEventToRoom(room, event, data) {
    this.io.to(room).emit(event, data)
  }

  // Add more methods as needed

  // Create a static method to get the SocketServer instance
  static getInstance(httpServer) {
    if (!SocketServer.instance) {
      SocketServer.instance = new SocketServer(httpServer);
    }
    return SocketServer.instance;
  }
}

module.exports = SocketServer;