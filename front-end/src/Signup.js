import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './Signup.css';
import axios from "axios";
require('dotenv').config();

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    
    password !== passwordConfirm ? setPasswordMismatch(true) : setPasswordMismatch(false);

    // Mockaroo call goes here!
    const newUser = {
      'username': username,
      'email': email,
      'password': password,
    }

    axios.post('https://my.api.mockaroo.com/tv_users.json?key=${process.env.REACT_APP_MOCKAROO_KEY}&__method=POST', newUser)
      .then( (response) => {
        history.push(`/profile/${response.data.id}`);
      })
      .catch( (err) => {
        history.push('/profile/1')
      });
  }

  return (
    <>
      <Header />
      <div id="signup-container">
        <form id="signup-form" onSubmit={handleSubmit}>
          <h2>Sign up for TV Tracker</h2>
          <div className="form-fields">
            <label>Username</label>
            <input type="text" name="username" value={username} onChange={(e) => {setUsername(e.target.value)}} required/>
            <label>Email</label>
            <input type="text" name="email" value={email} onChange={(e) => {setEmail(e.target.value)}} required/>
            <label>Password</label>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            <label>Confirm Password</label>
            <input 
              type="password" 
              name="passwordconfirm" 
              value={passwordConfirm} 
              onChange={(e) => setPasswordConfirm(e.target.value)} 
              required
            />
            {passwordMismatch ? 
              <p className="error message">
                Could not create account--passwords did not match.
              </p>
              : null}
          </div>
          <button id="signup-button" type="submit">Sign Up</button>
          <p>Already have an account? <Link to="/login" className="signup-links">Log In.</Link></p>
        </form>
      </div>
      <Footer />
    </>
  );
}


export default Signup;
