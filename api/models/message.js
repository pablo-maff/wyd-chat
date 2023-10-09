const mongoose = require('mongoose');
const S3ClientManager = require('../utils/S3ClientManager');

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
    required: function () {
      return !this.file;
    },
    minLength: 1,
    maxLength: [4000, 'Too many characters, max length is 4000']
  },
  file: {
    type: String,
    required: function () {
      return !this.text
    },
  },
  timestamp: {
    type: Date,
    required: true,
  },
  chatRoomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatRoom',
    required: true
  },
  unread: {
    type: Boolean,
    default: true
  }
},
  {
    methods: {
      // * Generate temporary public s3 url every time a document has been initialized from the db
      // TODO: Make file an object storing the original file name, the temp url and the expiration date of the url. Only generate new urls after the previous one expired
      async generateFileTempPublicURL(doc) {
        if (doc.file) {
          const s3 = S3ClientManager.getInstance();
          const tempURL = await s3.generateTempPublicURL(doc.file);
          doc.file = tempURL;
        }
      }
    }
  }
)

messageSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

messageSchema.post('init', async function (doc) {
  await this.generateFileTempPublicURL(doc)
})

messageSchema.post('save', async function (doc) {
  await this.generateFileTempPublicURL(doc)
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message
