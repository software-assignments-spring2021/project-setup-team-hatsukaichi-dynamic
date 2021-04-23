import React from 'react'
import { Link } from 'react-router-dom'
import '../css/LoginButton.css'

function LoginButton() {
  return (
    <Link to="/login">
      <button className="loginButton"> Login </button>
    </Link>
  )
}

export default LoginButton
