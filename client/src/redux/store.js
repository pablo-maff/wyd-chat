import { configureStore } from '@reduxjs/toolkit'
import userChatsReducer from './reducers/userChatsReducer'

export const store = configureStore({
  reducer: {
    userChats: userChatsReducer,
  },
})
