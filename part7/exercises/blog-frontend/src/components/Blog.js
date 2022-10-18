import { Button, TextField, List, ListItem } from '@mui/material'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  likeBlog,
  removeBlog,
  getBlogById,
  addComment,
} from '../reducers/blogReducer'

import { useMatch } from 'react-router-dom'

const Blog = () => {
  const blogMatch = useMatch('/blogs/:id')

  const dispatch = useDispatch()

  const currentUser = useSelector((state) => state.login)
  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.length > 0 ? blogs[0] : null

  useEffect(() => {
    dispatch(getBlogById(blogMatch.params.id))
  }, [])

  if (!blog) {
    return null
  }

  const handleLikeBlog = (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog.id))
  }

  const handleDeleteBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id))
    }
  }

  const handleAddComment = (event) => {
    event.preventDefault()
    dispatch(addComment(blog.id, event.target.comment.value))
    event.target.comment.value = ''
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        likes {blog.likes} <Button size="small" variant="contained" color="primary" onClick={handleLikeBlog}>like</Button>
      </div>
      <div>{blog.author}</div>
      {blog.user && blog.user.id === currentUser.id ? (
        <Button size="small" variant="contained" color="primary" onClick={handleDeleteBlog}>remove</Button>
      ) : (
        ''
      )}
      <h3>comments</h3>
      <form onSubmit={handleAddComment}>
        <div>
          <TextField size="small" label="comment" name="comment" />
        </div>
        <Button size="small" variant="contained" color="primary" type="submit">add comment</Button>
      </form>
      {!blog.comments ? null : (
        <List>
          {blog.comments.map((comment) => (
            <ListItem key={comment.id}>{comment.comment}</ListItem>
          ))}
        </List>
      )}
    </div>
  )
}

export default Blog
