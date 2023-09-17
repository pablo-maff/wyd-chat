const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { faker } = require('@faker-js/faker');

// TODO: Get logged in user contacts here
// usersRouter.get('/', async (req, res) => {
//   const users = await User.find({}).populate('chatRooms', {
//     url: 1,
//     title: 1,
//     author: 1,
//   })

//   res.json(users)
// })

usersRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id)

  user ? res.json(user.toJSON()) : res.status(404).end()
})

usersRouter.post('/', async (req, res) => {
  const { username, firstName, lastName, password } = req.body

  if (username && password && username.length >= 3 && password.length >= 3) {
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({ error: 'Username must be unique ' })
    }
  } else
    return res.status(400).json({
      error:
        'Username and Password must be provided and they must be at least 3 characters long',
    })

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  // ! Added here after request. Model now expects a string which is an url to the image. Probably need to change it to buffer to upload proper files
  const tempAvatarPhoto = faker.image.avatar()

  const user = new User({
    username,
    firstName,
    lastName,
    passwordHash,
    avatarPhoto: tempAvatarPhoto
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

module.exports = usersRouter
