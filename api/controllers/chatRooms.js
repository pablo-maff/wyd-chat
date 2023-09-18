const chatRoomsRouter = require('express').Router()
const ChatRoom = require('../models/chatRoom')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

chatRoomsRouter.get('/', userExtractor, async (req, res) => {
  const userId = req.user.id

  const chatRooms = await ChatRoom.find({
    users: { $in: [userId] }
  }).populate(['users', 'lastMessages'])

  res.status(200).json(chatRooms)
})

chatRoomsRouter.post('/', userExtractor, async (req, res) => {
  const { users } = req.body
  const userId = req.user.id

  // * Query the ChatRoom collection to find a room with both users
  if (users.length !== 2) {
    return res.status(400).json({
      error: 'Error: A chat room must have two users'
    })
  }

  if (!users.includes(userId.toString())) {
    return res.status(403).json({
      error: 'Can not create a chat room for other users'
    })
  }

  const existingChatRoom = await ChatRoom.exists({
    users: {
      $all: users,
    },
  });

  if (existingChatRoom) {
    return res.status(403).json({
      error: 'Error: A chat room containing this users already exists'
    })
  }

  const chatRoom = new ChatRoom({
    users
  })

  const savedChatRoom = await chatRoom.save()

  await savedChatRoom.populate('users', {
    username: 1,
    firstName: 1,
    lastName: 1,
    avatarPhoto: 1,
    lastTimeOnline: 1
  })

  // Add the chat room to both users
  const updatePromises = users.map(async (userId) => {
    return await User.findByIdAndUpdate(
      userId,
      { $push: { chatRooms: savedChatRoom.id } }
    );
  });

  await Promise.all(updatePromises);

  res.status(201).json(savedChatRoom)
})

module.exports = chatRoomsRouter
