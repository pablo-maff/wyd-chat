const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  chatRoomID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatRoom',
    required: true
  },
})

messageSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message
