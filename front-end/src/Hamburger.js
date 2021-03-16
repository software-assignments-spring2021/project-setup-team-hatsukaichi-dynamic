import React from 'react'
import { slide as Menu } from 'react-burger-menu'

const Hamburger = (props) => {
    return (
	<Menu {...props}>
	    <a id="home" className="menu-item" href="/">Home</a>
	    <a id="meet-the-team" className="menu-item" href="/meet-the-team">Meet the Team</a>
	    <a id="terms-of-service" className="menu-item" href="/terms-of-service">Terms of Service</a>
	</Menu>
    );
}
export default Hamburger
