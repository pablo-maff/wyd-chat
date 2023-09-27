const { Server } = require('socket.io');
const User = require('../models/user');

class SocketServer {
  constructor(httpServer) {
    this.io = new Server(httpServer, {
      cors: {
        origin: 'http://localhost:5173'
      }
    });

    this.activeUserSessions = [];

    this.setupSocketListeners();
  }

  setupSocketListeners() {
    this.io.on('connection', (socket) => {
      console.log('A client connected.');

      socket.on('login', async ({ id }) => {
        console.log(`⚡: ${socket.id} user just connected!`);
        const user = await User.findByIdAndUpdate(id, {
          socketId: socket.id,
          online: true,
        })

        if (!user) return

        this.activeUserSessions = this.getUniqueArrayValues([...this.activeUserSessions, id])

        this.io.emit('users_online', this.activeUserSessions)
      })

      socket.on('disconnect', async () => {
        const user = await User.findOne({ socketId: socket.id })

        if (!user) return

        this.activeUserSessions = this.activeUserSessions.filter(activeUser => activeUser !== user.id)

        this.io.emit('users_online', this.activeUserSessions)
      });

      // Add your socket event listeners here
      socket.on('typing', async ({ from, to }) => {
        const toUser = await User.findById(to);

        this.emitEventToRoom(toUser.socketId, 'user_starts_typing', from)
      })

      socket.on('stopped_typing', async ({ from, to }) => {
        const toUser = await User.findById(to);

        this.emitEventToRoom(toUser.socketId, 'user_stopped_typing', from)
      })

    })
  }

  emitEventToRoom(room, event, data) {
    this.io.to(room).emit(event, data)
  }

  getUniqueArrayValues(arrayValues) {
    return [...new Set(arrayValues)]
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