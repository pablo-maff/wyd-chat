const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const ChatRoom = require('../models/chatRoom')
const mongoose = require('mongoose')

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

  req.user = await User.findById(req.token.id)

  next()
}

const chatRoomExtractor = async (req, res, next) => {
  req.chatRoom = await ChatRoom.findById(req.params.id)

  next()
}

function isValidID(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .send({ error: "Invalid ID" })
  }

  next()
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
  chatRoomExtractor,
  isValidID
}
