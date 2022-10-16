import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    let sortedAnecdotes = [...state.anecdotes]
    sortedAnecdotes = sortedAnecdotes.filter(anecdote => anecdote.content.toLowerCase().indexOf(state.filter.toLowerCase()) >= 0)
    return sortedAnecdotes.sort((a, b) => a.votes > b.votes ? -1 : 1)
  })
  const dispatch = useDispatch()

  const handleVoteAnecdote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNotification(`You voted '${anecdote.content}'`, 10))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVoteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList