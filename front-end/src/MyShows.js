import React, { useEffect, useState } from 'react'
import Footer from './Footer';
import axios from 'axios';
// Hamburger should eventually be replaced with a navigation bar component, when created
import Hamburger from './Hamburger';
import {createMockUser, mockShowAPI} from './MockData'

const ShowGrid = (props) => {
  return (
    <>
      <h3>My Shows</h3>
      {props.shows !== undefined
        ? props.shows.map( (show) => {
          return <p>{show.name}</p>
        })
        : <p>No shows found...</p>
      }
    </>
  )
}

const MyShows = (props) => {
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
      <p>Sample My Shows Page--hello, {userData.username} !</p>
      <Footer />
    </>
  )
}

export default MyShows