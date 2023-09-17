const mongoose = require('mongoose')

// TODO: Add contacts
const userSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  passwordHash: String,
  avatarPhoto: String,
  lastTimeOnline: Date
  // blogs: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'ChatRoom',
  //   },
  // ],
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
