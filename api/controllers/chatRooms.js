const chatRoomsRouter = require('express').Router()
const ChatRoom = require('../models/chatRoom')
const { userExtractor, chatRoomExtractor, isValidID } = require('../utils/middleware')

chatRoomsRouter.get('/', async (req, res) => {
  const chatRooms = await ChatRoom.find({})
    .populate('messages', { content: 1 })
    .populate('user', { username: 1, name: 1 })
  chatRooms ? res.status(200).json(chatRooms) : res.status(404).end()
})

chatRoomsRouter.get('/:id', isValidID, async (req, res) => {
  const chatRoom = await ChatRoom.findById(req.params.id)
    .populate('messages', { content: 1 })
    .populate('user', { username: 1, name: 1 })

  chatRoom ? res.status(200).json(chatRoom.toJSON()) : res.status(404).end()
})

chatRoomsRouter.post('/', userExtractor, async (req, res) => {
  const { title, author, url, likes } = req.body
  const user = req.user

  if (!title && !url) {
    res.status(400).end()
  }

  const chatRoom = new ChatRoom({
    title,
    author,
    url,
    likes,
    user: user.id,
  })

  const savedPost = await chatRoom.save()
  user.chatRooms = user.chatRooms.concat(savedPost.id)
  await user.save()
  await savedPost.populate('user', { username: 1, name: 1 })

  res.status(201).json(savedPost)
})

chatRoomsRouter.delete('/:id', [isValidID, chatRoomExtractor], async (req, res) => {
  const authorId = req.chatRoom.user.toString()
  const userId = req.token.id

  if (authorId === userId) {
    await ChatRoom.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } else
    res
      .status(401)
      .send({ error: "You are not allowed to delete someone else's chatRooms" })
})

chatRoomsRouter.put('/:id', isValidID, async (req, res) => {
  const { likes } = req.body

  const updatedChatRoom = await ChatRoom.findByIdAndUpdate(
    req.params.id,
    { likes },
    {
      new: true,
    }
  )

  if (!updatedChatRoom) {
    return res
      .status(404)
      .send({ error: "The chatRoom that you are trying to update no longer exists" })
  }

  await updatedChatRoom.populate('user', { username: 1, name: 1 })
  await updatedChatRoom.populate('messages', { content: 1 })

  return res.status(200).json(updatedChatRoom.toJSON())
})

module.exports = chatRoomsRouter
