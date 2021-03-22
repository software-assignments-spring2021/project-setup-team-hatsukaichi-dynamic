import React from 'react'
import { Link } from 'react-router-dom'





function SignupButton() {
  return (
	<Link to={'/Signup'}>
  		<button> Signup </button>
  	</Link>
  );
}

export default SignupButton;
