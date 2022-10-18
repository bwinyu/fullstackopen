import { AppBar, Toolbar, IconButton, Button, Grid } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'

import { logoutUser } from '../reducers/loginReducer'

import { Link } from 'react-router-dom'

const Menu = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.login)

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logoutUser())
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container>
          <Grid item>
            <IconButton edge="start" color="inherit" aria-label="menu" />
            <Button color="inherit" component={Link} to="/">
              Blogs
            </Button>
            <Button color="inherit" component={Link} to="/users">
              Users
            </Button>
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <em>{user.name} logged in </em>
            <Button color="inherit" onClick={handleLogout}>
              logout
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Menu
