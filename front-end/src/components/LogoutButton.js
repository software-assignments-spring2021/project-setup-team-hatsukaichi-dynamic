import React from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../App.js'
import './LogoutButton.css'

function LogoutButton() {
  const { setLoggedInUser } = React.useContext(AuthContext)
  const history = useHistory()

  const handleClick = (e) => {
    e.preventDefault()
    setLoggedInUser(null)
    history.push('/')
  }

  return (
    <button onClick={handleClick} className="logoutButton">
      {' '}
      Logout{' '}
    </button>
  )
}

export default LogoutButton
