const mongoose = require('mongoose')
const S3ClientManager = require('../utils/S3ClientManager')

const chatRoomSchema = new mongoose.Schema({
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  ],
  messages: [
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

// * Generate temporary public s3 url every time a document has been initialized from the db
// TODO: Make file an object storing the original file name, the temp url and the expiration date of the url. Only generate new urls after the previous one expired
chatRoomSchema.post('init', async function (doc) {
  if (doc.file) {
    const s3 = S3ClientManager.getInstance()

    const tempURL = await s3.generateTempPublicURL(doc.file)

    doc.avatarPhoto = tempURL
  }
})

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema)

module.exports = ChatRoom
