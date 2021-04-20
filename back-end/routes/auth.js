const app = require('express').Router()
const User=require('../models/User')

app.post('/register', async (req, res) => {
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
