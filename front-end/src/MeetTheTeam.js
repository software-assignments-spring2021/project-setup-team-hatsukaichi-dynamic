import React from 'react'
import Footer from './Footer'
import Hamburger from './Hamburger'
import './MeetTheTeam.css'
import image from './107-1076987_user-staff-man-profile-person-icon-circle-png.png'
import HeaderLogo from './HeaderLogo'

function MeetTheTeam() {
    return (
	<>
		<HeaderLogo/>
	    <Hamburger pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />  
	    <div className = "header">
		<h1>Meet the Team</h1>
	    </div>
	    <div class ="content">
		<img src={image} alt=""></img>
		<h4>Sam Eng</h4>
		<p>info here</p>
		<a href="https://github.com/sam-eng">GitHub</a>
	    </div>
	    <div class ="content">
		<img src={image} alt=""></img>
		<h4>Lev Bernstein</h4>
		<p>info here</p>
		<a href="https://github.com/LevBernstein">GitHub</a>
	    </div>
	    <div class ="content">
		<img src={image} alt=""></img>
		<h4>Mason Kalaty</h4>
		<p>info here</p>
		<a href="https://github.com/Gkal2000">GitHub</a>
	    </div>
	    <div class ="content">
		<img src={image} alt=""></img>
		<h4>Ben Kaplan</h4>
		<p>info here</p>
		<a href="https://github.com/benrkaplan">GitHub</a>
	    </div>
	    <div class ="content">
		<img src={image} alt=""></img>
		<h4>Nicole Stovall</h4>
		<p>info here</p>
		<a href="https://github.com/stovalln21">GitHub</a>
	    </div>
	    <div class ="content">
		<img src={image} alt=""></img>
		<h4>Almazhan Kapan</h4>
		<p>info here</p>
		<a href="https://github.com/almazhankapan">GitHub</a>
	    </div>
	    <Footer />
	</>
    );
}

export default MeetTheTeam;
