const { Server } = require('socket.io');
const User = require('../models/user');

// TODO: Apply api middlewares logic like isValidId and errors handling here
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
        if (!id) return

        const user = await User.findByIdAndUpdate(id, {
          socketId: socket.id,
          online: true,
        })

        // TODO: Remove code below when migration to webhooks is completed
        if (!user) return

        this.activeUserSessions = this.getUniqueArrayValues([...this.activeUserSessions, id])

        this.io.emit('users_online', this.activeUserSessions)
      })

      socket.on('disconnect', async () => {
        if (!socket.id) return

        const user = await User.findOneAndUpdate({ socketId: socket.id }, {
          socketId: null,
          online: false,
        })

        // TODO: Remove code below when migration to webhooks is completed
        if (!user) return

        this.activeUserSessions = this.activeUserSessions.filter(activeUser => activeUser !== user.id)

        this.io.emit('users_online', this.activeUserSessions)
      });

      socket.on('typing', async ({ from, to }) => {
        if (!from || !to) return

        const toUser = await User.findById(to);

        this.emitEventToRoom(toUser.socketId, 'user_starts_typing', from)
      })

      socket.on('stopped_typing', async ({ from, to }) => {
        if (!from || !to) return

        const toUser = await User.findById(to);

        this.emitEventToRoom(toUser.socketId, 'user_stopped_typing', from)
      })

    })
  }

  emitEventToRoom(room, event, data) {
    this.io.to(room).emit(event, data)
  }

  // TODO: Remove method below when migration to webhooks is completed
  getUniqueArrayValues(arrayValues) {
    return [...new Set(arrayValues)]
  }

  // Create a static method to get the SocketServer instance
  static getInstance(httpServer) {
    if (!SocketServer.instance) {
      SocketServer.instance = new SocketServer(httpServer);
    }
    return SocketServer.instance;
  }
}

module.exports = SocketServer;