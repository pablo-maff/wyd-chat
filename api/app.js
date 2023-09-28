const { MONGODB_URI } = require('./utils/config')
const express = require('express')
require('express-async-errors')
const { createServer } = require('http');
const cors = require('cors')
const chatRoomsRouter = require('./controllers/chatRooms')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const morgan = require('morgan')
const fallback = require('express-history-api-fallback');
const SocketServer = require('./utils/SocketServer');
const verifyRouter = require('./controllers/verify');
const User = require('./models/user');
const jwt = require('jsonwebtoken')

const app = express()

const httpServer = createServer(app);

morgan.token('chatRoom', (req) => JSON.stringify(req.body))

logger.info('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message)
  })


app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :chatRoom')
)

const socketServer = SocketServer.getInstance(httpServer)

app.use(middleware.tokenExtractor)

app.use(middleware.attachWebSocket(socketServer))

// app.get('/api/verify/:id', verifyRouter);
app.get('/api/verify/:id', async (req, res) => {
  console.log('req.token', req.params.id);
  const token = req.params.id

  if (!token) {
    return res.status(401).send({
      error: 'Missing Token'
    })
  }

  const decodedToken = jwt.verify(token, process.env.USER_VERIFICATION_TOKEN_SECRET)

  console.log('decodedToken', decodedToken);

  const user = await User.findById(decodedToken.id)

  if (!user) {
    return res.status(404).send({
      message: 'User does not  exists'
    });
  }

  user.isVerified = true

  await user.save();

  return res.status(200).json({
    message: 'Account Verified'
  });
})

app.use('/api/login', loginRouter)

app.use('/api/users', usersRouter)

app.use('/api/chatRooms', chatRoomsRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(fallback('index.html', { root: 'build' }));

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = httpServer
