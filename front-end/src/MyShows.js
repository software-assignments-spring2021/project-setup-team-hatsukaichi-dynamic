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

// For now, a very simple + non-functional search.
// I'm thinking of using react-select-async to show search results in a dropdown
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

// filterShows filters a list of shows with user information by their status (indicated by a boolean)
// the status variable being passed into this function, however, is a string as to account for
// the case where no show status filtering is being done
const filterShows = (shows, status) => {
  const isCompleted = status === "Completed";
  if (!shows) {
    return [];
  }
  else {
    const filtered = shows.filter( (show) => {
      if (status === "") {
        return show;
      }
      return show.completed === isCompleted;
    });
    console.log(filtered)
    return filtered;
  }
}

const MyShows = (props) => {
  const [userData, setUserData] = useState([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('');
  const [inProgressSelected, setInProgressSelected] = useState(false);
  const [completedSelected, setCompletedSelected] = useState(false);

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

  const updateInput = ( (input) => {
    setInput(input)
  });

  const onStatusChange = ( (buttonType) => {
    if (buttonType === "in progress") {
      inProgressSelected ? setStatus("") : setStatus("In Progress");
      // This if statement logic ensures that the two status buttons are never on at the same time
      if (status !== "") {
        setCompletedSelected(false);
      }
      setInProgressSelected(!inProgressSelected);
    }
    else {
      completedSelected ? setStatus("") : setStatus("Completed");
      if (status !== "") {
        setInProgressSelected(false);
      }
      setCompletedSelected(!completedSelected);
    }
  });

  return (
    <>
      <Hamburger />
      <div id="container">
        <h3>{userData.username}'s Shows</h3>
        <Search input={input} onChange={updateInput} />
        <div id="filter-container">
          <button 
            className={inProgressSelected ? "selected" : ""}
            onClick={(e) => onStatusChange("in progress")}
          >
            In Progress 
          </button>
          <button> Filter Shows </button>
          <button 
            className={completedSelected ? "selected" : ""}
            onClick={(e) => onStatusChange("completed")}
          >
            Completed
          </button>
        </div>
        <ShowGrid shows={filterShows(userData.shows, status)} status={status} />
      </div>
      <Footer />
    </>
  )
}

export default MyShows