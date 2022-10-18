import { useDispatch } from 'react-redux'

import { loginUser } from '../reducers/loginReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(
      loginUser(event.target.username.value, event.target.password.value)
    )
    event.target.username.value = ''
    event.target.password.value = ''
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text" name="username" />
        </div>
        <div>
          password
          <input type="password" name="password" />
        </div>
        <button id="loginSubmit" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
