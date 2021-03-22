import React from 'react'
import { Link } from 'react-router-dom'



function LoginButton() {
  return (
	<Link to={'/Login'}>
  		<button> Login </button>
  	</Link>
  );
}

export default LoginButton;
