import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setToken(state, action) {
      blogService.setToken(action.payload)
    },
    setLogin(state, action) {
      return action.payload
    },
  },
})

export const { setToken, setLogin } = loginSlice.actions

export const initializeLogin = () => {
  return async (dispatch) => {
    const userJson = window.localStorage.getItem('blogUser')
    if (userJson) {
      const user = JSON.parse(userJson)
      dispatch(setLogin(user))
      dispatch(setToken(user.token))
    }
  }
}

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('blogUser', JSON.stringify(user))
      dispatch(setToken(user.token))
      dispatch(setLogin(user))
      dispatch(setNotification('Successfully logged in'))
    } catch (exception) {
      dispatch(setNotification('Wrong credentials', 'error'))
    }
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem('blogUser')
    dispatch(setToken(null))
    dispatch(setLogin(null))
    dispatch(setNotification('Successfully logged out'))
  }
}

export default loginSlice.reducer
