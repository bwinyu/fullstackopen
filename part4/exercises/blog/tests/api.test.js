const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blogs')

beforeEach(async () => {
  await Blog.deleteMany({})
  
  for(let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('notes length and json', async () => {
  const blogs = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(blogs.body).toHaveLength(helper.initialBlogs.length)
})

test('id is defined', async () => {
  const blogs = await helper.blogsInDb()
  
  const firstBlog = blogs[0]
  expect(firstBlog.id).toBeDefined()
})

test('blog successfully gets created', async () => {
  const newBlog = {
    title: 'new blog',
    author: 'Baldwin Yu',
    url: 'http://localhost:3003/api/blogs',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})

test('no likes property defaults to 0', async () => {
  const newBlog = {
    title: 'new blog',
    author: 'Baldwin Yu',
    url: 'http://localhost:3003/api/blogs'
  }

  const savedBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(savedBlog.body.likes).toBe(0)
})

test('missing title or url', async () => {
  const newBlog = {
    author: 'Baldwin Yu'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('delete successfully', async () => {
  const blogsAtStart = await helper.blogsInDb()
  
  await api
    .delete(`/api/blogs/${blogsAtStart[0].id}`)
    .expect(204)
})

test('updated successfully', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const newBlog = {
    ...blogsAtStart[0],
    likes: 10
  }

  const savedBlog = await api
    .put(`/api/blogs/${newBlog.id}`)
    .send(newBlog)
    .expect('Content-Type', /application\/json/)

  expect(savedBlog.body).toEqual(newBlog)
})

afterAll(() => {
  mongoose.connection.close()
})