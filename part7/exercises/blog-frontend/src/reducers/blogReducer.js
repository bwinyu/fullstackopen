import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload
      )
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

export const { appendBlog, setBlogs, updateBlog, deleteBlog } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (id) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.getById(id)
      const newBlog = {
        ...blog,
        likes: blog.likes + 1,
      }
      const savedBlog = await blogService.update(newBlog)
      dispatch(updateBlog(savedBlog))
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 'error'))
    }
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id)
      dispatch(deleteBlog(id))
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 'error'))
    }
  }
}

export const getBlogById = (id) => {
  return async (dispatch) => {
    const blog = await blogService.getById(id)
    dispatch(setBlogs([blog]))
  }
}

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const newComment = {
      comment,
    }
    const savedBlog = await blogService.createComment(id, newComment)
    dispatch(updateBlog(savedBlog))
  }
}

export default blogSlice.reducer
