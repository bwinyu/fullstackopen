import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('blog tests', () => {
  let container
  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'https://testurl',
    likes: 10
  }
  const currentUser = {
    username: 'baldwinyu',
    name: 'Baldwin Yu'
  }
  const likeBlog = jest.fn()
  const deleteBlog = jest.fn()

  beforeEach(() => {
    container = render(<Blog blog={blog} deleteBlog={deleteBlog} likeBlog={likeBlog} currentUser={currentUser} />).container
  })

  test('title author displayed initially', async () => {
    await screen.findByText('Test title Test author')
  })

  test('blog details hidden initially', () => {
    const div = container.querySelector('.blogDetails')
    expect(div).toHaveStyle('display: none')
  })

  test('blog details displayed when button clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    await screen.findByText('https://testurl')
    await screen.findByText('likes 10')
  })

  test('like button works', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(likeBlog.mock.calls).toHaveLength(2)
  })
})