import './css/App.css'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Home.js'
import TermsOfService from './TermsOfService'
import MeetTheTeam from './MeetTheTeam'
import ScrollToTop from './ScrollToTop'
import Profile from './Profile'
import MyShows from './MyShows'
import IndividualShow from './IndividualShow'
import Modal from 'react-modal'
import Login from './Login'
import Signup from './Signup'
require('dotenv').config()

Modal.setAppElement('#root') //Necessary for settings modal

const ProfileWrapper = ({ match }) => {
  return <Profile id={match.params.id} />
}

const MyShowsWrapper = ({ match }) => {
  return <MyShows id={match.params.id} />
}

const IndividualShowWrapper = ({ match }) => {
  return <IndividualShow id={match.params.id} />
}

export const AuthContext = React.createContext()

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null)

  const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
    setLoggedInUser(user)
  }

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user')
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser)
      setUser(foundUser)
    }
  }, [])

  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          loggedInUser,
          setLoggedInUser: setUser
        }}>
        <Router>
          <ScrollToTop />
          <Switch>
            <Route path="/show/:id" component={IndividualShowWrapper} />
            <Route path="/my-shows/:id" component={MyShowsWrapper} />
            <Route path="/profile/:id" component={ProfileWrapper} />
            <Route path="/terms-of-service">
              <TermsOfService />
            </Route>
            <Route path="/meet-the-team">
              <MeetTheTeam />
            </Route>
            <Route path="/Login">
              <Login />
            </Route>
            <Route path="/Signup">
              <Signup />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  )
}

export default App
