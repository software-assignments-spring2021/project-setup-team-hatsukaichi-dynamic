const express = require("express")
const axios = require("axios")
const app = express()
app.use(express.json()) // use the bodyparser middleware
app.use(express.urlencoded({ extended: true }))

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

app.post('/tv_users', (req, res, next) => {
    axios.post(`https://my.api.mockaroo.com/tv_users.json?key=${process.env.REACT_APP_MOCKAROO_KEY}&__method=POST`, {
        "username": req.body.username,
        "email": req.body.email,
        "password": req.body.password
    })
    .then((response) => {
        console.log(response)
        res.json(response.data)
    })
    .catch((err) => {
        next(err)
    })
});

module.exports = app