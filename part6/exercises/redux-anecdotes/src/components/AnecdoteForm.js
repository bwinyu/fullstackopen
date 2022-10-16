import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const handleCreateAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    props.createAnecdote(content)
    props.setNotification('Added new anecdote', 10)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateAnecdote}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default connect(null, { createAnecdote, setNotification })(AnecdoteForm)


// import { useDispatch } from 'react-redux'
// import { createAnecdote } from '../reducers/anecdoteReducer'
// import { setNotification } from '../reducers/notificationReducer'

// const AnecdoteForm = () => {
//   const dispatch = useDispatch()

//   const handleCreateAnecdote = async (e) => {
//     e.preventDefault()
//     const content = e.target.anecdote.value
//     e.target.anecdote.value = ''
//     dispatch(createAnecdote(content))
//     dispatch(setNotification('Added new anecdote', 10))
//   }

//   return (
//     <div>
//       <h2>create new</h2>
//       <form onSubmit={handleCreateAnecdote}>
//         <div><input name="anecdote" /></div>
//         <button>create</button>
//       </form>
//     </div>
//   )
// }

// export default AnecdoteForm