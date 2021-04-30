import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import profile from '../images/profile.gif'
import myShows from '../images/shows.gif'
import searchShows from '../images/shows-search.gif'
import './Home.css'

function Home() {
  return (
    <>
      <Header />
      <div className="home">
        <h2 className="header-text">Welcome to TV Tracker app! </h2>
        <div className="block">
          <p className="full-text">
            <br />
            <br />
            In today's world, there are more streaming services and platforms
            than we can count. Many people bite off more than they can chew and
            try to watch multiple shows spread accross multiple platforms and
            genres. It can be pretty tricky to keep mental track of your
            progress on each show individually, that's where we come in. TV
            Tracker is an online hub to keep note of the shows you watch or have
            watched, your progress within those shows, the streaming platforms
            that carry the shows, and much more.
          </p>
        </div>
        <br /> <br />
        <div className="block">
          <h4 className="gif-text">Register and access Your Profile page: </h4>
          <p className="full-text">
            After registering an account on TV Tracker App, you can access your
            personal Profile page!{' '}
          </p>
          <p className="full-text"> On the profile page, you can: </p>
          <p className="full-text"> 1. Access Most Recently Watched shows </p>
          <p className="full-text">
            2. Click on Individual show and modify watching progress of the show{' '}
          </p>
          <p className="full-text">3. Access My Shows page </p>
          <p className="full-text">4. Access Profile Settings </p>
          <img src={profile} alt="profile gif" className="gif-img" />
          <br />
        </div>
        <br /> <br />
        <div className="block">
          <h4 className="gif-text">Access Shows page: </h4>
          <p className="full-text">
            After registering an account on TV Tracker App, you can access your
            personal Shows page!{' '}
          </p>
          <p className="full-text"> On the Shows page, you can: </p>
          <p className="full-text">
            {' '}
            1. Access all shows linked to your profile
          </p>
          <p className="full-text">
            2. Click on Individual show and modify watching progress of the show{' '}
          </p>
          <p className="full-text">
            3. Filter shows based on your progress (Completed, In Progress){' '}
          </p>
          <p className="full-text">
            4. Filter shows based on the platform (Netflix, HBO etc. ){' '}
          </p>
          <img src={myShows} alt="shows gif" className="gif-img" />
          <br />
        </div>
        <br /> <br />
        <div className="block">
          <h4 className="gif-text">Find and save your favorite shows: </h4>
          <p className="full-text">
            On the Shows page, you can search for new shows and add them to your
            list{' '}
          </p>
          <p className="full-text">
            Search for a show, modify your watching progress and save it
          </p>
          <img src={searchShows} alt="search shows gif" className="gif-img" />
          <br />
        </div>
        <br />
      </div>
      <Footer />
    </>
  )
}

export default Home
