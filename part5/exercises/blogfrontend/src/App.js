import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('');
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((a, b) => a.likes < b.likes ? 1 : -1)
      return setBlogs( sortedBlogs )
    })
  }, [])

  useEffect(() => {
    const userJson = window.localStorage.getItem('blogUser')
    if(userJson) {
      const user = JSON.parse(userJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if(notification) {
      setTimeout(() => {
        setNotification(null)
        setNotificationType('')
      }, 5000)
    }
  }, [notification])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('blogUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotificationType('')
      setNotification('Successfully logged in')
    } catch(exception) {
      setNotificationType('error')
      setNotification('Wrong credentials')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('blogUser')
    blogService.setToken(null)
    setUser(null)
    setNotificationType('')
    setNotification('Successfully logged out')
  }

  const createBlog = async (blogObject) => {
    try {
      const savedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(savedBlog))
      setNotificationType('')
      setNotification('Created blog')
    } catch(exception) {
      setNotificationType('error')
      setNotification(exception.response.data.error)
    }
  }

  const likeBlog = async (blogObject) => {
    try {
      const updatedBlog = {
        ...blogObject,
        likes: blogObject.likes + 1
      }
      const savedBlog = await blogService.update(updatedBlog)
      setBlogs(blogs.map(blog => blog.id === savedBlog.id ? savedBlog : blog))
    } catch(exception) {
      setNotificationType('error')
      setNotification(exception.response.data.error)
    }
  }

  const deleteBlog = async (blogObject) => {
    if(window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) {
      try {
        await blogService.remove(blogObject.id)
        setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
      } catch(exception) {
        setNotificationType('error')
        setNotification(exception.response.data.error)
      }
    }
  }

  const loginBlock = () => (
    <div>
      <h2>login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value )}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogsBlock = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button type="submit" onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel="new note">
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} currentUser={user} />
      )}
    </div>
  )

  return (
    <>
      <Notification message={notification} type={notificationType} />
      { user === null ? loginBlock() : blogsBlock() }
    </>
  )
}

export default App