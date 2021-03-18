import React, { useEffect, useState } from 'react'
import Footer from './Footer';
import axios from 'axios';
import './Profile.css'
// Hamburger should eventually be replaced with a navigation bar component, when created
import Hamburger from './Hamburger';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { createMockUser, mockShowAPI, mockUserImage, mockShowImage } from './MockData'
import { Link } from 'react-router-dom'

// UserInfo displays all user-specific information for the profile
const UserInfo = ({ data }) => {
  const [userShows, setUserShows] = useState([]);

  useEffect(() => {
    let showIds = [];
    let promises = [];
    let showInfo = [];

    // This check is crucial--it sees whether userData (the props) has been loaded yet or not
    if (!data.shows) {
      setUserShows([]);
    }
    else {
      if (data.shows.length > 4) {
        for (let i = data.shows.length - 4; i < data.shows.length; i++) {
          showIds.push(data.shows[i]);
        }
      }
      else {
        showIds = data.shows;
      }
      // Note: At the moment, we don't need any of the mocked data since we only really need the image here
      // but it's being mocked with picsum for now.
      showIds.map((show) => {
        promises.push(
          axios.get(`https://my.api.mockaroo.com/shows/${show.id}.json?key=`)
            .then((response) => {
              showInfo.push(response.data);
            })
            .catch((err) => {
              console.log("We likely reached Mockaroo's request limit...");
              console.log(err);
              showInfo.push(mockShowAPI[show.id]);
            })
        )
        return show.id;
      });

      Promise.all(promises).then(() => {
        setUserShows(showInfo);
      })
    }
  }, [data])

    const [copied, setCopied] = useState(false);
    const onCopy = () => {
	setCopied(true);
    }
  return (
    <>
      <div id="container">
        <div id="heading">
          <img src={mockUserImage(data.id)} alt="profile" id="profile-picture" />
          <div id="profile-text">
            <h3>{data.username}'s Profile</h3>
            <p>{data.bio}</p>
          </div>
        </div>
        <div>
          <h4>Recently Added Shows</h4>
          <p>{userShows
            ? <div id="show-container">
              {userShows.map((show) => {
                return <img src={mockShowImage(show.id)} alt={`cover-${show.id}`} key={show.id} />;
              })}
            </div>
              : "No shows"}</p>
	    <Link to={`/my-shows/${data.id}`}>
		<button className="profButton">My Shows</button>
	    </Link>
	    <button className="profButton">Settings</button>
	    <CopyToClipboard text={window.location.href} onCopy={onCopy}>
	    <div> 
		{/*CopyToClipboard must have exactly one child, hence why the button and copied text are wrapped in a div.*/}
		<button className="profButton">Share</button>
		<p>{copied ? "Copied URL to clipboard." : ""}</p>
	    </div>
	  </CopyToClipboard>
        </div>
      </div>
    </>
  );
}

const Profile = (props) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios(`https://my.api.mockaroo.com/tv_users/${props.id}.json?key=`)
      .then((response) => {
        setUserData(response.data)
      })
      .catch((err) => {
        // This case is likely to be due to Mockaroo rate limiting!
        // It'd be good to add some error handling here later, if someone tries to 
        // access a non-existent user
        console.log(err);
        const mockUser = createMockUser(props.id);
        setUserData(mockUser);
      });
  }, [props.id]);

  return (
    <>
      <Hamburger />
      {userData === null
        ? <p>Oh no! Looks like this user wasn't found....</p>
        : <UserInfo data={userData} />
      }
      <Footer />
    </>
  )
}

export default Profile;
