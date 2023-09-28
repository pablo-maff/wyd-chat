const verifyRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

verifyRouter.get('/', async (req, res) => {
  const { token } = req

  if (!token) {
    return res.status(401).send({
      error: 'Missing Token'
    })
  }

  const decodedToken = jwt.verify(token, process.env.USER_VERIFICATION_TOKEN_SECRET)

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

module.exports = verifyRouter
