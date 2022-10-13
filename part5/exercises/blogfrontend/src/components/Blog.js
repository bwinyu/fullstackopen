import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, deleteBlog, currentUser }) => {
  const [visible, setVisible] = useState(false)

  const isVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikeBlog = (event) => {
    event.preventDefault()
    likeBlog(blog)
  }

  const handleDeleteBlog = (event) => {
    event.preventDefault()
    deleteBlog(blog)
  }

  return (
    <div className="blog-post" style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      <div className="blogDetails" style={isVisible}>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={handleLikeBlog}>like</button></div>
        <div>{blog.author}</div>
        {
          blog.user && blog.user.id === currentUser.id ? <button onClick={handleDeleteBlog}>remove</button> : ''
        }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
}

export default Blog