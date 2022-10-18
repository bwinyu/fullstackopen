import { createSlice } from '@reduxjs/toolkit'

import usersService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  },
})

export const { setUsers } = usersSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll()
    dispatch(setUsers(users))
  }
}

export const getUserById = (id) => {
  return async (dispatch) => {
    const user = await usersService.getById(id)
    dispatch(setUsers([user]))
  }
}

export default usersSlice.reducer
