import React, { useEffect, useState } from 'react'
import Footer from './Footer';
import axios from 'axios';
import './Profile.css'
// Hamburger should eventually be replaced with a navigation bar component, when created
import Hamburger from './Hamburger';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { createMockUser, mockShowAPI, mockUserImage, mockShowImage, mockUserUpdate } from './MockData'
import { Link } from 'react-router-dom'
import Modal from "react-modal";

// UserInfo displays all user-specific information for the profile
const UserInfo = ({ data, updateUserData }) => {
    const [userShows, setUserShows] = useState([]);
    const [copied, setCopied] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const [pic, setPic] = useState("");
    const [open, setOpen] = useState(false);

    const toggleModal = () => {
	setOpen(!open);
    }

    const onCopy = () => {
	setCopied(true);
    }

    const handleSubmit = (event) => {
	event.preventDefault();
	alert('Settings updated.')
	const newData = {
	    ...data,
	    'bio': bio,
	    'img': pic,
	    'email': email
	}
	axios.patch(`https://my.api.mockaroo.com/tv_users/${data.id}.json?key=&__method=PATCH`, newData ) //Paste in your key after key=.
	    .then((response) => {
		console.log(response)
		updateUserData(response.data)
	    })
	    .catch((err) => {
		console.log("We likely reached Mockaroo's request limit, or no API key has been provided...");
		console.log(err);
		updateUserData(mockUserUpdate(data.id, newData));
	    })
    }

    useEffect(() => {
	setEmail(data.email)
	setBio(data.bio)
	setPic(data.img)
    }, [data.email, data.bio, data.img]);

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
          {userShows
            ? <div id="show-container">
              {userShows.map((show) => {
                return <img src={mockShowImage(show.id)} alt={`cover-${show.id}`} key={show.id} />;
              })}
            </div>
              : "No shows"}
	    <div>
		<Link to={`/my-shows/${data.id}`}>
		    <button className="prof-button">My Shows</button>
		</Link>
	    </div>
	    <div>
		<button className="prof-button" onClick={toggleModal}>Settings</button>
		<Modal
		    isOpen={open}
		    onRequestClose={toggleModal}
		    contentLabel="Settings"
		>
		    <h1>Settings</h1>
		    <form onSubmit={handleSubmit}>
			<fieldset>
			    <label><h3>Email:</h3>
				<input type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
			    </label>
			    <label><h3>Password</h3>
				<input type="password" id="password" name="password" placeholder="******" value={password} onChange={e => setPassword(e.target.value)}  />
			    </label>
			    <label><h3>Bio</h3>
				<input type="text" id="bio" name="bio" value={bio} onChange={e => setBio(e.target.value)} />
			    </label>
			    <label><h3>Profile Picture URL</h3>
				<input type="url" id="prof-pic" name="prof-pic" value={pic} onChange={e => setPic(e.target.value)} />
			    </label>
			</fieldset>
			<button type="submit" className="prof-button">Save</button>
		    </form>
		    <button className="prof-button" onClick={toggleModal}>Back</button>
		</Modal>
	    </div>
	    <CopyToClipboard text={window.location.href} onCopy={onCopy}>
	    <div> 
		{/*CopyToClipboard must have exactly one child, hence why the button and copied text are wrapped in a div.*/}
		<button className="prof-button">Share</button>
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

    const updateUser = (newData) => {
	setUserData(newData)
    }
    
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
       : <UserInfo data={userData} updateUserData={updateUser} />
      }
      <Footer />
    </>
  )
}

export default Profile;
