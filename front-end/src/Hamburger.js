import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom'


const Hamburger = (props) => {
	return (
		<Menu {...props}>
			<Link to="/profile/1" id="Profile" className="menu-item">Profile</Link>
			<Link to="/my-shows/1" id="My Shows" className="menu-item">My Shows</Link>
		</Menu>
	);
}
export default Hamburger
