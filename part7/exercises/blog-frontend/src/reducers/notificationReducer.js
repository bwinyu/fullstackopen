import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: null,
    type: '',
  },
  reducers: {
    createNotification(state, action) {
      state.message = action.payload
    },
    removeNotification(state) {
      state.message = null
    },
    setNotificationType(state, action) {
      state.type = action.payload
    },
  },
})

export const { createNotification, removeNotification, setNotificationType } =
  notificationSlice.actions

let removeNotificationTimeout

export const setNotification = (message, type = '', seconds = 5) => {
  return (dispatch) => {
    clearTimeout(removeNotificationTimeout)
    dispatch(createNotification(message))
    dispatch(setNotificationType(type))
    removeNotificationTimeout = setTimeout(() => {
      dispatch(removeNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
