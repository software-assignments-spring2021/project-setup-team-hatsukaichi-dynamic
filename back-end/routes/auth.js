const express = require('express')
const app = require('express').Router()
const User = require('../models/User')
const passport = require('passport')
const session = require('express-session')
const jwt = require('jsonwebtoken')
const localStrategy = require('passport-local').Strategy
const cors = require('cors')

require('dotenv').config({ silent: true })

const bcryptjs = require('bcryptjs') //encrypt password
const { body, validationResult } = require('express-validator')
app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: 'anything' }))
app.use(passport.initialize())
app.use(passport.session())
app.use(cors())
app.options('*', cors())

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

//Passport middleware to handle user registration
passport.use(
  'register',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true //necessary to access other
    },
    async function (req, email, password, done) {
      try {
        //Check if email is already registered
        const emailExist = await User.findOne({ email })
        if (emailExist) {
          return done(null, false, { message: 'Email is already registered' })
        }

        //Check if username is already registered
        const usernameExist = await User.findOne({
          username: req.body.username
        })
        if (usernameExist)
          return done(null, false, {
            message: 'Username already registered, log in instead'
          })

        //Construct a user object
        const user = new User({
          id: req.body.id,
          username: req.body.username,
          email: email,
          password: password,
          bio: '',
          img: '',
          shows: []
        })
        //Save user object to the database
        await user.save()
        //Send the user information to the next middleware
        return done(null, user, { message: 'Successful sign up' })
        //Return error message
      } catch (error) {
        return done(null, false, { message: error.message })
      }
    }
  )
)

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email })

        if (!user) {
          return done(null, false, { message: 'User not found' })
        }

        const validate = await user.validPassword(password)

        if (!validate) {
          return done(null, false, { message: 'Wrong Password' })
        }

        return done(null, user, { message: 'Logged in Successfully' })
      } catch (error) {
        return done(error)
      }
    }
  )
)

const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.TOKEN_SECRET,
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {
      try {
        return done(null, token.user)
      } catch (error) {
        done(error)
      }
    }
  )
)

app.post(
  '/register',
  // Firstly check if user input is valid
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter valid email.'),
  body('username')
    .isAlphanumeric()
    .not()
    .isEmpty()
    .trim()
    .escape()
    .isLength({ min: 2 })
    .withMessage(
      'Username can contain only letters and digits. Length should be at least 2 characters.'
    ),
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
      'Password can contain only letters and digits. It must contain at least 1 lowercase, 1 uppercase and 1 numeric character. Length should be at least 8 characters.'
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
        try {
          //Return any authentication errors
          if (err || !user) {
            const { statusCode = 400, message } = info
            return res.status(statusCode).json({
              status: 'error',
              error: {
                message
              }
            })
          } else {
            //Otherwise send success message
            res.json({
              message: 'Registration successful',
              user: user
            })
          }
        } catch (error) {
          //Handle any other errors
          throw new Error({ message: error.message })
        }
      }
    )(req, res, next)
  }
)

app.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const { statusCode = 400, message } = info
        return res.status(statusCode).json({
          status: 'error',
          error: {
            message
          }
        })
      }
      req.login(user, { session: false }, async (error) => {
        if (error)
          return res.status(400).json({
            status: 'error',
            message: error.message
          })
        const body = { _id: user._id, email: user.email }
        const token = jwt.sign({ user: body }, process.env.TOKEN_SECRET)
        return res.json({ user, token })
      })
    } catch (error) {
      throw new Error({ message: error.message })
    }
  })(req, res, next)
})

app.get('/logout', (req, res) => {
  req.logout()
  res.json({
    status: 'logout',
    message: 'Successful logout'
  })
})

module.exports = app
