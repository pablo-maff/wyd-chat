const messagesRouter = require('express').Router()

const Message = require('../models/message')
const ChatRoom = require('../models/chatRoom')

messagesRouter.get('/', (req, res) => {
  Message.find({}).then((messages) => {
    res.json(messages)
  })
})

messagesRouter.post('/', async (req, res) => {
  const body = req.body

  const id = body.chatRoomID
  const messageedChatRoom = await ChatRoom.findById(id)

  if (!messageedChatRoom) return res.status(404).end()

  const message = new Message({
    content: body.content,
    chatRoomID: body.chatRoomID,
  })

  const savedMessage = await message.save()
  messageedChatRoom.messages = messageedChatRoom.messages.concat(savedMessage)
  await messageedChatRoom.save()
  res.json(savedMessage)
})

module.exports = messagesRouter
