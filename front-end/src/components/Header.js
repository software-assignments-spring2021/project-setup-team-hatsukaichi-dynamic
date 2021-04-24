import React from 'react'
import 'react-sticky-header/styles.css'
import StickyHeader from 'react-sticky-header'
import './Header.css'
import Hamburger from './Hamburger'
import logo from '../images/logo.png'
import HeaderLogo from './HeaderLogo'
import SignupButton from './SignupButton'
import LoginButton from './LoginButton'
import { AuthContext } from '../App'
import LogoutButton from './LogoutButton'

const Header = () => {
  const { loggedInUser } = React.useContext(AuthContext)
  return (
    <StickyHeader
      header={
        <div className="header-root">
          <Hamburger
            pageWrapId={'page-wrap'}
            outerContainerId={'outer-container'}
          />
          <HeaderLogo src={logo} className="logo-img" />
          <div className="login-signup-buttons">
            {loggedInUser ? (
              <LogoutButton />
            ) : (
              <>
                <LoginButton />
                <SignupButton />
              </>
            )}
          </div>
        </div>
      }></StickyHeader>
  )
}

export default Header
