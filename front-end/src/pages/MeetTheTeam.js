import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import './MeetTheTeam.css'
import image from '../images/coder.png'

function MeetTheTeam() {
  return (
    <>
      <body>
        <Header />
        <div className="header">
          <h1 id="team-header">Meet the Team</h1>
        </div>
        <div className="content">
          <img className="github-img" src={image} alt=""></img>
          <h4>Sam Eng</h4>
          <a href="https://github.com/sam-eng">GitHub</a>
          <p>
            Hi, I'm Sam and I'm a Computer Science and Linguistics double major
            at NYU. I graduate in May 2021, and after school, I'll be working as
            a Software Engineer.
          </p>
        </div>
        <div className="content">
          <img className="github-img" src={image} alt=""></img>
          <h4>Lev Bernstein</h4>
          <a href="https://github.com/LevBernstein">GitHub</a>
          <p>
            I'm Lev Bernstein, a junior at NYU majoring in Computer Science and
            minoring in Russian and Classics. I graduate in May 2022, after
            which I hope to work in either software engineering or systems
            administration.
          </p>
        </div>
        <div className="content">
          <img className="github-img" src={image} alt=""></img>
          <h4>Mason Kalaty</h4>
          <a href="https://github.com/Gkal2000">GitHub</a>
          <p>
            I'm Mason, a Computer Science Major at NYU. I'm going to be
            graduating in May 2021, and then I'll be working as a Computer
            Programmer in NYC.
          </p>
        </div>
        <div className="content">
          <img className="github-img" src={image} alt=""></img>
          <h4>Ben Kaplan</h4>
          <a href="https://github.com/benrkaplan">GitHub</a>
          <p>
            Hey, I'm Ben and I'm studying Computer Science at NYU. I graduate in
            May 2021, and hope to continue in the field of software engineering.
          </p>
        </div>
        <div className="content">
          <img className="github-img" src={image} alt=""></img>
          <h4>Nicole Stovall</h4>
          <a href="https://github.com/stovalln21">GitHub</a>
          <p>
            Hi, I'm Nicole and I'm a Computer Science major and Anthropology
            minor at NYU. After my graduation in May 2022, I hope to work in
            software engineering.
          </p>
        </div>
        <div className="content">
          <img className="github-img" src={image} alt=""></img>
          <h4>Almazhan Kapan</h4>
          <a href="https://github.com/almazhankapan">GitHub</a>
          <p>
            Hi, I'm Alma and I'm a Computer Science major and Econ minor student
            at NYU. I graduate in December 2021 and hope to work in software
            engineering and research after graduation.
          </p>
        </div>
        <div className="content">
          <img className="github-img" src={image} alt="TV Tracker Logo"></img>
          <h4>Special thanks to: </h4>
          <h4>Sharkie</h4>
          <p>Friend of the project, creator of the TV Tracker app logo</p>
        </div>
        <Footer />
      </body>
    </>
  )
}

export default MeetTheTeam
