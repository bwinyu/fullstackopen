const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const Comment = require('../models/comments')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blogs = await Blog.findById(request.params.id)
    .populate('user', {
      username: 1,
      name: 1,
    })
    .populate('comments', { comment: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  let blog = request.body
  const user = request.user

  blog = {
    ...blog,
    user: user._id,
  }

  const newBlog = new Blog(blog)

  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user

    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() !== user.id.toString()) {
      return response
        .status(401)
        .json({ error: 'only the owner can delete this blog' })
    }
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
)

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = await Blog.findById(request.params.id)

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: blog.user,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {
    new: true,
    runValidator: true,
    context: 'query',
  })
  response.json(updatedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  let comment = request.body
  const blog = await Blog.findById(request.params.id)

  comment = {
    ...comment,
    blog: blog._id,
  }

  const newComment = new Comment(comment)

  const savedComment = await newComment.save()
  blog.comments = blog.comments
    ? blog.comments.concat(savedComment)
    : [savedComment]
  await blog.save()

  await blog.populate('comments', { comment: 1 })

  response.status(201).json(blog)
})

module.exports = blogsRouter
