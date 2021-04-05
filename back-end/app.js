const express = require('express')
const axios = require('axios')
const app = express()
const morgan = require("morgan") // middleware for logging of incoming HTTP requests
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev")) // dev is a concise color-coded default style for morgan

app.get('/tv_users', (req, res, next) => {
    axios.get(`https://my.api.mockaroo.com/tv_users.json?key=${process.env.MOCKAROO_KEY}`)
        .then( (response) => {
            res.json(response.data)
        })
        .catch( (err) => {
            next(err)
        })
});

app.get('/shows/:id', (req, res, next) => {
  axios
    .get(
      `https://my.api.mockaroo.com/shows/${req.params.id}.json?key=${process.env.API_KEY_MOCKAROO}`
    )
    .then((response) => {
      res.json(response.data)
    })
    .catch((err) => {
      next(err)
    })
})

app.get('/', (req, res, next) => {
  res.send("TV Tracker App Home page!")
})

app.get('/tv_users/:id', (req, res, next) => {
  axios
    .get(
      `https://my.api.mockaroo.com/tv_users/${req.params.id}.json?key=${process.env.API_KEY_MOCKAROO}`
    )
    .then((response) => {
      res.json(response.data)
    })
    .catch((err) => {
      next(err)
    })
})

app.post('/tv_users', (req, res, next) => {
    axios.post(`https://my.api.mockaroo.com/tv_users.json?key=${process.env.API_KEY_MOCKAROO}&__method=POST`, {
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    })
    .then((response) => {
        console.log(response)
        res.json(response.data)
    })
    .catch((err) => {
        next(err)
    })
});

app.get('/shows', (req, res, next) => {
  axios
    .get(
      `https://my.api.mockaroo.com/shows.json?key=${process.env.API_KEY_MOCKAROO}`
    )
    .then((response) => {
      res.json(response.data)
    })
    .catch((err) => {
      next(err)
    })
})

app.patch('/tv_users/:id', (req, res, next) => {
  axios
    .patch(
      `https://my.api.mockaroo.com/tv_users/${req.params.id}.json?key=${process.env.API_KEY_MOCKAROO}&__method=PATCH`,
      {
        username:
          req.body.username == null ? req.query.username : req.body.username,
        password:
          req.body.password == null ? req.query.password : req.body.password,
        bio: req.body.bio == null ? req.query.bio : req.body.bio,
        shows: req.body.shows == null ? req.query.shows : req.body.shows
      }
    )
    .then((response) => {
      res.json(response.data)
    })
    .catch((err) => {
      next(err)
    })
})

app.get('/shows-trakt', (req, res, next) => {
  //return popular shows if query is not given
  if (Object.keys(req.query).length === 0){
    axios
      .get(
        `https://api.trakt.tv/shows/popular?Content-Type=application/json&trakt-api-version=2&trakt-api-key=${process.env.API_KEY_TRAKT}`
      )  
      .then((response) => {
        res.json(response.data)
      })
      .catch((err) => {
        next(err)
      })
  //otherwise return requested show information
  }else{
    axios
      .get(
        `https://api.trakt.tv/search/show,movie?query=${req.query.query}&Content-Type=application/json&trakt-api-version=2&trakt-api-key=${process.env.API_KEY_TRAKT}`
      )
      .then((response) => {
        res.json(response.data)
      })
      .catch((err) => {
        next(err)
      })
  }
})

app.get('/logout', (req, res, next) => {
	//req.logOut(); add later when database is setup
	res.json({success: "Successfully logged out"});
})

module.exports = app
