const express = require('express')
const app = require('express').Router()
const User=require('../models/User')
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt') //encrypt password
const { body, validationResult } = require('express-validator')
const expressSession = require('express-session') 
app.use(express.urlencoded({ extended: true }))
app.use(expressSession({'secret':'any','saveUninitialized':false, 'resave':false}))
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) { 
  done(null, user.id)
})

passport.deserializeUser(function(id, done) { 
  User.findById(id, function(err, user) {
    done(err, user)
  })
})

//Passport middleware to handle user registration
passport.use('register', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true //necessary to access other 
},async function (req, email, password, done) {
  try{
    //Check if email is already registered
    const emailExist = await User.findOne({email})
    if (emailExist) {  
      return done(null, false, { message: 'Email is already registered' }); }
    
    //Check if username is already registered  
    const usernameExist = await User.findOne({username: req.body.username})
    if (usernameExist) 
      return done(null, false, {message: 'Username already registered, log in instead',});
    
    //Construct a user object
    const user = new User({
      id: req.body.id,
      username: req.body.username,
      email: email, 
      password: password, 
      bio: "",
      img: "",
      shows: []
      }); 
    //Save user object to the database
    await user.save();

    //Send the user information to the next middleware
    return done(null, user, { message: 'Successful sign up'})
  //Return error message
  }catch (error) {
    return done(null, false, { message: error.message});
  }
}))

app.post(
  '/register',
    // Firstly check if user input is valid
    body('email').isEmail().normalizeEmail().withMessage('Please enter valid email.'),
    body('username').isAlphanumeric().not().isEmpty().trim().escape().isLength({ min: 2 }).withMessage('Username can contain only letters and digits. Length should be at least 2 characters.'),
    body('password')
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
      returnScore: false
    })
    .withMessage(
      'Password must have at least 8 characters - at least 1 lowercase, 1 uppercase, 1 numeric and no symbol characters'
      )
    .not()
    .contains(' ')
    .not()
    .isEmpty()
    .trim()
    .escape(),
  async (req, res, next) => {
    //Return any formatting errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    } // Proceed to authentication
    passport.authenticate(
      'register', 
      { session: false },
      async (err, user, info) => {
        try { //Return any authentication errors
          if (err || !user) {
            const { statusCode = 400, message } = info;
            return res.status(statusCode).json({
              status: "error",
              error: {
                message,
              },
            });
          }else{ //Otherwise send success message
            res.json({
              message: 'Registration successful',
              user: req.user
          });
          }
        } //Handle any other errors
        catch (error) {
          throw new Error({message: error.message});
        }
      }
    )(req, res, next);
  }
);

app.post('/login1', (req, res) => {
  res.send('Login')
})

module.exports=app 
