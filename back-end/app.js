const express = require('express')
const axios = require('axios')
const app = express()
require('dotenv').config()
app.use(express.json())

app.get('/tv_users', (req, res, next) => {
    axios.get(`https://my.api.mockaroo.com/tv_users.json?key=`)
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
      `https://my.api.mockaroo.com/shows/${req.params.id}.json?key=${process.env.MOCKAROO_KEY}`
    )
    .then((response) => {
      res.json(response.data)
    })
    .catch((err) => {
      next(err)
    })
})

app.get('/tv_users/:id', (req, res, next) => {
  axios
    .get(
      `https://my.api.mockaroo.com/tv_users/${req.params.id}.json?key=${process.env.MOCKAROO_KEY}`
    )
    .then((response) => {
      res.json(response.data)
    })
    .catch((err) => {
      next(err)
    })
})

app.get('/shows', (req, res, next) => {
  axios
    .get(
      `https://my.api.mockaroo.com/shows.json?key=${process.env.REACT_APP_MOCKAROO_KEY}`
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
      `https://my.api.mockaroo.com/tv_users/${req.params.id}.json?key=${process.env.MOCKAROO_KEY}&__method=PATCH`,
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
      console.log(response)
      res.json(response.data)
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = app
