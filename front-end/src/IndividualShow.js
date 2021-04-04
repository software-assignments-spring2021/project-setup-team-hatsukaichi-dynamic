import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import './IndividualShow.css'
import axios from 'axios'
import { mockShowAPI, mockShowImage } from './MockData'
import { Link } from 'react-router-dom'
import { platforms, statuses } from './DropdownOptions'
import Select from 'react-select'
import { AuthContext } from './App'
require('dotenv').config()

const ProgressData = ({
  initialSeason,
  initialEpisode,
  updateSeasons,
  updateEpisodes
}) => {
  const [season, setSeason] = useState(0)
  const [episode, setEpisode] = useState(0)

  useEffect(() => {
    setSeason(initialSeason)
    setEpisode(initialEpisode)
  }, [initialSeason, initialEpisode])

  // handleSeasonChange and handleEpisodeChange updates both the current season state
  // (in ProgressData) and the season field in showProgress in IndividualShow (the parent)
  // component
  const handleSeasonChange = (season) => {
    setSeason(season)
    updateSeasons(season)
  }

  const handleEpisodeChange = (episode) => {
    setEpisode(episode)
    updateEpisodes(episode)
  }

  return (
    <div type="hidden">
      <fieldset id="progress-group">
        <label className="label-custom" htmlFor="season">
          Current Season
        </label>
        <input
          id="season"
          className="progress"
          value={season}
          type="number"
          onChange={(e) => handleSeasonChange(parseInt(e.target.value))}
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
          onChange={(e) => handleEpisodeChange(parseInt(e.target.value))}
        />
        <br />
      </fieldset>
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
    episodes: 0
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

  // TODO: do a check for NaN here
  const updateSeasons = (seasons) => {
    const updatedShow = showProgress
    updatedShow.seasons = seasons
    setShowProgress(updatedShow)
  }

  const updateEpisodes = (episodes) => {
    const updatedShow = showProgress
    updatedShow.episodes = episodes
    setShowProgress(updatedShow)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // only go through with the PATCH request if there is a user logged in
    // and if the show is already in their list
    // TODO: Eventually move this into its own handleSubmit function to be done later
    if (loggedInUser) {
      let updated = false
      const updatedShows = loggedInUser.shows.map((show) => {
        // parseInt is needed because id is stored as a String while show.id is a Number
        if (show.id === parseInt(id)) {
          updated = true
          return showProgress
        }
        return show
      })
      const patchUser = loggedInUser

      if (updated) {
        patchUser.shows = updatedShows
      } else {
        patchUser.shows.push(showProgress)
      }
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
    } else {
      console.log(
        'Oh no! There is no logged in user. Add some sort of notification here.'
      )
    }
  }

  // textToValue transforms a text value to a value/label format to pre-populate
  // the Select component that calls the function. It currently supports both
  // platform dropdowns and status dropdowns
  const textToValue = (text, type) => {
    let array = []
    switch (type) {
      case 'platform':
        array = platforms
        break
      case 'status':
        array = statuses
        break
      default:
        break
    }
    const match = array.filter((p) => p.value === text)
    if (match.length === 0) {
      return {
        value: '',
        label: `Select a ${type.charAt(0).toUpperCase() + type.slice(1)}`
      }
    } else {
      return match[0]
    }
  }

  const handleDropdownChange = (newValue, type) => {
    const updatedShow = showProgress
    if (type === 'platform') {
      updatedShow.platform = newValue.value
    } else if (type === 'status') {
      updatedShow.completed = newValue.value === 'Watched'
    }
    setShowProgress(updatedShow)
  }

  return (
    <>
      <Header />
      <div className="main-container">
        <div className="show-content">
          <fieldset className="main">
            <div className="show-details">
              <form id="show-form" onSubmit={handleSubmit}>
                <h3 id="title">{show.name}</h3>
                <Link to="/my-shows/1">
                  <button className="btn-progress">Return to My Shows</button>
                </Link>
                <Select
                  className="status-select"
                  defaultValue={textToValue(showProgress.completed, 'status')}
                  options={statuses}
                  onChange={(value) => handleDropdownChange(value, 'status')}
                />
                {show.isMovie ? null : (
                  <ProgressData
                    initialSeason={showProgress.seasons}
                    initialEpisode={showProgress.episodes}
                    updateSeasons={updateSeasons}
                    updateEpisodes={updateEpisodes}
                  />
                )}
                <Select
                  className="platform-select"
                  defaultValue={textToValue(showProgress.platform, 'platform')}
                  options={platforms}
                  onChange={(value) => handleDropdownChange(value, 'platform')}
                />
                <div className="show-content">
                  <Description
                    genres={show.genres}
                    description={show.description}
                    totalEpisodes={show.episodes}
                    isMovie={show.isMovie}
                  />
                </div>
                <input
                  className="btn-progress"
                  id="btn-progress"
                  type="submit"
                  value="Save"
                />
              </form>
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
