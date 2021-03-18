import './App.css';
import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './Home.js'
import TermsOfService from './TermsOfService';
import MeetTheTeam from './MeetTheTeam';
import ScrollToTop from './ScrollToTop';
import Profile from './Profile';
import MyShows from './MyShows'

const ProfileWrapper = ({match}) => {
  return (
    <Profile id={match.params.id} />
  )
}

const MyShowsWrapper = ({match}) => {
  return (
    <MyShows id={match.params.id} />
  )
}

const App = (props) => {
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Switch>
          <Route path="/my-shows/:id" component={MyShowsWrapper} />
          <Route path="/profile/:id" component={ProfileWrapper} />
          <Route path="/terms-of-service">
            <TermsOfService />
          </Route>
          <Route path="/meet-the-team">
            <MeetTheTeam />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
