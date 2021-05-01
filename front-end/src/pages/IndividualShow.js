import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './IndividualShow.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { platforms, statuses, textToValue } from '../utils/Helpers'
import Select from 'react-select'
import { AuthContext } from '../App'
import { customStyles } from '../utils/DropdownStyles'
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

const Description = ({
  genres,
  description,
  totalEpisodes,
  isAiring,
  isMovie
}) => {
  const cleanGenres = (genres) => {
    return genres.reduce((prev, curr, idx) => {
      let cleaned = curr.replaceAll('-', ' ')
      const words = cleaned.split(' ')
      // This reduce capitalizes all words in a genre
      cleaned = words.reduce((prev, curr, idx) => {
        const capitalized = curr.charAt(0).toUpperCase() + curr.slice(1)
        if (idx === words.length - 1) {
          return prev + capitalized
        } else {
          return prev + capitalized + ' '
        }
      }, '')
      if (idx === genres.length - 1) {
        return prev + cleaned
      } else {
        return prev + cleaned + ', '
      }
    }, '')
  }
  return (
    <div className="description">
      <span>Genres</span>
      <p className="descript">{genres ? cleanGenres(genres) : null}</p>
      <span>Description</span>
      <p className="descript">{description}</p>
      {!isMovie ? (
        <>
          <span>Total Episodes{isAiring ? ' Aired So Far' : null}</span>
          <p className="descript">{totalEpisodes}</p>
        </>
      ) : (
        <br />
      )}
    </div>
  )
}

const IndividualShow = ({ id, type }) => {
  const [show, setShow] = useState({})
  const notLoggedShow = {
    isMovie: type === 'movie',
    traktId: parseInt(id),
    season: 0,
    episode: 0
  }
  const [showProgress, setShowProgress] = useState(notLoggedShow)
  const { loggedInUser, setLoggedInUser } = React.useContext(AuthContext)
  // fetch the show from the user information
  useEffect(() => {
    // Fetch user-related show information for the logged in user
    if (loggedInUser) {
      const userShowInfo = loggedInUser.shows.filter((show) => {
        return (
          show.traktId === parseInt(id) && show.isMovie === (type === 'movie')
        )
      })
      if (userShowInfo.length !== 0) {
        setShowProgress(userShowInfo[0])
      }
    }
    // Fetch show meta-information from the API
    axios
      .get(`http://localhost:4000/${type}s/${id}`)
      .then((response) => {
        setShow(response.data)
      })
      .catch((err) => {
        console.log('Error: could not make the request.')
        console.log(err)
      })
  }, [id, type, loggedInUser])

  // TODO: do a check for NaN here
  const updateSeasons = (seasons) => {
    const updatedShow = showProgress
    updatedShow.season = seasons
    setShowProgress(updatedShow)
  }

  const updateEpisodes = (episodes) => {
    const updatedShow = showProgress
    updatedShow.episode = episodes
    setShowProgress(updatedShow)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // only go through with the PATCH request if there is a user logged in
    // and if the show is already in their list
    if (loggedInUser) {
      let updated = false
      const updatedShows = loggedInUser.shows.map((show) => {
        // parseInt is needed because id is stored as a String while show.id is a Number
        if (
          show.traktId === parseInt(id) &&
          show.isMovie === (type === 'movie')
        ) {
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
        .patch(`http://localhost:4000/tv_users/${loggedInUser.id}`, patchUser)
        .then((response) => {
          setLoggedInUser(response.data)
        })
        .catch((err) => {
          console.log('Error: could not make the request.')
          console.log(err)
          setLoggedInUser(patchUser)
        })
    } else {
      console.log(
        'Oh no! There is no logged in user. Add some sort of notification here.'
      )
    }
  }

  const handleDropdownChange = (newValue, type) => {
    const updatedShow = showProgress
    if (type === 'platform') {
      updatedShow.platform = newValue.value
    } else if (type === 'status') {
      updatedShow.list = newValue.value
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
                <h3 id="title">{show.title}</h3>
                <Link to="/my-shows/1">
                  {/*TODO: Change this to link to logged in user's my-shows*/}
                  <button className="btn-progress">Return to My Shows</button>
                </Link>
                <Select
                  className="status-select"
                  defaultValue={textToValue(showProgress.list, 'status')}
                  options={statuses}
                  onChange={(value) => handleDropdownChange(value, 'status')}
                  styles={customStyles}
                />
                {show.type === 'movie' ? null : (
                  <ProgressData
                    initialSeason={showProgress.season}
                    initialEpisode={showProgress.episode}
                    updateSeasons={updateSeasons}
                    updateEpisodes={updateEpisodes}
                  />
                )}
                <Select
                  className="platform-select"
                  defaultValue={textToValue(showProgress.platform, 'platform')}
                  options={platforms}
                  onChange={(value) => handleDropdownChange(value, 'platform')}
                  styles={customStyles}
                />
                <div className="show-content">
                  <Description
                    genres={show.genres}
                    description={show.overview}
                    totalEpisodes={show['aired_episodes']}
                    isAiring={show.status !== 'ended'}
                    isMovie={show.type === 'movie'}
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
              <p className="label-custom">{show.title}</p>
              <br />
              <img src={show['poster-url']} alt={`cover-${show.title}`} />
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
