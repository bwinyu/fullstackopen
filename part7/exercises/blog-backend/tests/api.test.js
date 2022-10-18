const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blogs')
const User = require('../models/users')

beforeEach(async () => {
  await User.deleteMany({})

  const saltRounds = 10
  const passwordHash = await bcrypt.hash('password', saltRounds)

  const newUser = new User({
    username: 'root',
    passwordHash: passwordHash,
  })

  const user = await newUser.save()

  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    const newBlog = {
      ...blog,
      user: user._id,
    }
    let blogObject = new Blog(newBlog)
    await blogObject.save()
  }
})

const getRootToken = async () => {
  const login = await api
    .post('/api/login')
    .send({ username: 'root', password: 'password' })
  return login.body.token
}

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
    likes: 5,
  }

  const token = await getRootToken()

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})

test('blog creation fails with no token', async () => {
  const newBlog = {
    title: 'new blog',
    author: 'Baldwin Yu',
    url: 'http://localhost:3003/api/blogs',
    likes: 5,
  }

  await api.post('/api/blogs').send(newBlog).expect(401)
})

test('no likes property defaults to 0', async () => {
  const newBlog = {
    title: 'new blog',
    author: 'Baldwin Yu',
    url: 'http://localhost:3003/api/blogs',
  }

  const token = await getRootToken()

  const savedBlog = await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(savedBlog.body.likes).toBe(0)
})

test('missing title or url', async () => {
  const newBlog = {
    author: 'Baldwin Yu',
  }

  const token = await getRootToken()

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(400)
})

test('delete successfully', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const token = await getRootToken()

  await api
    .delete(`/api/blogs/${blogsAtStart[0].id}`)
    .set('Authorization', `bearer ${token}`)
    .expect(204)
})

test('updated successfully', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const newBlog = {
    ...blogsAtStart[0],
    likes: 10,
  }

  const token = await getRootToken()

  const savedBlog = await api
    .put(`/api/blogs/${newBlog.id}`)
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect('Content-Type', /application\/json/)

  expect(savedBlog.body).toEqual(JSON.parse(JSON.stringify(newBlog)))
})

describe('user tests', () => {
  test('invalid users not created with suitable status code and error', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ba',
      password: 'ba',
    }

    await api.post('/api/users').send(newUser).expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
