import React from 'react'
import { slide as Menu } from 'react-burger-menu'

const Hamburger = (props) => {
    return (
	<Menu {...props}>
	    <a id="Profile" className="menu-item" href="/profile/1">Profile</a>
	    <a id="My Shows" className="menu-item" href="/my-shows/1">My Shows</a>
	</Menu>
    );
}
export default Hamburger
