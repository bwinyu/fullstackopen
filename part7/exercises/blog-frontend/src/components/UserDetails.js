import { List, ListItem } from '@mui/material'

import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { getUserById } from '../reducers/usersReducer'

import { useMatch } from 'react-router-dom'

const UserDetails = () => {
  const userMatch = useMatch('/users/:id')

  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  const user = users.length > 0 ? users[0] : null

  useEffect(() => {
    dispatch(getUserById(userMatch.params.id))
  }, [])

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <List>
        {user.blogs.map((blog) => (
          <ListItem key={blog.id}>{blog.title}</ListItem>
        ))}
      </List>
    </div>
  )
}

export default UserDetails
