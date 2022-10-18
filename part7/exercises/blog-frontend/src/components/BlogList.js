import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'

import { initializeBlogs } from '../reducers/blogReducer'

import { Link } from 'react-router-dom'

const BlogList = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  return (
    <div>
      <Togglable buttonLabel="new note">
        <BlogForm />
      </Togglable>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>
                    {blog.title} {blog.author}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BlogList
