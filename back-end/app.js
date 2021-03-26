const express = require("express")
const axios = require("axios")
const app = express()

app.get('/shows/:id', (req, res, next) => {
    axios.get(`https://my.api.mockaroo.com/shows/${req.params.id}.json?key=`)
        .then( (response) => {
            res.json(response.data)
        })
        .catch( (err) => {
            next(err)
        })
});

app.get('/tv_users/:id', (req, res, next) => {
    axios.get(`https://my.api.mockaroo.com/tv_users/${req.params.id}.json?key=`)
        .then( (response) => {
            res.json(response.data)
        })
        .catch( (err) => {
            next(err)
        })
});

app.get('/tv_users', (req, res, next) => {
    axios.get(`https://my.api.mockaroo.com/tv_users.json?key=`)
        .then( (response) => {
            res.json(response.data)
        })
        .catch( (err) => {
            next(err)
        })
});

module.exports = app