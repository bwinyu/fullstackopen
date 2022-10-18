const Blog = require('../models/blogs')
const User = require('../models/users')

const initialBlogs = [
  {
    title: 'Test Blog',
    author: 'Baldwin Yu',
    url: 'http://localhost:3003/api/blogs',
    likes: 5,
  },
  {
    title: 'Test Blog 2',
    author: 'Baldwin Yu',
    url: 'http://localhost:3003/api/blogs',
    likes: 3,
  },
  {
    title: 'Test Blog 3',
    author: 'Some Author',
    url: 'http://localhost:3003/api/blogs',
    likes: 4,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
}
