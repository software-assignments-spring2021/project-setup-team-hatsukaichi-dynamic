import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import './IndividualShow.css'
import axios from 'axios'
import { mockShowAPI, mockShowImage } from './MockData'
import { Link } from 'react-router-dom'
import platforms from './Platforms'
import Select from 'react-select'
import { AuthContext } from './App'
require('dotenv').config()

/*the component stores user's watched episode progress 
by allowing to save the show's latest season and episode watched*/
const ProgressData = ({ initialSeason, initialEpisode }) => {
  const [season, setSeason] = useState('')
  const [episode, setEpisode] = useState('')

  useEffect(() => {
    setSeason(initialSeason)
    setEpisode(initialEpisode)
  }, [initialSeason, initialEpisode])

  const updateProgress = (e) => {
    e.preventDefault()
    console.log('update to season ' + season + ' episode ' + episode)
  }

  return (
    <div type="hidden">
      <form id="progress-form" onSubmit={updateProgress}>
        <label className="label-custom" htmlFor="season">
          Current Season
        </label>
        <input
          id="season"
          className="progress"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
        />
        <br />
        <label className="label-custom" htmlFor="episode">
          Current Episode
        </label>
        <input
          id="episode"
          className="progress"
          value={episode}
          onChange={(e) => setEpisode(e.target.value)}
        />
        <br />
        <input
          className="btn-progress"
          id="btn-progress"
          type="submit"
          value="Save"
        />
      </form>
    </div>
  )
}

const Description = ({ genres, description, totalEpisodes, isMovie }) => {
  return (
    <div className="description">
      <span>Genres</span>
      <p className="descript">{genres ? genres.replaceAll('|', ', ') : null}</p>
      <span>Description</span>
      <p className="descript">{description}</p>
      {!isMovie ? (
        <>
          <span>Total Episodes</span>
          <p className="descript">{totalEpisodes}</p>
        </>
      ) : (
        <p className="descript">This entry is a movie</p>
      )}
    </div>
  )
}

const IndividualShow = ({ id }) => {
  const [show, setShow] = useState({})
  const notLoggedShow = {
    seasons: '0',
    episodes: '0',
    platform: ''
  }
  const [showProgress, setShowProgress] = useState(notLoggedShow)
  const { loggedInUser } = React.useContext(AuthContext)
  // fetch the show from the user information
  useEffect(() => {
    // Fetch user-related show information for the logged in user
    if (loggedInUser) {
      const userShowInfo = loggedInUser.shows.filter((show) => {
        return show.id === parseInt(id)
      })
      if (userShowInfo.length !== 0) {
        setShowProgress(userShowInfo[0])
      }
    }
    // Fetch show meta-information from the API
    axios
      .get(
        `https://my.api.mockaroo.com/shows/${id}.json?key=${process.env.REACT_APP_MOCKAROO_KEY}`
      )
      .then((response) => {
        setShow(response.data)
      })
      .catch((err) => {
        console.log(
          "We likely reached Mockaroo's request limit, or you did not insert your API key in .env."
        )
        console.log(err)
        setShow(mockShowAPI[id])
      })
  }, [id, loggedInUser])

  return (
    <>
      <Header />
      <div className="main-container">
        <div className="show-content">
          <fieldset className="main">
            <div className="show-details">
              <fieldset>
                <h3 id="title">{show.name}</h3>
                <Link to="/my-shows/1">
                  <button className="btn-progress">Return to Shows</button>
                </Link>
                <Link to="/my-shows/1">
                  <button className="btn-progress">
                    Add to In Progress Shows
                  </button>
                </Link>
                <Link to="/my-shows/1">
                  <button className="btn-progress">Add to Watched Shows</button>
                </Link>
                {show.isMovie ? null : (
                  <ProgressData
                    initialSeason={showProgress.seasons}
                    initialEpisode={showProgress.episodes}
                  />
                )}
                <Select className="platform-select" options={platforms} />
                <div className="show-content">
                  <Description
                    genres={show.genres}
                    description={show.description}
                    totalEpisodes={show.episodes}
                    isMovie={show.isMovie}
                  />
                </div>
              </fieldset>
            </div>
            <div id="cover">
              <p className="label-custom">{show.name}</p>
              <br />
              <img src={mockShowImage(show.id)} alt={`cover-${show.id}`} />
            </div>
            <div id="clear"></div>
          </fieldset>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default IndividualShow
