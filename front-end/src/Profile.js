import React, { useEffect, useState } from 'react'
import Footer from './Footer';
import axios from 'axios';
import './Profile.css'

// mockImage uses picsum to mock user-provided images
const mockImage = (id) => {
  return `https://picsum.photos/seed/${id}/200`;
}

const UserInfo = ( {data} ) => {
  return (
    <>
      <div id="container">
        <div id="heading">
          <img src={mockImage(data.id)} alt="profile" id="profile-picture"/>
          <div id="profile-text">
            <h3>{data.username}'s Profile</h3>
            <p>{data.bio}</p>
          </div>
        </div>
      </div>
    </>
  );
}

const Profile = (props) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios(`https://my.api.mockaroo.com/tv_users/${props.id}.json?key=71236df0`)
      .then( (response) => {
        console.log(response.data)
        setUserData(response.data)
      })
      .catch( (err) => {
        // This case is likely to be due to Mockaroo rate limiting!
        // It'd be good to add some error handling here later, if someone tries to 
        // access a non-existent user
        console.log(err);

        setUserData(null);
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