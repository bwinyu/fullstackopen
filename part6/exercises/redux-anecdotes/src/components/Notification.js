import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return props.notification === null ? '' : (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)


// import { useSelector } from 'react-redux'

// const Notification = () => {
//   const notification = useSelector(state => state.notification)
//   const style = {
//     border: 'solid',
//     padding: 10,
//     borderWidth: 1
//   }
//   return notification === null ? '' : (
//     <div style={style}>
//       {notification}
//     </div>
//   )
// }

// export default Notification