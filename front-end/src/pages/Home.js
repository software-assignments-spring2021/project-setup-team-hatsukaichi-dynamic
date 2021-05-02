import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import intro from '../images/intro.gif'
import profile from '../images/profile.gif'
import myShows from '../images/shows.gif'
import searchShows from '../images/shows-search.gif'
import './Home.css'

function Home() {
  return (
    <>
      <Header />
      <div className="home">
        <h2 className="header-text">Welcome to TV Tracker! </h2>
        <div className="block">
          <p className="full-text">
            <br />
            <br />
            In the world of countless shows and streaming services, it can
            become very tedious to keep track of all the shows that you are
            watching or have watched, their corresponding platforms, seasons and
            episodes.{' '}
          </p>
          <p className="full-text">
            {' '}
            With
            <b> TV Tracker, </b> you can solve this problem with minimum time
            and effort spent and get much more!
            <br /> You can find and update the shows that you are currently
            watching or have already completed. You can also save and update the
            streaming platform, season and episode info for each show.
            <br />
            <br /> Moreover, you can share your shows with friends and see what
            shows and movies they are watching.
            <br />
            Our app is and always will be free! You only need an email address
            to register :)
          </p>
          <img src={intro} alt="intro gif" className="gif-img" />
          <br />
        </div>
        <br /> <br />
        <div className="block">
          <h4 className="gif-text">Register and access Your Profile page: </h4>
          <p className="full-text">
            After registering an account on TV Tracker App, you can access your
            personal Profile page!{' '}
          </p>
          <p className="full-text"> On the profile page, you can: </p>
          <p className="full-text"> 1. View Most Recently Added shows </p>
          <p className="full-text">
            2. Click on each individual show and update the watching progress
            for the show: <br /> - Whether you have already completed the show
            or still watching <br /> - What season and episode you are watching{' '}
            <br /> - Streaming service that you are watching the show on.{' '}
          </p>
          <p className="full-text">3. View your personal Shows page </p>
          <p className="full-text">4. View and edit your Profile Settings </p>
          <p className="full-text">
            5. Copy your profile link to the clipboard so that you can easily
            share it!{' '}
          </p>
          <img src={profile} alt="profile gif" className="gif-img" />
          <br />
        </div>
        <br /> <br />
        <div className="block">
          <h4 className="gif-text">View Shows page: </h4>
          <p className="full-text">
            After registering an account on TV Tracker App, you can access your
            personal Shows page!{' '}
          </p>
          <p className="full-text"> On the Shows page, you can: </p>
          <p className="full-text">
            {' '}
            1. View all shows linked to your account.
          </p>
          <p className="full-text">
            2. Click on each individual show and update the watching progress of
            the show{' '}
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
            For each individual show, you can update your watching progress and
            save it
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
