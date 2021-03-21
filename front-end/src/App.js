import './App.css';
import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './Home.js'
import TermsOfService from './TermsOfService';
import MeetTheTeam from './MeetTheTeam';
import ScrollToTop from './ScrollToTop';
import Profile from './Profile';
import MyShows from './MyShows';
import IndividualShow from './IndividualShow';
import InProgressWatched from './InProgressWatched';
import Modal from "react-modal";

/*
const IndividualShowWrapper = ({match}) => {
  return (
    <IndividualShow id={match.params.id} show_id={match.params.id.show_id}  />
  )
}

const InProgressWatchedWrapper = ({match}) => {
  return (
    <InProgressWatched id={match.params.id} show_id={match.params.id.show_id} />
  )
}
*/

/*
<Route path="/my_shows/:id/:show_id" component={IndividualShowWrapper}/>
<Route path="/my_shows/:id/watched" component={IndividualShowWrapper}/>
*/
Modal.setAppElement("#root");

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
          <Route path="/sample_show" >
          <IndividualShow />
            </Route>
            <Route path="/in-progress-watched" >
          <InProgressWatched />
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
