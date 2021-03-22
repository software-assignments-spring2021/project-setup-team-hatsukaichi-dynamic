import React from 'react'
import { Link } from 'react-router-dom'
import './LoginButton.css'


function LoginButton() {
  return (
	<Link to={'/Login'}>
  		<button className="loginButton"> Login </button>
  	</Link>
  );
}

export default LoginButton;
