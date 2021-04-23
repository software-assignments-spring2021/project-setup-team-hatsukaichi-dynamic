import React from 'react'
import 'react-sticky-header/styles.css'
import StickyHeader from 'react-sticky-header'
import '../css/Header.css'
import Hamburger from './Hamburger'
import logo from '../Images/logo.png'
import HeaderLogo from './HeaderLogo'
import SignupButton from '../auth/SignupButton'
import LoginButton from '../auth/LoginButton'
import { AuthContext } from '../App'
import LogoutButton from '../auth/LogoutButton'

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
