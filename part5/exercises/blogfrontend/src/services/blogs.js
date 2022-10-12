import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newBlog => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async newBlog => {
  const response = await axios.put(`${baseUrl}/${newBlog.id}`, newBlog)
  return response.data
}

const remove = async id => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.status
}

export default { getAll, create, update, remove, setToken }