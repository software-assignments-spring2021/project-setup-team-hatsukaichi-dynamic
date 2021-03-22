import './Login.css';
import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer'


function Login(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

function submit() {
    history.push('/profile/1')
}
    return (
        <>
	    <Header />  
	    <div id="login-container">
		<form id="login-form" onSubmit={(e) => { submit(); e.preventDefault(); }}>
		    <h2>Log In to TV Tracker</h2>
		    <div className="form-fields">
			<label>Username</label>
			<input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
			<label>Email</label>
			<input autoFocus={true} type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
			<label>Password</label>
			<input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
			<button id="login-button" type="submit">Login</button>
			<p className="message">Not registered? <Link to="/Signup">Create an account</Link></p>
		    </div>    
		</form>
		<Footer/> 
	    </div>
	</>	
    );
}

export default Login;
