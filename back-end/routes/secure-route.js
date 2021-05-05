const express = require('express')
const app = express.Router()

/*Note: /profile route is a placeholder route for secure access; 
 /patch route will be moved to the file to replace the route */

//to access the secure route, a query with a secret_token needs to be provided
//for example: http://localhost:4000/profile?secret_token=XXXXX where XXXXX

app.get('/profile', (req, res, next) => {
  res.json({
    message: 'You are granted access to the secure route',
    user: req.user,
    token: req.query.secret_token
  })
})

module.exports = app
