const dummy = (blogs) => {
  return blogs ? 1 : 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => {
        return sum + blog.likes
      }, 0)
}

const favoriteBlog = (blogs) => {
  let favorite = {
    title: null,
    author: null,
    likes: 0,
  }

  blogs.forEach((blog) => {
    if (blog.likes >= favorite.likes) {
      favorite = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
      }
    }
  })

  return favorite
}

const mostBlogs = (blogs) => {
  let authors = {}
  blogs.forEach((blog) => {
    authors[blog.author] = authors[blog.author] ? authors[blog.author] + 1 : 1
  })

  let mostBlogs = {
    author: null,
    blogs: 0,
  }

  Object.keys(authors).forEach((author) => {
    const blogCount = authors[author]
    if (blogCount >= mostBlogs.blogs) {
      mostBlogs = {
        author: author,
        blogs: blogCount,
      }
    }
  })

  return mostBlogs
}

const mostLikes = (blogs) => {
  let authors = {}
  blogs.forEach((blog) => {
    authors[blog.author] = authors[blog.author]
      ? authors[blog.author] + blog.likes
      : blog.likes
  })

  let mostLikes = {
    author: null,
    likes: 0,
  }

  Object.keys(authors).forEach((author) => {
    const likes = authors[author]
    if (likes >= mostLikes.likes) {
      mostLikes = {
        author: author,
        likes: likes,
      }
    }
  })

  return mostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
