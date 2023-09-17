const messagesRouter = require('express').Router()

const Message = require('../models/message')
const ChatRoom = require('../models/chatRoom')
const { userExtractor } = require('../utils/middleware')

// messagesRouter.get('/', (req, res) => {
//   Message.find({}).then((messages) => {
//     res.json(messages)
//   })
// })

messagesRouter.post('/', userExtractor, async (req, res) => {
  const { from, to, text, chatRoomId } = req.body
  const user = req.user

  if (user.id.toString() !== from) {
    return res.status(403).json({
      error: 'User must be the one sending the message'
    })
  }

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

  // * Priority #1 is to write the new message to the db as fast as possible
  // * That's why the operation to update the last message is made after the user receives a response, if it fails, this is not something critical to our application

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
