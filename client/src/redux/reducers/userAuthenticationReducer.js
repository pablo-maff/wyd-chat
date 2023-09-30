import { createSlice } from '@reduxjs/toolkit'
import LoginService from '../../services/loginService';
import { LocalStorageManager } from '../../utils/LocalStorageManager';
import { resetUserChatsState } from './userChatsReducer';
import { toast } from './notificationsReducer';

const { setItem, removeItem } = LocalStorageManager

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
}

const loggedUserSlice = createSlice({
  name: 'userAuthentication',
  initialState: initialState,
  reducers: {
    login(state, action) {
      setItem('user', JSON.stringify(action.payload));

      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null
      }
    },
    logout(state, action) {
      removeItem('user')

      return initialState
    }
  },
})

export const { login, logout } = loggedUserSlice.actions

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const loggedInUser = await LoginService.login(credentials)

      dispatch(login(loggedInUser.data))
      console.log('loggedInUser.data', loggedInUser.data);
      dispatch(toast(`Welcome ${loggedInUser.data.username}`, 'success'))
    } catch (error) {
      console.error(error);
      // dispatch(setNotification('Invalid credentials', 'alert', 5))
    }
  }
}

export const keepUserSessionAlive = (user) => {
  return (dispatch) => {
    dispatch(login(user))
  }
}

export const logoutUser = ({ id }) => {
  return (dispatch) => {
    dispatch(logout(id))
    dispatch(resetUserChatsState())
  }
}

export default loggedUserSlice.reducer