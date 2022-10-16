import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return null
    }
  }
})

export const { createNotification, removeNotification } = notificationSlice.actions

let removeNotificationTimeout

export const setNotification = (message, seconds) => {
  return dispatch => {
    clearTimeout(removeNotificationTimeout)
    dispatch(createNotification(message))
    removeNotificationTimeout = setTimeout(() => {
      dispatch(removeNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer