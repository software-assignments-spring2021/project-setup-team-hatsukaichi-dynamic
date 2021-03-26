import './Login.css'
import React, { useState } from "react"
import { Link, Redirect, useHistory } from 'react-router-dom'
import axios from 'axios'
import Header from './Header'
import Footer from './Footer'
import { AuthContext } from './App'
import { createMockUser } from './MockData.js'


function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loggedInUser, setLoggedInUser } = React.useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault()
    // Actual login handling will go here; for now, we'll simply get a user
    // from our Mockaroo API. User id is hardcoded for now.
    axios(`https://my.api.mockaroo.com/tv_users/1.json?key=${process.env.REACT_APP_MOCKAROO_KEY}`)
      .then((response) => {
        setLoggedInUser(response.data);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        // This case is likely to be due to Mockaroo rate limiting!
        // It'd be good to add some error handling here later, if someone tries to 
        // access a non-existent user
        console.log("We likely reached Mockaroo's request limit, or you did not insert your API key in .env.");
        console.log(err);
        const mockUser = createMockUser(1);
        setLoggedInUser(mockUser);
        setIsLoggedIn(true);
      });
  }

  if (isLoggedIn) {
    return <Redirect to={`/profile/${loggedInUser.id}`} />
  }

  return (
    <>
      <Header />
      <div id="login-container">
        <form id="login-form" onSubmit={handleSubmit}>
          <h2>Log in to TV Tracker</h2>
          <div className="form-fields">
            <label>Username</label>
            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <label>Email</label>
            <input autoFocus={true} type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label>Password</label>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button id="login-button" type="submit">Login</button>
            <p>Not registered? <Link to="/signup/" className="login-links">Create an account.</Link></p>
          </div>
        </form>
        <Footer />
      </div>
    </>
  );
}

export default Login;
