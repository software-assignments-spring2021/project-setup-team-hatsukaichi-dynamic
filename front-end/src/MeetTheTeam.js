import React from 'react'
import Footer from './Footer'
import Header from './Header'
import './MeetTheTeam.css'
//import image from './Images/stock-user.png'
import image from './Images/stock-user-white.png'
import HeaderLogo from './HeaderLogo'

function MeetTheTeam() {
	return (
		<>
			<body>
				<Header />

				<div className="header">
					<h1>Meet the Team</h1>
				</div>
				<div class="content">
					<img src={image} alt=""></img>
					<h4>Sam Eng</h4>
					<p>Student at New York University</p>
					<a href="https://github.com/sam-eng">GitHub</a>
				</div>
				<div class="content">
					<img src={image} alt=""></img>
					<h4>Lev Bernstein</h4>
					<p>Student at New York University</p>
					<a href="https://github.com/LevBernstein">GitHub</a>
				</div>
				<div class="content">
					<img src={image} alt=""></img>
					<h4>Mason Kalaty</h4>
					<p>Student at New York University</p>
					<a href="https://github.com/Gkal2000">GitHub</a>
				</div>
				<div class="content">
					<img src={image} alt=""></img>
					<h4>Ben Kaplan</h4>
					<p>Student at New York University</p>
					<a href="https://github.com/benrkaplan">GitHub</a>
				</div>
				<div class="content">
					<img src={image} alt=""></img>
					<h4>Nicole Stovall</h4>
					<p>Student at New York University</p>
					<a href="https://github.com/stovalln21">GitHub</a>
				</div>
				<div class="content">
					<img src={image} alt=""></img>
					<h4>Almazhan Kapan</h4>
					<p>Student at New York University</p>
					<a href="https://github.com/almazhankapan">GitHub</a>
				</div>
				<Footer />
			</body>
		</>
	);
}

export default MeetTheTeam;
