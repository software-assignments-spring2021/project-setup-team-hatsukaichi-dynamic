import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import axios from 'axios'
import './Profile.css'
import Header from '../components/Header'
import { CopyToClipboard } from 'react-copy-to-clipboard'
// import { mockUserUpdate } from '../utils/MockData'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import { AuthContext } from '../App'
require('dotenv').config()

/* UserInfo displays username, user bio, and user profile picture */
const UserInfo = ({ username, bio, image }) => {
  return (
    <div id="heading">
      <img src={image} alt="profile" id="profile-picture" />
      <div id="profile-text">
        <h3 id="profile-title">{username}'s Profile</h3>
        <p id="bio">{bio}</p>
      </div>
    </div>
  )
}

/* RecentShows displays the up to four most recent shows for a user */
const RecentShows = ({ shows }) => {
  return (
    <>
      <h4 id="title-rec-shows">Recently Added Shows</h4>
      {shows ? (
        <div id="profile-show-container">
          {shows.map((show) => {
            return (
              <Link
                to={`/${show.type}s/${show.ids.trakt}`}
                key={show.ids.trakt + '-' + show.type}>
                <img
                  className="show-image"
                  src={show['poster-url']}
                  alt={`cover-${show.ids.trakt}-${show.type}`}
                />
              </Link>
            )
          })}
        </div>
      ) : (
        <p id="no-shows">No shows. Add some shows on the My Shows page!</p>
      )}
    </>
  )
}

/* SettingsForm displays the contents of the settings modal--a form for
 * updating user account information. */
const SettingsForm = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [bio, setBio] = useState('')
  const [pic, setPic] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const newData = {
      ...props.data,
      bio: bio,
      img: pic,
      email: email
    }
    axios
      .patch(
        `http://${process.env.REACT_APP_BASE_URL}:4000/tv_users/${props.data.id}`,
        newData
      )
      .then((response) => {
        console.log(response)
        props.updateUserData(response.data)
        props.toggleModal()
      })
      .catch((err) => {
        console.log('Error: could not make the request.')
        console.log(err)
       {/*} props.updateUserData(mockUserUpdate(props.data.id, newData))*/}
        props.toggleModal()
      })
  }

  useEffect(() => {
    setEmail(props.data.email)
    setBio(props.data.bio)
    setPic(props.data.img)
  }, [props.data.email, props.data.bio, props.data.img])

  return (
    <div className="modal-contents">
      <form id="settings-form" onSubmit={handleSubmit}>
        <div id="field-modal">
          <h1 id="settings-title">Settings</h1>
          <label className="label-profile">User Email:</label>
          <input
            className="inputs"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label className="label-profile">Password: </label>
          <input
            className="inputs"
            type="password"
            id="password"
            name="password"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <label className="label-profile">Biography:</label>
          <input
            className="inputs"
            type="text"
            id="bio"
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <br />
          <label className="label-profile">Profile Pic URL:</label>
          <input
            className="inputs"
            type="url"
            id="prof-pic"
            name="prof-pic"
            value={pic}
            onChange={(e) => setPic(e.target.value)}
          />
          <br />
          <div id="settings-btns" className="profile-links">
            <button className="prof-button" onClick={props.toggleModal}>
              Back
            </button>
            <button type="submit" className="prof-button" form="settings-form">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

const ProfileContents = ({ data, updateUserData }) => {
  const [userShows, setUserShows] = useState([])
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)
  const { loggedInUser } = React.useContext(AuthContext)

  const toggleModal = () => {
    setOpen(!open)
  }

  const onCopy = () => {
    setCopied(true)
  }

  // This helper function is necessary to get the Promise.all in useEffect to work
  // When moving this to Helpers it resulted in errors I couldn't fix...
  const makeAxiosCalls = (urls) => {
    return urls.map((url) => {
      return axios.get(url)
    })
  }

  useEffect(() => {
    let showIds = []
    const urls = []

    // This check is crucial--it sees whether userData (the props) has been loaded yet or not
    if (!data.shows) {
      setUserShows([])
    } else {
      if (data.shows.length > 4) {
        for (let i = data.shows.length - 4; i < data.shows.length; i++) {
          showIds.push(data.shows[i])
        }
      } else {
        showIds = data.shows
      }
      console.log(showIds)
      // Note: At the moment, we don't need any of the mocked data since we only really need the image here
      // but it's being mocked with picsum for now.
      showIds.map((show) => {
        if (show.isMovie) {
          urls.push(
            `http://${process.env.REACT_APP_BASE_URL}:4000/movies/${show.traktId}`
          )
        } else {
          urls.push(
            `http://${process.env.REACT_APP_BASE_URL}:4000/shows/${show.traktId}`
          )
        }
        return show.id
      })
      axios
        .all(makeAxiosCalls(urls))
        .then((showInfo) => {
          setUserShows(showInfo.map((info) => info.data))
        })
        .catch((err) => {
          console.log('Request could not be made...')
          console.log(err)
        })
    }
  }, [data.shows])

  return (
    <>
      <div className="show-content">
        <div className="main">
          <div className="show-profile-details">
            <UserInfo
              username={data.username}
              bio={data.bio}
              image={data.img}
            />
            <RecentShows shows={userShows} />
            <br />
            <br />
            <div className="profile-links">
              <div>
                <Link to={`/my-shows/${data.id}`}>
                  <button className="prof-button">My Shows</button>
                </Link>
              </div>
              {loggedInUser && loggedInUser.id === parseInt(data.id) ? (
                <div id="buttons">
                  <button className="prof-button" onClick={toggleModal}>
                    Settings
                  </button>
                  <Modal
                    isOpen={open}
                    onRequestClose={toggleModal}
                    contentLabel="Settings"
                    className="settings-modal"
                    overlayClassName="modal-open">
                    <SettingsForm
                      data={data}
                      updateUserData={updateUserData}
                      toggleModal={toggleModal}
                    />
                  </Modal>
                </div>
              ) : null}
              <CopyToClipboard text={window.location.href} onCopy={onCopy}>
                <div className="clipboard-button">
                  {/*CopyToClipboard must have exactly one child, hence why the button and copied text are wrapped in a div.*/}
                  <button className="prof-button">Share</button>
                  <br /> <br />
                  <p id="copied">{copied ? 'Copied URL to clipboard.' : ''}</p>
                </div>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

const Profile = (props) => {
  const [userData, setUserData] = useState([])

  const updateUser = (newData) => {
    setUserData(newData)
  }

  useEffect(() => {
    axios(`http://${process.env.REACT_APP_BASE_URL}:4000/tv_users/${props.id}`)
      .then((response) => {
        setUserData(response.data)
      })
      .catch((err) => {
        // This case is likely to be due to Mockaroo rate limiting!
        // It'd be good to add some error handling here later, if someone tries to
        // access a non-existent user
        console.log('Error: could not make the request.')
        console.log(err)
      })
  }, [props.id])

  return (
    <>
      <Header />
      {userData === null ? (
        <p>Oh no! Looks like this user wasn't found....</p>
      ) : (
        <ProfileContents data={userData} updateUserData={updateUser} />
      )}
    </>
  )
}

export default Profile
