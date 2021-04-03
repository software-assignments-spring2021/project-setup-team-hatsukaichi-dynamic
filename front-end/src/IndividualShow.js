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

const ProgressData = ({ initialSeason, initialEpisode, updateProgress }) => {
  const [season, setSeason] = useState(0)
  const [episode, setEpisode] = useState(0)

  useEffect(() => {
    setSeason(initialSeason)
    setEpisode(initialEpisode)
  }, [initialSeason, initialEpisode])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('update to season ' + season + ' episode ' + episode)
    updateProgress(parseInt(season), parseInt(episode))
  }

  return (
    <div type="hidden">
      <form id="progress-form" onSubmit={handleSubmit}>
        <label className="label-custom" htmlFor="season">
          Current Season
        </label>
        <input
          id="season"
          className="progress"
          value={season}
          type="number"
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
          type="number"
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
    id: id,
    seasons: 0,
    episodes: 0,
    platform: ''
  }
  const [showProgress, setShowProgress] = useState(notLoggedShow)
  const { loggedInUser, setLoggedInUser } = React.useContext(AuthContext)
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

  const updateProgress = (seasons, episodes) => {
    const updatedShow = showProgress
    updatedShow.seasons = seasons
    updatedShow.episodes = episodes
    setShowProgress(updatedShow)
    // only go through with the PATCH request if there is a user logged in
    // and if the show is already in their list
    // TODO: Eventually move this into its own handleSubmit function to be done later
    if (loggedInUser) {
      let updated = false
      const updatedShows = loggedInUser.shows.map((show) => {
        // parseInt is needed because id is stored as a String while show.id is a Number
        if (show.id === parseInt(id)) {
          updated = true
          return updatedShow
        }
        return show
      })
      if (updated) {
        const patchUser = loggedInUser
        patchUser.shows = updatedShows
        axios
          .patch(
            `https://my.api.mockaroo.com/tv_users/${loggedInUser.id}.json?key=${process.env.REACT_APP_MOCKAROO_KEY}&__method=PATCH`,
            patchUser
          )
          .then((response) => {
            setLoggedInUser(response.data)
          })
          .catch((err) => {
            console.log(
              "We likely reached Mockaroo's request limit, or you did not insert your API key in .env."
            )
            console.log(err)
            setLoggedInUser(patchUser)
          })
      }
    }
  }

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
                  <button className="btn-progress">Return to My Shows</button>
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
                    updateProgress={updateProgress}
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
