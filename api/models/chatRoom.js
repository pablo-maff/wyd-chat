const mongoose = require('mongoose')

const chatRoomSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  ],
  lastMessages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    }
  ],
})

chatRoomSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema)

module.exports = ChatRoom
