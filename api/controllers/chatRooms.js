const chatRoomsRouter = require('express').Router()
const ChatRoom = require('../models/chatRoom')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

chatRoomsRouter.get('/', userExtractor, async (req, res) => {
  const userId = req.user.id

  // ! Might want this query at some point to use aggregate's pipeline to handle modifications directly with mongoose https://masteringjs.io/tutorials/mongoose/aggregate
  // * Find the chat rooms where the user is a member
  const chatRooms = await ChatRoom.find({
    users: { $in: [userId] }
  }).lean()
    .populate({
      path: 'users',
      select: 'firstName lastName avatarPhoto lastTimeOnline',
      match: { _id: { $ne: userId } }, // * Match the record that does not belong to the user requesting the chat room
    })
    .populate({
      path: 'lastMessages',
      select: 'from to text timestamp',
      match: { from: { $ne: userId } } // * Match the record that does not belong to the user requesting the chat room
    })

  // * Modify data to be easier to deal with in the FE.
  const modifiedChatRooms = chatRooms?.map((room) => {
    const { _id, users, lastMessages } = room;

    const modifiedLastMessages = lastMessages.map(({ _id, ...messageRest }) => ({
      id: _id,
      ...messageRest,
    }));

    const modifiedUser = users.map(({ _id, ...userRest }) => {
      const appendLastMessage = {
        ...userRest,
        lastMessage: modifiedLastMessages.length ? modifiedLastMessages[0] : null,
      }

      return {
        id: _id,
        ...appendLastMessage,
      }
    })

    const newChatRoom = {
      id: _id,
      name: `${modifiedUser[0].firstName} ${modifiedUser[0].lastName}`,
      contact: modifiedUser[0],
    };

    return newChatRoom
  });

  res.status(200).json(modifiedChatRooms)
})

chatRoomsRouter.post('/', userExtractor, async (req, res) => {
  const { users } = req.body
  const userId = req.user.id

  // * Query the ChatRoom collection to find a room with both users
  if (users.length !== 2) {
    return res.status(400).json({
      error: 'Error: A chat room must have two users'
    })
  }

  if (!users.includes(userId.toString())) {
    return res.status(403).json({
      error: 'Can not create a chat room for other users'
    })
  }

  const existingChatRoom = await ChatRoom.exists({
    users: {
      $all: users,
    },
  });

  if (existingChatRoom) {
    return res.status(403).json({
      error: 'Error: A chat room containing this users already exists'
    })
  }

  const chatRoom = new ChatRoom({
    users
  })

  const savedChatRoom = await chatRoom.save()

  await savedChatRoom.populate('users', {
    username: 1,
    firstName: 1,
    lastName: 1,
    avatarPhoto: 1,
    lastTimeOnline: 1
  })

  // Add the chat room to both users
  const updatePromises = users.map(async (userId) => {
    return await User.findByIdAndUpdate(
      userId,
      { $push: { chatRooms: savedChatRoom.id } }
    );
  });

  await Promise.all(updatePromises);

  res.status(201).json(savedChatRoom)
})

module.exports = chatRoomsRouter
