const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { default: mongoose } = require('mongoose')
const ChatRoom = require('../models/chatRoom')

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: error.message,
    })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token',
    })
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'token expired',
    })
  }

  logger.error(error.message)

  next(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')

  if (!authorization) {
    return res.status(401).json({
      error: 'Missing authorization token'
    })
  }

  if (authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7)

    req.token = jwt.verify(token, process.env.SECRET) // Verify token validity and decode token (returns the Object which the token was based on)

    next()
  }
}

const userExtractor = async (req, res, next) => {
  if (!req.token?.id) {
    return res.status(401).json({
      error: 'Invalid authorization token'
    })
  }

  const findUser = await User.findById(req.token.id)

  if (!findUser) {
    return res.status(404).json({
      error: 'User not found'
    })
  }

  req.user = await User.findById(req.token.id)

  next()
}

const chatRoomExtractor = async (req, res, next) => {
  const chatRoom = await ChatRoom.findById(req.params.id)

  if (!chatRoom) {
    return res.status(404).json({
      error: 'This chat room does not exist'
    })
  }

  req.chatRoom = chatRoom

  next()
}

function isValidId(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .send({ error: 'Invalid Id' })
  }

  next()
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
  isValidId,
  chatRoomExtractor
}
