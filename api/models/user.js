const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');

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
  socketId: String,
  online: Boolean,
  isVerified: {
    type: Boolean,
    default: false
  },
  chatRooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ChatRoom',
    },
  ],
},
  {
    methods: {
      generateVerificationToken() {
        const user = this
        const verificationToken = jwt.sign(
          { id: user._id },
          process.env.USER_VERIFICATION_TOKEN_SECRET,
          { expiresIn: '7d' }
        );
        return verificationToken;
      }
    }
  }
)

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
