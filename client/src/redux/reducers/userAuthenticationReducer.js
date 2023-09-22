import { createSlice } from '@reduxjs/toolkit'
import LoginService from '../../services/loginService';
// import { setNotification } from './notificationReducer'
import { LocalStorageManager } from '../../utils/LocalStorageManager';

const { getItem, setItem, removeItem } = LocalStorageManager

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
      // dispatch(setNotification(`Welcome ${loggedInUser.name}`, 'success', 5))
    } catch (error) {
      console.error(error);
      // dispatch(setNotification('Invalid credentials', 'alert', 5))
    }
  }
}

export const keepUserSessionAlive = () => {
  return (dispatch) => {
    try {
      const user = getItem('user')

      console.log('keep user', user);
      if (user) {
        dispatch(login(user))
      }
    } catch (error) {
      console.error('keepusersession Error', error)
    }
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(logout(null))
  }
}

export default loggedUserSlice.reducer