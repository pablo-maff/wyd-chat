import ChatInstance from './ChatInstance'

const baseURL = '/users'

async function getUser(userId) {
  const user = await ChatInstance.get(`${baseURL}/${userId}`)

  return user
}


async function register(userData) {
  const register = await ChatInstance.post(`${baseURL}`, userData)

  return register
}

export default {
  getUser,
  register
}