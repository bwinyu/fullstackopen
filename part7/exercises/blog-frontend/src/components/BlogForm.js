import { Button, TextField } from '@mui/material'

import { useDispatch } from 'react-redux'

import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

  const handleNewBlog = (event) => {
    event.preventDefault()

    try {
      dispatch(
        createBlog({
          title: event.target.blogTitle.value,
          author: event.target.blogAuthor.value,
          url: event.target.blogUrl.value,
        })
      )
      dispatch(setNotification('Created blog'))

      event.target.blogTitle.value = ''
      event.target.blogAuthor.value = ''
      event.target.blogUrl.value = ''
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 'error'))
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          <TextField size="small" label="title" type="text" name="blogTitle" />
        </div>
        <div>
          <TextField
            size="small"
            label="author"
            type="text"
            name="blogAuthor"
          />
        </div>
        <div>
          <TextField size="small" label="url" type="text" name="blogUrl" />
        </div>
        <Button
          id="newBlogSubmit"
          size="small"
          variant="contained"
          color="primary"
          type="submit"
        >
          create
        </Button>
      </form>
    </div>
  )
}

export default BlogForm
