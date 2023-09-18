const mongoose = require('mongoose')

// TODO: Add contacts
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  passwordHash: String,
  avatarPhoto: String,
  lastTimeOnline: Date,
  chatRooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ChatRoom',
    },
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
