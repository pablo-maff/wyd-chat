import ChatInstance from './ChatInstance'

const baseURL = '/login'

async function login(credentials) {
  const login = await ChatInstance.post(`${baseURL}`, credentials)

  return login
}

export default {
  login
}