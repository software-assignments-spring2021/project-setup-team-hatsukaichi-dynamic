const app = require('express').Router()
const User=require('../models/User')

//validating user post

const Joi = require('@hapi/joi') //joi validates user input

//validating user signup
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

//validating user login
const loginValidation = (data) => {
  const schema =
    Joi.object({
      username: Joi.string().min(2).required(), 
      email: Joi.string().min(2).required(),
      passwordHash: Joi.string().min(6).required()
  })
  return schema.validate(data)
}


app.post('/register', async (req, res) => {
  //validate data
  const {error} =registerValidation(req.body)
  res.send(error.error.details[0].message)
  //send validation error
  if (error) return res.status(400).send(error.error.details[0].message)

  const user = new User({
    id: req.body.id, 
    username: req.body.username, 
    email: req.body.email, 
    passwordHash: req.body.passwordHash
  })
  try{
    const savedUser=await user.save()
    res.send(savedUser)
  }catch(err){
    res.status(400).send(err)
  }
})

app.post('/login1', (req, res) => {
  res.send('Login')
})

module.exports=app 
