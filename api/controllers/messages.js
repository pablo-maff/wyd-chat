const messagesRouter = require('express').Router()

const Message = require('../models/message')
const ChatRoom = require('../models/chatRoom')

// messagesRouter.get('/', (req, res) => {
//   Message.find({}).then((messages) => {
//     res.json(messages)
//   })
// })

// TODO: Request token to post a message
messagesRouter.post('/', async (req, res) => {
  // TODO: Validate that from and the user id linked to the token are the same before saving anything
  const { from, to, text, chatRoomId } = req.body

  const selectedChatRoom = await ChatRoom.findById(chatRoomId)
    .populate('lastMessages', {
      from: 1
    })


  if (!selectedChatRoom) {
    return res.status(404).json({
      error: "Selected chat room does not exist"
    })
  }

  const message = new Message({
    from,
    to,
    text,
    timestamp: new Date().toISOString(),
    chatRoomId
  })

  const savedMessage = await message.save()
  res.status(200).json(savedMessage)

  const userLastMessageIndex = selectedChatRoom.lastMessages.findIndex(lastMessage => lastMessage.from.toString() === from)

  if (selectedChatRoom.lastMessages.length <= 2 && userLastMessageIndex == -1) {
    selectedChatRoom.lastMessages = selectedChatRoom.lastMessages.concat(savedMessage)
  }

  if (userLastMessageIndex >= 0 && userLastMessageIndex <= 1) {
    selectedChatRoom.lastMessages[userLastMessageIndex] = savedMessage
  }

  await selectedChatRoom.save()
})

module.exports = messagesRouter
