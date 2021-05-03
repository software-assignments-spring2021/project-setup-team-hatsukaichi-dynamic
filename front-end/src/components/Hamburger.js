import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom'
import { AuthContext } from '../App'

const Hamburger = (props) => {
  const { loggedInUser, setLoggedInUser } = React.useContext(AuthContext)
  return (
    <Menu {...props}>
      <Link to="/Home" id="home" className="menu-item">
        Home
      </Link>
      <Link
        to={loggedInUser == null ? `/login` : `/profile/${loggedInUser.id}`}
        id="Profile"
        className="menu-item">
        Profile
      </Link>
      <Link
        to={
          loggedInUser == null ? `/my-shows/17` : `/my-shows/${loggedInUser.id}`
        } //path my-shows/17 will be replaced with a new page
        id="My Shows"
        className="menu-item">
        My Shows
      </Link>
      <Link to="/meet-the-team" id="Meet-the-team" className="menu-item">
        Meet the Team
      </Link>
      <Link to="/terms-of-service" className="menu-item">
        Terms of Service
      </Link>
    </Menu>
  )
}
export default Hamburger
