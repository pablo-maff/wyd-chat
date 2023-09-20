import ChatInstance from './ChatInstance'

const baseURL = '/chatRooms'

async function createMessage(newMessage) {
  const id = newMessage.chatRoomId
  const message = await ChatInstance.post(`${baseURL}/${id}/messages`, newMessage)

  return message
}

export default {
  createMessage
}