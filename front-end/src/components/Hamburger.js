import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom'

const Hamburger = (props) => {
  return (
    <Menu {...props}>
      <Link to="/profile/17" id="Profile" className="menu-item">
        Profile
      </Link>
      <Link to="/my-shows/17" id="My Shows" className="menu-item">
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
