const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { faker } = require('@faker-js/faker');
const { isValidId, userExtractor } = require('../utils/middleware');
const { validateEmail } = require('../utils/helperFunctions');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
    .select('firstName lastName avatarPhoto lastTimeOnline online chatRooms username')

  res.json(users)
})

usersRouter.get('/:id', [isValidId, userExtractor], async (req, res) => {
  const { id } = req.user

  const users = await User.findById(id)
    .populate({
      path: 'chatRooms',
      populate: [
        {
          path: 'messages'
        },
        {
          path: 'members',
          match: { _id: { $ne: id } }, // * Only retrieve the members that are not the user making the request
          select: 'firstName lastName avatarPhoto lastTimeOnline online'
        },
      ],
    })

  res.json(users)
})

// TODO NEXT => Send validation email with token
usersRouter.post('/', async (req, res) => {
  const { username, firstName, lastName, password } = req.body

  // * For now username can only be an email address
  const isValidUsername = validateEmail(username)

  if (!isValidUsername) {
    return res.status(400).json({
      error: 'username must be a valid email address'
    })
  }

  if (password && password.length >= 8) {
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({ error: 'Username must be unique ' })
    }
  } else
    return res.status(400).json({
      error:
        'Password must be provided and must be at least 8 characters long',
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
    avatarPhoto: tempAvatarPhoto,
    lastTimeOnline: null
  })

  const savedUser = await user.save()

  const verificationToken = savedUser.generateVerificationToken();

  const url = `http://localhost:3003/api/verify/${verificationToken}`
  transporter.sendMail({
    to: username,
    subject: 'Verify Account',
    html: `Click <a href = '${url}'>here</a> to confirm your email.`
  })

  res.status(201).json({
    message: `Sent a verification email to ${username}`
  })
})

module.exports = usersRouter
