import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

import './Signup.css';

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("submit!");
  }

  return (
    <>
      <Header />
      <div id="signup-container">
        <form id="signup-form" onSubmit={handleSubmit}>
          <h2>Sign up for TV Tracker</h2>
          <div className="form-fields">
            <label>Username</label>
            <input type="text" name="username" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
            <label>Password</label>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <label>Confirm Password</label>
            <input type="password" name="passwordconfirm" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button id="signup-button" type="submit">Sign Up</button>
          <p className="message">Already have an account? <Link to="/login">Log In</Link></p>
        </form>
      </div>
      <Footer />

    </>
  );
}


export default Signup;