const mongoose = require('mongoose')
//import { agent as supertest } from 'supertest'
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const ChatRoom = require('../models/chatRoom')
const { describe } = require('eslint/lib/rule-tester/rule-tester')

const api = supertest.agent(app)

beforeAll(async () => {
  const response = await api.post('/api/login').send({
    username: 'pmaff',
    password: 'pabpass',
  })
  api.auth(response.body.token, { type: 'bearer' })
})

beforeEach(async () => {
  await ChatRoom.deleteMany({})

  const chatRoomObject = helper.initialChatRooms
  const promiseArray = chatRoomObject.map((chatRoom) =>
    api.post('/api/chatRooms').send(chatRoom)
  )
  await Promise.all(promiseArray)
})

describe('When there are chatRooms already saved', () => {
  test('chatRooms are returned as json', async () => {
    await api
      .get('/api/chatRooms')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all chatRooms are returned', async () => {
    const response = await api.get('/api/chatRooms').expect(200)

    expect(response.body).toHaveLength(helper.initialChatRooms.length)
  })

  test('identifier is named "id"', async () => {
    const response = await api.get('/api/chatRooms').expect(200)

    expect(response.body[0].id).toBeDefined()
  })
})

describe('Adding a new chatRoom post', () => {
  test('is succesfully created', async () => {
    await api.post('/api/chatRooms').send(helper.postNewChatRoom).expect(201)

    expect(await helper.chatRoomsInDb()).toHaveLength(
      helper.initialChatRooms.length + 1
    )
  })

  test('saves its content', async () => {
    await api
      .post('/api/chatRooms')
      .send(helper.postNewChatRoom)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const chatRooms = await helper.chatRoomsInDb()
    delete chatRooms.at(-1).id
    delete chatRooms.at(-1).user
    delete chatRooms.at(-1).comments

    expect(chatRooms.at(-1)).toEqual(
      expect.objectContaining({
        author: helper.postNewChatRoom.author,
        title: helper.postNewChatRoom.title,
        likes: helper.postNewChatRoom.likes,
        url: helper.postNewChatRoom.url,
      })
    )
  })

  test('if likes property is missing, default value is 0', async () => {
    let toPost = helper.postNewChatRoom
    delete toPost.likes

    await api.post('/api/chatRooms').send(toPost).expect(201)

    const chatRooms = await helper.chatRoomsInDb()
    expect(chatRooms.at(-1)).toHaveProperty('likes', 0)
  })

  test('if title and url properties are missing, return 400 Bad Request', async () => {
    let toPost = helper.postNewChatRoom
    delete toPost.title
    delete toPost.url

    await api.post('/api/chatRooms').send(toPost).expect(400)
  })
})

describe('Deleting a chatRoom', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const chatRoomsAtStart = await helper.chatRoomsInDb()
    const chatRoomToDelete = chatRoomsAtStart[0]
    await api.delete(`/api/chatRooms/${chatRoomToDelete.id}`).expect(204)
  })

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api.delete(`/api/chatRooms/${invalidId}`).expect(400)
  })

  test('chatRoom is effectively deleted', async () => {
    const chatRoomsAtStart = await helper.chatRoomsInDb()
    const chatRoomToDelete = chatRoomsAtStart[0]

    await api.delete(`/api/chatRooms/${chatRoomToDelete.id}`)

    const chatRoomsAtEnd = await helper.chatRoomsInDb()

    expect(chatRoomsAtEnd).toHaveLength(helper.initialChatRooms.length - 1)
    expect(chatRoomsAtEnd).not.toContainEqual(chatRoomToDelete)
  })
})

describe('Viewing a specific chatRoom', () => {
  test('succeeds if id is valid', async () => {
    const chatRoomsAtStart = await helper.chatRoomsInDb()
    const chatRoomToView = {
      ...chatRoomsAtStart[0],
      user: chatRoomsAtStart[0].user.toString(),
    }

    const reqChatRoom = await api
      .get(`/api/chatRooms/${chatRoomToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const resChatRoom = { ...reqChatRoom.body, user: reqChatRoom.body.user.id }

    expect(chatRoomToView).toEqual(resChatRoom)
  })

  test('fails with statuscode 404 if chatRoom does not exist', async () => {
    const validNonExistingId = await helper.nonExistingId()

    await api.get(`/api/chatRooms/${validNonExistingId}`).expect(404)
  })

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api.get(`/api/chatRooms/${invalidId}`).expect(400)
  })
})

describe('Updating a chatRoom', () => {
  test('succeed with statuscode 200 if chatRoom is succesfully updated', async () => {
    const chatRoomsAtStart = await helper.chatRoomsInDb()
    const chatRoomToUpdate = {
      ...chatRoomsAtStart[0],
      user: chatRoomsAtStart[0].user.toString(),
      likes: 23,
    }

    await api
      .put(`/api/chatRooms/${chatRoomToUpdate.id}`)
      .send(chatRoomToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const chatRoomsAtEnd = await helper.chatRoomsInDb()
    const updatedChatRoom = {
      ...chatRoomsAtEnd[0],
      user: chatRoomsAtStart[0].user.toString(),
    }

    expect(updatedChatRoom).toEqual(chatRoomToUpdate)
  })

  test('fails with statuscode 404 if chatRoom does not exist', async () => {
    const validNonExistingId = await helper.nonExistingId()
    const chatRoomsAtStart = await helper.chatRoomsInDb()
    const chatRoomToUpdate = chatRoomsAtStart[0]

    await api
      .put(`/api/chatRooms/${validNonExistingId}`)
      .send(chatRoomToUpdate)
      .expect(404)
  })

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'
    const chatRoomsAtStart = await helper.chatRoomsInDb()
    const chatRoomToUpdate = chatRoomsAtStart[0]

    await api.put(`/api/chatRooms/${invalidId}`).send(chatRoomToUpdate).expect(400)
  })
})

describe('Author', () => {
  test('with most chatRooms', async () => {
    const chatRooms = await helper.chatRoomsInDb()
    const mostChatRooms = helper.mostChatRooms(chatRooms)

    expect(mostChatRooms).toMatchObject({
      author: 'Dummy author',
      chatRooms: 2,
    })
  })

  test('with most likes', async () => {
    const chatRooms = await helper.chatRoomsInDb()
    const mostLikes = helper.mostLikes(chatRooms)

    expect(mostLikes).toMatchObject({
      author: 'Dummy author',
      likes: 12,
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
