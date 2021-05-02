import './Login.css'
import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { AuthContext } from '../App'
import { createMockUser } from '../utils/MockData.js'

function Login() {
  //const [username, setUsername] = useState('')
  const [emailUser, setEmail] = useState('')
  const [passwordUser, setPassword] = useState('')
  const { loggedInUser, setLoggedInUser } = React.useContext(AuthContext)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Actual login handling will go here; for now, we'll simply get a user
    // from our Mockaroo API. User id is hardcoded for now.
    axios.post(`http://localhost:4000/login`,{email: emailUser, password: passwordUser})
      .then((response) => {
        console.log(response)
        setLoggedInUser(response.data)
        setIsLoggedIn(true)
      })
      .catch((err) => {
        // This case is likely to be due to Mockaroo rate limiting!
        // It'd be good to add some error handling here later, if someone tries to
        // access a non-existent user
        console.log('Error: could not make the request.')
        console.log(err)
        const mockUser = createMockUser(1)
        setLoggedInUser(mockUser)
        setIsLoggedIn(true)
      })
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
            <label>Email</label>
            <br />
            <input
              autoFocus={true}
              type="email"
              name="email"
              value={emailUser}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <label>Password</label>
            <br />
            <input
              type="password"
              name="password"
              value={passwordUser}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <br />
            <button id="login-button" type="submit">
              Login
            </button>
            <br />
            <p>
              Not registered?{' '}
              <Link to="/signup/" className="login-links">
                Create an account.
              </Link>
            </p>
          </div>
        </form>
      </div>
      <Footer />
    </>
  )
}
export default Login