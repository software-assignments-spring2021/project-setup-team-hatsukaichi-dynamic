const app = require('express').Router()
const User=require('../models/User')
const bcrypt = require('bcrypt') //encrypt password
const Joi = require('@hapi/joi') //joi validates user input
const { body, validationResult } = require('express-validator')
const expressSession = require('express-session') 

app.use(expressSession({'secret':'any','saveUninitialized':false, 'resave':false}))

app.get('/', function(req, res, next) {
  if (req.session.errors != null)
  res.json(req.session.errors)
})

  app.post('/register',
    body('email').isEmail().normalizeEmail().withMessage('invalid email'),
    body('username').isAlphanumeric().not().isEmpty().trim().escape().isLength({ min: 2 }).withMessage('invalid username'),
    body('passwordHash')
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

  async(req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

  //check if email exists
  const emailExist = await User.findOne({email: req.body.email})
  if (emailExist) return res.status(400).send('Email already exists')

  //check if username exists
  const usernameExist = await User.findOne({email: req.body.username})
  if (usernameExist) return res.status(400).send('Username already exists')

  //hash password
  const salt= await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.passwordHash, salt)

  //create user object
  const user = new User({
    id: req.body.id, 
    username: req.body.username, 
    email: req.body.email, 
    passwordHash: hashedPassword
  })
  //save user object to database
  try{
    const savedUser=await user.save()
    res.send(savedUser)
  } catch(err){ //otherwise send error
    res.status(400).send(err)
  }
})
//tbt
app.post('/login1', (req, res) => {
  res.send('Login')
})

module.exports=app 
