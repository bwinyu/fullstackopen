/* OLD WAY FOR LEARNING PURPOSES */
import { connect } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

const Note = ({ note, handleClick }) => {
  return(
    <li onClick={handleClick}>
      {note.content} 
      <strong> {note.important ? 'important' : ''}</strong>
    </li>
  )
}

const Notes = (props) => {
  return(
    <ul>
      {props.notes.map(note =>
        <Note
          key={note.id}
          note={note}
          handleClick={() => 
            props.toggleImportanceOf({id: note.id})
          }
        />
      )}
    </ul>
  )
}

const mapStateToProps = (state) => {
  switch(state.filter) {
    case 'IMPORTANT':
      return {
        notes: state.notes.filter(note => note.important)
      }
    case 'NONIMPORTANT':
      return {
        notes: state.notes.filter(note => !note.important)
      }
    case 'ALL':
    default:
      return {
        notes: state.notes
      }
  }
}

const mapDispatchToProps = {
  toggleImportanceOf
}

const ConnectedNotes = connect(mapStateToProps, mapDispatchToProps)(Notes)
export default ConnectedNotes


/* THIS IS THE NEW WAY */
// import { useSelector, useDispatch } from 'react-redux'
// import { toggleImportanceOf } from '../reducers/noteReducer'

// const Note = ({ note, handleClick }) => {
//   return(
//     <li onClick={handleClick}>
//       {note.content} 
//       <strong> {note.important ? 'important' : ''}</strong>
//     </li>
//   )
// }

// const Notes = () => {
//   const dispatch = useDispatch()

//   const notes = useSelector(({filter, notes}) => {
//     switch(filter) {
//       case 'IMPORTANT':
//         return notes.filter(note => note.important)
//       case 'NONIMPORTANT':
//         return notes.filter(note => !note.important)
//       case 'ALL':
//       default:
//         return notes
//     }
//   })

//   return(
//     <ul>
//       {notes.map(note =>
//         <Note
//           key={note.id}
//           note={note}
//           handleClick={() => 
//             dispatch(toggleImportanceOf({id: note.id}))
//           }
//         />
//       )}
//     </ul>
//   )
// }

// export default Notes