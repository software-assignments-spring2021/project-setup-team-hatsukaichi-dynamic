import React, { useEffect, useState } from 'react'
import Footer from './Footer';
import axios from 'axios';
import './Profile.css'

// Mock data for testing/development purposes when Mockaroo limits are reached
const mockShows = JSON.parse(`[{
  "id": 36,
  "platform": "Babblestorm",
  "completed": false,
  "progess": 30
},{
  "id": 3,
  "platform": "Topiclounge",
  "completed": false,
  "progess": 78
},
{
  "id": 54,
  "platform": "Fiveclub",
  "completed": true,
  "progess": 8
},
{
  "id": 42,
  "platform": "Feednation",
  "completed": false,
  "progess": 71
},
{
  "id": 96,
  "platform": "Gigashots",
  "completed": false,
  "progess": 17
},
{
  "id": 11,
  "platform": "Gigaclub",
  "completed": true,
  "progess": 22
}]`);

// Mock data for testing/development purposes when Mockaroo limits are reached
const mockShowAPI = {
  '54': {
    "id": 54,
    "name": "Ladies They Talk About",
    "description": "Aenean sit amet justo.",
    "genres": "Drama|Romance",
    "isMovie": false,
    "episodes": 66,
    "coverPhoto": "http://dummyimage.com/243x117.png/dddddd/000000"
  },
  '42': {
    "id": 42,
    "name": "Samouraï, Le (Godson, The)",
    "description": "Etiam pretium iaculis justo.",
    "genres": "Crime|Drama|Thriller",
    "isMovie": false,
    "episodes": 56,
    "coverPhoto": "http://dummyimage.com/246x181.png/cc0000/ffffff"
  },
  '96': {
    "id": 96,
    "name": "Bob Saget: That Ain't Right",
    "description": "Proin eu mi. Nulla ac enim.",
    "genres": "Comedy",
    "isMovie": true,
    "episodes": 1,
    "coverPhoto": "http://dummyimage.com/174x138.png/dddddd/000000"
  },
  '11': {
    "id": 11,
    "name": "Ca$h",
    "description": "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
    "genres": "Crime|Thriller",
    "isMovie": true,
    "episodes": 1,
    "coverPhoto": "http://dummyimage.com/225x181.png/cc0000/ffffff"
  }
};

// mockImage uses picsum to mock user-provided images
const mockImage = (id) => {
  return `https://picsum.photos/seed/${id}/200`;
}

// mockShowImage uses picsum to mock TV Show covers
const mockShowImage = (id) => {
  return `https://picsum.photos/seed/m${id}/200/300`
}

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
          axios.get(`https://my.api.mockaroo.com/shows/${show.id}.json?key=71236df0`)
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
          <img src={mockImage(data.id)} alt="profile" id="profile-picture" />
          <div id="profile-text">
            <h3>{data.username}'s Profile</h3>
            <p>{data.bio}</p>
          </div>
        </div>
        <div>
          <h4>Recently Added Shows</h4>
          <p>{userShows 
                ? <div id="show-container">
                    {userShows.map( (show) => {
                      return <img src={mockShowImage(show.id)} alt={`cover-${show.id}`} key={show.id} />;
                    })}
                  </div>
                : "No shows"}</p>
          <p>My Shows</p>
          <p>Settings</p>
          <p>Share</p>
        </div>
      </div>
    </>
  );
}

const Profile = (props) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios(`https://my.api.mockaroo.com/tv_users/${props.id}.json?key=71236df0`)
      .then((response) => {
        setUserData(response.data)
      })
      .catch((err) => {
        // This case is likely to be due to Mockaroo rate limiting!
        // It'd be good to add some error handling here later, if someone tries to 
        // access a non-existent user
        console.log(err);
        const mockUser = {
          "id": props.id,
          "username": "mlaffan0",
          "password": "njb9oAB",
          "email": "jparkin0@utexas.edu",
          "bio": "Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
          "img": "http://dummyimage.com/182x112.jpg/dddddd/000000",
          "shows": mockShows,
        }
        setUserData(mockUser);
      });
  }, [props.id]);

  return (
    <>
      {userData === null
        ? <p>Oh no! Looks like this user wasn't found....</p>
        : <UserInfo data={userData} />
      }
      <Footer />
    </>
  )
}

export default Profile;