import ChatInstance from './ChatInstance'

const baseURL = '/users'

async function getUser(userId) {
  const user = await ChatInstance.get(`${baseURL}/${userId}`)

  return user
}

export default {
  getUser
}