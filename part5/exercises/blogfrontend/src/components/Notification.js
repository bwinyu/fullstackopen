const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  let style = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }
  if(type === 'error') {
    style.color = 'red'
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification