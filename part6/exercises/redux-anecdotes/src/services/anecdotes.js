import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async (content) => {
  const object = { content, votes: 0}
  const response = await axios.post(baseUrl, object)
  return response.data
}

const voteAnecdote = async (id) => {
  const anecdotes = await axios.get(baseUrl)
  const anecdote = anecdotes.data.find(a => a.id === id)
  const newAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1
  }
  const response = await axios.put(`${baseUrl}/${id}`, newAnecdote)
  return response.data
}

export default { getAll, createAnecdote, voteAnecdote }