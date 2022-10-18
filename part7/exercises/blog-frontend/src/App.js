import { Container } from '@mui/material'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Menu from './components/Menu'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import UserList from './components/UserList'
import UserDetails from './components/UserDetails'

import { initializeLogin } from './reducers/loginReducer'

import { Routes, Route } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.login)

  useEffect(() => {
    dispatch(initializeLogin())
  }, [])

  return (
    <Container>
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <>
          <Menu />
          <h2>Blog App</h2>
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/blogs" element={<BlogList />} />
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<UserDetails />} />
          </Routes>
        </>
      )}
    </Container>
  )
}

export default App
