const express = require("express")
const axios = require("axios") // middleware for API integration
const app = express()
const morgan = require("morgan") // middleware for logging of incoming HTTP requests
require('dotenv').config();
app.use(morgan("dev")) 

app.get('/shows/:id', (req, res, next) => {
    axios.get(`https://my.api.mockaroo.com/shows/${req.params.id}.json?key=${process.env.MOCKAROO_KEY}`)
        .then( (response) => {
            res.json(response.data)
        })
        .catch( (err) => {
            next(err)
        })
});

app.get('/tv_users/:id', (req, res, next) => {
    axios.get(`https://my.api.mockaroo.com/tv_users/${req.params.id}.json?key=${process.env.MOCKAROO_KEY}`)
        .then( (response) => {
            res.json(response.data)
        })
        .catch( (err) => {
            next(err)
        })
});

app.get('/shows', (req, res, next) => {
    axios.get(`https://my.api.mockaroo.com/shows.json?key=${process.env.REACT_APP_MOCKAROO_KEY}`)
        .then( (response) => {
            res.json(response.data)
        })
        .catch( (err) => {
            next(err)
        })
});

module.exports = app