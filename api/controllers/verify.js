const verifyRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

verifyRouter.get('/:id', async (req, res) => {
  const io = req.socketServer
  const token = req.params.id

  if (!token) {
    return res.status(401).send({
      error: 'Missing Token'
    })
  }

  const decodedToken = jwt.verify(token, process.env.USER_VERIFICATION_TOKEN_SECRET)

  const user = await User.findById(decodedToken.id)

  if (!user) {
    return res.status(404).send({
      error: 'User does not  exists'
    });
  }

  user.isVerified = true

  await user.save();

  const baseURL = process.env.NODE_ENV === 'production' ? 'https://wyd-chat.onrender.com' : 'http://localhost:5173'

  res.status(200).send(`<html><body><div style='text-align: center;'><h1>Welcome to wyd chat</h1><div><p>Your verification was successful</p><p>Click <a href=${baseURL}>here</a> to go to the application.</p></div></div></body></html>`)

  io.emitEvent('new_user_added', user)
})

module.exports = verifyRouter
