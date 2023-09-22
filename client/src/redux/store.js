import { configureStore } from '@reduxjs/toolkit'
import userChatsReducer from './reducers/userChatsReducer'
import socketMiddleware from './middleware/socketMiddleware'
import SocketClient from '../utils/SocketClient'
import userAuthenticationReducer from './reducers/userAuthenticationReducer'

const socket = new SocketClient()

socket.connect()

export const store = configureStore({
  reducer: {
    userChats: userChatsReducer,
    userAuthentication: userAuthenticationReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware(socket)),
})
