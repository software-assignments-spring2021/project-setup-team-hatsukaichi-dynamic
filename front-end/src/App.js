import './App.css';
import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './Home.js'
import TermsOfService from './TermsOfService';
import MeetTheTeam from './MeetTheTeam';
import ScrollToTop from './ScrollToTop';

function App() {
    return (
	<div className="App">
	    <Router>
		<ScrollToTop />
		<Switch>
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
