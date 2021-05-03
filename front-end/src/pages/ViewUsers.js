import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import axios from 'axios'
import image from '../images/stock-user-white.png'
import { Link } from 'react-router-dom'
import './ViewUsers.css'

function ViewUsers(props) {
  const [users, setUsers] = useState([])
  const [errorMsg, setErrorMsg] = useState('')
  const [hasError, setError] = useState(false)

  const AllUsers = ({ users }) => {
    return (
      <>
        <h4 id="title-rec-shows">Users</h4>
        {users ? (
          <div id="profile-show-container">
            {users.map((user) => {
              return (
                <>
                  <p>{user.email}</p>
                  <div className="header"></div>
                  <div className="content">
                    <img className="github-img" src={user.img} alt=""></img>
                    <h4>{user.username}</h4>
                    <p>{user.bio}</p>
                    <Link to={`/profile/${user.id}`}>link</Link>
                    <h4>Shows</h4>
                  </div>
                </>
              )
            })}
          </div>
        ) : (
          <p id="no-users">No users. Register as a new userq!</p>
        )}
      </>
    )
  }
  useEffect(() => {
    axios
      .get(`http://localhost:4000/tv_users`)
      .then((response) => {
        console.log(response.data)
        setUsers(response.data)
      })
      .catch((err) => {
        console.log(err.response)
        setUsers([])
        setError(true)
        setErrorMsg(err.response)
      })
  }, [])
  return (
    <>
      <body>
        <Header />
        <h1>All Users</h1>
        <AllUsers users={users} />
        <Footer />
      </body>
    </>
  )
}

export default ViewUsers
