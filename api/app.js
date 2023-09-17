const { MONGODB_URI } = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const chatRoomsRouter = require('./controllers/chatRooms')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const messagesRouter = require('./controllers/messages')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const morgan = require('morgan')

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
app.use(express.json())

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :chatRoom')
)

app.use('/api/login', loginRouter)

app.use(middleware.tokenExtractor)

app.use('/api/users', usersRouter)
app.use('/api/chatRooms', chatRoomsRouter)
app.use('/api/chatRooms/:id/messages', messagesRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
