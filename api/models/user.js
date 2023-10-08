const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const { validateEmail } = require('../utils/helperFunctions');
const S3ClientManager = require('../utils/S3ClientManager');

// TODO: Add contacts
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    validate: [validateEmail, 'invalid email']
  },
  firstName: {
    type: String,
    required: true,
    minLength: 2
  },
  lastName: {
    type: String,
    required: true,
    minLength: 2
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

// * Generate temporary public s3 url every time a document has been initialized from the db
// TODO: Make avatarPhoto an object storing the original file name, the temp url and the expiration date of the url. Only generate new urls after the previous one expired
userSchema.post('init', async function (doc) {
  if (doc.avatarPhoto) {
    const s3 = S3ClientManager.getInstance()

    const tempURL = await s3.generateTempPublicURL(doc.avatarPhoto)

    doc.avatarPhoto = tempURL
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
