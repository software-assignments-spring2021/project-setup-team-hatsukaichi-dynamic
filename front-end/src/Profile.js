import React, { useEffect, useState } from 'react'
import Footer from './Footer';
import axios from 'axios';

function UserInfo(props) {
  return (
    <>
      {props.user === undefined ? "empty's" : props.user + "'s"}
      <span> profile page! </span>
    </>
  );
}

const Profile = (props) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios(`https://my.api.mockaroo.com/tv_users/${props.id}.json?key=71236df0`)
  });
  
  return (
    <>
      <p>Hello!</p>
      <Footer />
    </>
  )
}

export default Profile;