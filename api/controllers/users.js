const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { isValidId, userExtractor, writeFile, s3ClientMiddleware } = require('../utils/middleware');
const { validateEmail } = require('../utils/helperFunctions');
const nodemailer = require('nodemailer');
const multer = require('multer');
const { PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

usersRouter.get('/', userExtractor, async (req, res) => {
  const users = await User.find({ isVerified: true })
    .select('firstName lastName avatarPhoto lastTimeOnline online')

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

usersRouter.post('/', writeFile, async (req, res) => {
  const { username, firstName, lastName, password } = req.body
  const avatarPhoto = req.fileName

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

  const user = new User({
    username,
    firstName,
    lastName,
    passwordHash,
    avatarPhoto,
    lastTimeOnline: null
  })

  const savedUser = await user.save()

  const verificationToken = savedUser.generateVerificationToken();

  const baseURL = process.env.NODE_ENV === 'production' ? 'https://wyd-chat.onrender.com' : 'http://localhost:3003'

  const url = `${baseURL}/api/verify/${verificationToken}`
  transporter.sendMail({
    to: username,
    subject: 'Verify Account',
    html: `Click <a href = '${url}'>here</a> to confirm your email.`
  })

  res.status(201).json({
    message: `Sent a verification email to ${username}`
  })
})



const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });


usersRouter.put('/:id', [isValidId, userExtractor, s3ClientMiddleware, upload.single('file')], async (req, res) => {
  const { id } = req.user
  const { firstName, lastName } = req.body
  const Bucket = process.env.S3_BUCKET;

  const { s3Client } = req

  const file = req.file

  let fileName
  let tempUrl

  if (file) {
    fileName = `${Date.now()}-${file.originalname}`
    // * Define the S3 upload parameters
    const params = {
      Bucket,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype
    };

    const putCommand = new PutObjectCommand(params);

    await s3Client.send(putCommand);

    const getCommand = new GetObjectCommand({
      Bucket: params.Bucket,
      Key: params.Key
    });

    tempUrl = await getSignedUrl(s3Client, getCommand, { expiresIn: 7 * 24 * 60 }); // * profile avatar temp URL expires in 7 days (Same than the token)
  }
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { firstName, lastName, avatarPhoto: fileName },
    {
      new: true,
    }
  ).select('firstName lastName avatarPhoto')

  if (!updatedUser) {
    return res
      .status(404)
      .json({ error: 'Unable to find user' })
  }

  updatedUser.avatarPhoto = tempUrl

  res.status(200).json({
    updatedUser
  })
})

module.exports = usersRouter
