const commentsRouter = require('express').Router()

const Comment = require('../models/comment')
const ChatRoom = require('../models/chatRoom')

commentsRouter.get('/', (req, res) => {
  Comment.find({}).then((comments) => {
    res.json(comments)
  })
})

commentsRouter.post('/', async (req, res) => {
  const body = req.body

  const id = body.chatRoomID
  const commentedChatRoom = await ChatRoom.findById(id)

  if (!commentedChatRoom) return res.status(404).end()

  const comment = new Comment({
    content: body.content,
    chatRoomID: body.chatRoomID,
  })

  const savedComment = await comment.save()
  commentedChatRoom.comments = commentedChatRoom.comments.concat(savedComment)
  await commentedChatRoom.save()
  res.json(savedComment)
})

module.exports = commentsRouter
