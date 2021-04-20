const app = require('express').Router()
const User=require('../models/User')
const bcrypt = require('bcrypt') //encrypt password
const Joi = require('@hapi/joi') //joi validates user input

//validate user signup submission
const registerValidation = (data) => {
  const schema =
    Joi.object({
      id: Joi.string().min(1).required(), 
      username: Joi.string().min(2).required(), 
      email: Joi.string().min(2).required(),
      passwordHash: Joi.string().min(6).required()
  })
  return schema.validate(data)
}

app.post('/register', async (req, res) => {
  //validate data
  const {error} =registerValidation(req.body)

  //send validation error
  if (error) return res.status(400).send(error.details[0].message)

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
