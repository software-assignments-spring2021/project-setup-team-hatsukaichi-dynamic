import './App.css'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home.js'
import TermsOfService from './pages/TermsOfService'
import MeetTheTeam from './pages/MeetTheTeam'
import ScrollToTop from './utils/ScrollToTop'
import Profile from './pages/Profile'
import MyShows from './pages/MyShows'
import IndividualShow from './pages/IndividualShow'
import Modal from 'react-modal'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AllShows from './pages/AllShows'
import ViewUsers from './pages/ViewUsers'

require('dotenv').config()

Modal.setAppElement('#root') //Necessary for settings modal

const ProfileWrapper = ({ match }) => {
  return <Profile id={match.params.id} />
}

const MyShowsWrapper = ({ match }) => {
  return <MyShows id={match.params.id} />
}

const IndividualMediaWrapper = ({ match }) => {
  const type = match.path.startsWith('/shows') ? 'show' : 'movie'
  return <IndividualShow id={match.params.id} type={type} />
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
            <Route path="/shows/:id" component={IndividualMediaWrapper} />
            <Route path="/movies/:id" component={IndividualMediaWrapper} />
            {/* TODO: Add a way to view a list of all shows, much like my-shows but for non logged in users */}
            <Route path="/my-shows/:id" component={MyShowsWrapper} />
            <Route path="/profile/:id" component={ProfileWrapper} />
            <Route path="/all-shows">
              <AllShows />
            </Route>
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
            <Route path="/view-users">
              <ViewUsers />
            </Route>
            <Route path="/">
              {loggedInUser !== null ? (
                <Profile id={loggedInUser.id} />
              ) : (
                <Home />
              )}
            </Route>
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  )
}

export default App
