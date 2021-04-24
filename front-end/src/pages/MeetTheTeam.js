import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import './MeetTheTeam.css'
import image from '../images/stock-user-white.png'

function MeetTheTeam() {
  return (
    <>
      <body>
        <Header />
        <div className="header">
          <h1>Meet the Team</h1>
        </div>
        <div className="content">
          <img className="github-img" src={image} alt=""></img>
          <h4>Sam Eng</h4>
          <p>Student at New York University</p>
          <a href="https://github.com/sam-eng">GitHub</a>
          <p>Favorite color: Red. Interests: Drawing, Skiing, Music. </p>
          <p>Favorite Movie: Titanic</p>
        </div>
        <div className="content">
          <img className="github-img" src={image} alt=""></img>
          <h4>Lev Bernstein</h4>
          <p>Student at New York University</p>
          <a href="https://github.com/LevBernstein">GitHub</a>
          <p>Favorite color: Green. Interests: Piano, Travel, Music. </p>
          <p>Favorite Movie: Transformers</p>
        </div>
        <div className="content">
          <img className="github-img" src={image} alt=""></img>
          <h4>Mason Kalaty</h4>
          <p>Student at New York University</p>
          <a href="https://github.com/Gkal2000">GitHub</a>
          <p>Favorite color: Blue. Interests: Reading, Sightseeing, Guitar. </p>
          <p>Favorite Movie: Great Gatsby</p>
        </div>
        <div className="content">
          <img className="github-img" src={image} alt=""></img>
          <h4>Ben Kaplan</h4>
          <p>Student at New York University</p>
          <a href="https://github.com/benrkaplan">GitHub</a>
          <p>
            Favorite color: Grey. Interests: Travel, Computer games, Reading.
          </p>
          <p>Favorite Movie: Formula 1</p>
        </div>
        <div className="content">
          <img className="github-img" src={image} alt=""></img>
          <h4>Nicole Stovall</h4>
          <p>Student at New York University</p>
          <a href="https://github.com/stovalln21">GitHub</a>
          <p>Favorite color: Yellow. Interests: Hiking, Music, Piano. </p>
          <p>Favorite Movie: Supernatural</p>
        </div>
        <div className="content">
          <img className="github-img" src={image} alt=""></img>
          <h4>Almazhan Kapan</h4>
          <p>Student at New York University</p>
          <a href="https://github.com/almazhankapan">GitHub</a>
          <p>Favorite color: Pink. Interests: Youtube, Piano, Travel. </p>
          <p>Favorite Movie: Butterfly Effect</p>
        </div>
        <Footer />
      </body>
    </>
  )
}

export default MeetTheTeam
