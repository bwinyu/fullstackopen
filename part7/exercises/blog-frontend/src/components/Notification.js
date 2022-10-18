import { Alert } from '@mui/material'

import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (notification.message === null) {
    return null
  }

  let severity = 'success'
  if (notification.type === 'error') {
    severity = 'error'
  }

  return <Alert severity={severity}>{notification.message}</Alert>
}

export default Notification
