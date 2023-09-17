const router = require('express').Router()
const ChatRoom = require('../models/chatRoom')
const User = require('../models/user')

router.post('/reset', async (req, res) => {
  await ChatRoom.deleteMany({})
  await User.deleteMany({})

  res.status(204).end()
})

module.exports = router
