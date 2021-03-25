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

module.exports = app