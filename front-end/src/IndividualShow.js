import React, { useEffect, useState, useRef } from 'react'
import Header from './Header'
import Footer from './Footer'
import './IndividualShow.css'
import axios from 'axios'
import { mockShowAPI, mockShowImage } from './MockData'
import { Link } from 'react-router-dom'
require('dotenv').config()

/*the component stores user's watched episode progress 
by allowing to save the show's latest season and episode watched*/
const ProgressData = ({ season, episode, isMovieSet }) => {
  const refSeason = useRef()
  const refEpisode = useRef()
  const saveProgressData = () => {
    let progress = []
    let seasonS = React.findDOMNode(this.refs.season).value
    let episodeS = React.findDOMNode(this.refs.episode).value
    progress.push(seasonS)
    progress.push(episodeS)
  } //return null if the show is a movie since a movie does not have seasons or episodes
  if (isMovieSet === true) {
    return null
  } else {
    return (
      <div type="hidden">
        <form onSubmit={(e) => saveProgressData()}>
          <label className="label-custom" htmlFor="season">
            Current Season:{' '}
          </label>
          <input
            id="season"
            className="progress"
            defaultValue={season}
            ref={refSeason}
          />
          <br />
          <label className="label-custom" htmlFor="episode">
            Current Episode:
          </label>
          <input
            id="episode"
            className="progress"
            defaultValue={episode}
            ref={refEpisode}
          />
          <br />
          <input
            className="btn-progress"
            id="btn-progress"
            type="submit"
            value="Save Progress"
          />
        </form>
      </div>
    )
  }
}

const PlatformData = () => {
  const refNetflix = useRef()
  const refPrime = useRef()
  const refHulu = useRef()
  const refCrunchy = useRef()
  const refDisney = useRef()
  const refHBO = useRef()
  const refOther = useRef()
  const savePlatform = () => {}
  return (
    <div>
      <p className="label-custom">Select the platform: </p>
      <form onSubmit={(e) => savePlatform()}>
        <input
          className="platform"
          type="checkbox"
          id="netflix"
          value="Netflix"
          ref={refNetflix}
        />
        <label className="label-platform" htmlFor="netflix">
          Netflix{' '}
        </label>
        <input
          className="platform"
          type="checkbox"
          id="prime"
          value="Prime"
          ref={refPrime}
        />
        <label className="label-platform" htmlFor="prime">
          Amazon Prime{' '}
        </label>
        <input
          className="platform"
          type="checkbox"
          id="hulu"
          value="Hulu"
          ref={refHulu}
        />
        <label className="label-platform" htmlFor="hulu">
          Hulu{' '}
        </label>
        <input
          className="platform"
          type="checkbox"
          id="crunch"
          value="Crunchyroll"
          ref={refCrunchy}
        />
        <label className="label-platform" htmlFor="crunch">
          Crunchyroll{' '}
        </label>
        <br />
        <input
          className="platform"
          type="checkbox"
          id="disney"
          value="Disney Plus"
          ref={refDisney}
        />
        <label className="label-platform" htmlFor="crunch">
          Disney Plus{' '}
        </label>
        <input
          className="platform"
          type="checkbox"
          id="hbo"
          value="HBO"
          ref={refHBO}
        />
        <label className="label-platform" htmlFor="hbo">
          HBO{' '}
        </label>
        <input
          className="platform"
          type="checkbox"
          id="other"
          value="Other"
          ref={refOther}
        />
        <label className="label-platform" htmlFor="other">
          Other{' '}
        </label>
        <br />
        <br />
        <input className="btn-progress" type="submit" value="Save Platform" />
      </form>
    </div>
  )
}

const Description = ({ genre, description, totalEpisodes, isMovieN }) => {
  const refDescription = useRef()
  const refGenre = useRef()
  const refTotalEpisodes = useRef()

  return (
    <div className="description">
      <br />
      <label className="descript" htmlFor="genre">
        Genre:{' '}
      </label>
      <span className="descript" ref={refGenre}>
        {genre}
      </span>{' '}
      <br />
      <label className="descript" htmlFor="description">
        Description:{' '}
      </label>
      <span className="descript" value={description} ref={refDescription}>
        {description}{' '}
      </span>
      {!isMovieN ? (
        <>
          <br />
          <label className="descript" htmlFor="totalEpisodes">
            Total Episodes:{' '}
          </label>
          <span className="descript" ref={refTotalEpisodes}>
            {totalEpisodes}.
          </span>
        </>
      ) : null}
    </div>
  )
}

/*the component calls other components and displays comprehensive info about the show; 
values passed as parameters to the main components are generated by the mock data API */

const IndividualShow = (props) => {
  const refTitle = useRef()
  const refCover = useRef()
  let [show, setShow] = useState({})

  useEffect(() => {
    //let showInfo = [];
    axios
      .get(
        `https://my.api.mockaroo.com/shows/${props.id}.json?key=${process.env.REACT_APP_MOCKAROO_KEY}`
      )
      .then((response) => {
        setShow(response.data)
      })
      .catch((err) => {
        console.log(
          "We likely reached Mockaroo's request limit, or you did not insert your API key in .env."
        )
        console.log(err)
        setShow(mockShowAPI[props.id])
      })
  }, [props.id])

  return (
    <>
      <Header />
      <div className="main-container">
        <div className="show-content">
          <fieldset className="main">
            <div className="show-details">
              <fieldset>
                <h3 id="title" value={show.name} ref={refTitle}>
                  {show.name}
                </h3>
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
                <div id="clear"></div>
                <ProgressData
                  season="2"
                  episode="5"
                  isMovieSet={show.isMovie}
                />
                <PlatformData />
                <div className="show-content">
                  <Description
                    genre={show.genres}
                    description={show.description}
                    totalEpisodes={show.episodes}
                    isMovieN={show.isMovie}
                  />
                </div>
              </fieldset>
            </div>
            <div id="cover">
              <p className="label-custom">{show.name}</p>
              <br />
              <img
                src={mockShowImage(show.id)}
                alt={`cover-${show.id}`}
                ref={refCover}
              ></img>
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
