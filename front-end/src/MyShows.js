import React, { useEffect, useState } from 'react'
import Footer from './Footer';
import axios from 'axios';
// Hamburger should eventually be replaced with a navigation bar component, when created
import Hamburger from './Hamburger';
import { createMockUser, mockShowAPI, mockShowImage } from './MockData'
import './MyShows.css'

const ShowGrid = (props) => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    let promises = [];
    let showInfo = [];

    // This check is crucial--it sees whether userData (the props) has been loaded yet or not
    if (!props.shows) {
      setShows([]);
    }
    else {
      // Note: At the moment, we don't need any of the mocked data since we only really need the image here
      // but it's being mocked with picsum for now.
      props.shows.map((show) => {
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
        setShows(showInfo);
      })
    }
  }, [props.shows])


  return (
    <>
      <h3>My Shows</h3>
      <div id="show-container">
        {shows !== undefined && shows.length !== 0
          ? shows.map((show) => {
            return <img src={mockShowImage(show.id)} alt={`cover-${show.id}`} key={show.id} />
          })
          : <p>No shows found...</p>
        }
      </div>
    </>
  )
}

// For now, a very simple + non-function search.
// I'm thinking of using react-sync to show search results in a drop-down
const Search = ({ input, onChange }) => {
  return (
    <div id="search-container">
      <input
        id="search-bar"
        value={input}
        placeholder={"Search Shows..."}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

const Filters = () => {
  return (
    <>
      <div id="filter-container">
        <button> In Progress </button>
        <button> Filter Shows </button>
        <button> Completed </button>
      </div>
    </>
  )
}

const MyShows = (props) => {
  const [userData, setUserData] = useState([]);
  const [input, setInput] = useState('');

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

  const updateInput = (input => {
    setInput(input)
  })

  return (
    <>
      <Hamburger />
      <div id="container">
        <h3>{userData.username}'s Shows</h3>
        <Search input={input} onChange={updateInput} />
        <Filters />
        <ShowGrid shows={userData.shows} />
      </div>
      <Footer />
    </>
  )
}

export default MyShows