import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const handleNewBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    })

    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title:
          <input
            type="text"
            value={newBlog.title}
            onChange={({ target }) => setNewBlog({...newBlog, title: target.value})}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={newBlog.author}
            onChange={({ target }) => setNewBlog({...newBlog, author: target.value})}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newBlog.url}
            onChange={({ target }) => setNewBlog({...newBlog, url: target.value})}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm