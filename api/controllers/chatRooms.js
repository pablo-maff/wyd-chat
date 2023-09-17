const chatRoomsRouter = require('express').Router()
const ChatRoom = require('../models/chatRoom')
const { userExtractor, chatRoomExtractor, isValidID } = require('../utils/middleware')

// chatRoomsRouter.get('/', async (req, res) => {
//   const chatRooms = await ChatRoom.find({})
//     .populate('messages', { content: 1 })
//     .populate('user', { username: 1, name: 1 })
//   chatRooms ? res.status(200).json(chatRooms) : res.status(404).end()
// })

// chatRoomsRouter.get('/:id', isValidID, async (req, res) => {
//   const chatRoom = await ChatRoom.findById(req.params.id)
//     .populate('messages', { content: 1 })
//     .populate('user', { username: 1, name: 1 })

//   chatRoom ? res.status(200).json(chatRoom.toJSON()) : res.status(404).end()
// })

chatRoomsRouter.post('/', userExtractor, async (req, res) => {
  const { users } = req.body
  const user = req.user

  // * Query the ChatRoom collection to find a room with both users
  const existingChatRoom = await ChatRoom.exists({
    users: {
      $all: users,
    },
  });

  if (existingChatRoom) {
    return res.status(403).json({
      error: "Error: A chat room containing this users already exists"
    })
  }

  if (users.length !== 2) {
    return res.status(400).json({
      error: "Error: A chat room must have two users"
    })
  }

  const chatRoom = new ChatRoom({
    users,
  })

  const savedChatRoom = await chatRoom.save()
  user.chatRooms = user.chatRooms.concat(savedChatRoom.id)
  await user.save()
  await savedChatRoom.populate('users', {
    username: 1,
    firstName: 1,
    lastName: 1,
    avatarPhoto: 1,
    lastTimeOnline: 1
  })

  res.status(201).json(savedChatRoom)
})

// chatRoomsRouter.delete('/:id', [isValidID, chatRoomExtractor], async (req, res) => {
//   const authorId = req.chatRoom.user.toString()
//   const userId = req.token.id

//   if (authorId === userId) {
//     await ChatRoom.findByIdAndRemove(req.params.id)
//     res.status(204).end()
//   } else
//     res
//       .status(401)
//       .send({ error: "You are not allowed to delete someone else's chatRooms" })
// })

// chatRoomsRouter.put('/:id', isValidID, async (req, res) => {
//   const { likes } = req.body

//   const updatedChatRoom = await ChatRoom.findByIdAndUpdate(
//     req.params.id,
//     { likes },
//     {
//       new: true,
//     }
//   )

//   if (!updatedChatRoom) {
//     return res
//       .status(404)
//       .send({ error: "The chatRoom that you are trying to update no longer exists" })
//   }

//   await updatedChatRoom.populate('user', { username: 1, name: 1 })
//   await updatedChatRoom.populate('messages', { content: 1 })

//   return res.status(200).json(updatedChatRoom.toJSON())
// })

module.exports = chatRoomsRouter
