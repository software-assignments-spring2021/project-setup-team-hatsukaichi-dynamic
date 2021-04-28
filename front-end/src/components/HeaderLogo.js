import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/newLogo.png'
import './HeaderLogo.css'

function HeaderLogo() {
  return (
    <>
      <Link to="/Home">
        <img id="logo" src={logo} alt="TV Tracker Logo" />{' '}
      </Link>
    </>
  )
}

export default HeaderLogo
