import { createSlice, current } from '@reduxjs/toolkit'
import ChatInstance from '../../services/ChatInstance';

const initialState = {
  data: null,
  onlineUsersByUsername: [],
  loading: false,
  error: null,
  typingUsers: []
}

const usersSlice = createSlice({
  name: 'userContacts',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      const { data, currentUserId } = action.payload

      const filterCurrentUser = data.filter(user => user.id !== currentUserId)

      return { ...state, data: filterCurrentUser, loading: false, error: null }
    },
    setOnlineUsersByUsername: (state, action) => {
      return { ...state, onlineUsersByUsername: action.payload }
    },
    addUser: (state, action) => {
      return { ...state, data: [...state.data, action.payload] }
    },
    setTypingUser: (state, action) => {
      state.typingUsers = [action.payload, ...[...state.typingUsers].filter(username => username !== action.payload)]
    },
    removeTypingUser: (state, { payload }) => {
      state.typingUsers = state.typingUsers.filter(username => username !== payload)
    },
    sendThisUserIsTyping: (state, { payload }) => {

    },
    sendThisUserStoppedTyping: (state, { payload }) => {

    },
    setUsersLoading: (state) => {
      state.loading = true
      state.error = null
    },
    setUsersError(state, action) {
      state.loading = false
      state.error = { message: `Error: ${action.payload}` }
    },
    resetState(state, action) {
      return initialState
    }
  },
})

export const {
  setUsers,
  addUser,
  setOnlineUsersByUsername,
  setTypingUser,
  removeTypingUser,
  sendThisUserIsTyping,
  sendThisUserStoppedTyping,
  setUsersLoading,
  setUsersError,
  resetState
} = usersSlice.actions
export default usersSlice.reducer

export function initializeUserContacts(currentUserId) {
  return async (dispatch) => {
    dispatch(setUsersLoading())

    try {
      const { data } = await ChatInstance.get('/users')

      dispatch(setUsers({ data: data, currentUserId }))
    } catch (error) {
      // Not handling errors
      console.error(error)
      dispatch(setUsersError(`Unable to fetch data data: ${error.message}: ${error.response?.data?.error}`));

    }
  }
}
