const express = require('express');
const app = express.Router();
//to access the secure route, a query with a secret_token needs to be provided
//for example: http://localhost:4000/tv_users/124/profile?secret_token=XXXXX where XXXXX 
app.get(
  '/profile',
  (req, res, next) => {
    res.json({
      message: 'You are granted access to the secure route',
      user: req.user,
      token: req.query.secret_token
    })
  }
);

module.exports = app;
 
