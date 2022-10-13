import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'



describe('blog form tests', () => {
  let container
  const createBlog = jest.fn()

  beforeEach(() => {
    container = render(<BlogForm createBlog={createBlog} />).container
  })

  test('create new blog works', async () => {
    const user = userEvent.setup()

    await user.type(container.querySelector('[name="blogTitle"]'), 'test title')
    await user.type(container.querySelector('[name="blogAuthor"]'), 'test author')
    await user.type(container.querySelector('[name="blogUrl"]'), 'test url')

    const button = screen.getByText('create')
    await user.click(button)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('test title')
    expect(createBlog.mock.calls[0][0].author).toBe('test author')
    expect(createBlog.mock.calls[0][0].url).toBe('test url')
  })
})