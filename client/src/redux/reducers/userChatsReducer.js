import { createSlice } from '@reduxjs/toolkit'
import UserService from '../../services/users';
import ChatRoomService from '../../services/chatRooms';
import { isAfter, parseISO } from 'date-fns';

const userChatsSlice = createSlice({
  name: 'userChats',
  initialState: { data: null, loading: false, error: null },
  reducers: {
    setUserChats(state, action) {
      const { data } = action.payload

      const parsedData = {
        ...data,
        activeChat: null,
        chatRooms: data.chatRooms.map(chatRoom => {
          return {
            id: chatRoom?.id,
            title: `${chatRoom?.members[0]?.firstName} ${chatRoom?.members[0]?.lastName}`,
            messages: chatRoom.messages,
            contact: {
              ...chatRoom?.members[0],
              lastMessage: chatRoom?.messages
                .reduce((latestMessage, message) => {
                  if (message?.from !== chatRoom?.members[0]?.id) {
                    return latestMessage
                  }

                  if (!latestMessage) {
                    return message
                  }

                  const messageTimestamp = parseISO(message.timestamp);
                  const latestTimestamp = parseISO(latestMessage.timestamp);

                  if (isAfter(messageTimestamp, latestTimestamp)) {

                    return message;
                  }

                  return latestMessage;
                }, null)
            },
          }
        })
      }

      return { ...state, data: parsedData, loading: false, error: null }
    },
    setActiveChat(state, action) {
      const findActiveChat = state.data.chatRooms?.find(chatRoom => chatRoom.id === action.payload)

      if (!findActiveChat) {
        return { ...state, error: { message: 'Error: Unable to select this conversation' } }
      }

      return { ...state, data: { ...state.data, activeChat: findActiveChat } }
    },
    appendChatRoomMessage(state, action) {
      const { activeChat } = state.data
      const { message } = action.payload

      const appendedMessageToActiveChat = { ...activeChat, messages: [...activeChat.messages, message] }

      return {
        ...state,
        data: {
          ...state.data,
          activeChat: appendedMessageToActiveChat,
          chatRooms: state.data.chatRooms
            .map(chatRoom =>
              chatRoom.id !== appendedMessageToActiveChat.id ? chatRoom : appendedMessageToActiveChat
            )
        }
      }
    },
    setUserChatsLoading(state) {
      state.loading = true
      state.error = null
    },
    setUserChatsError(state, action) {
      state.loading = false
      state.error = { message: `Error: ${action.payload}` }
    },
  },
})

export const { setUserChats, setActiveChat, appendChatRoomMessage, setUserChatsLoading, setUserChatsError } = userChatsSlice.actions

export const initializeUserChats = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(setUserChatsLoading());

      const { data: userChatData } = await UserService.getUser(userId)


      dispatch(setUserChats({ data: userChatData }))
    }
    catch (error) {
      console.error(error)
      dispatch(setUserChatsError(`Unable to fetch your chats data: ${error.message}: ${error.response?.data?.error}`));
    }
  }
}

export const activateChat = (chatId) => {
  return (dispatch) => {
    try {
      dispatch(setActiveChat(chatId))
    }
    catch (error) {
      console.error(error)
      dispatch(setUserChatsError(`Unable to select that chat: ${error.message}`));
    }
  }
}

export const createChatRoomMessage = (newMessage) => {
  return async (dispatch) => {
    try {
      const { data: message } = await ChatRoomService.createMessage(newMessage)

      dispatch(appendChatRoomMessage({ message }))
    }
    catch (error) {
      console.error(error)
      dispatch(setUserChatsError(`Unable to send your message: ${error.message}: ${error.response?.data?.error}`));
    }
  }
}

export default userChatsSlice.reducer