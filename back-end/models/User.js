const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator')
const saltRounds = 10

const UserSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true, min: 2 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, min: 8, max: 1024 },
  bio: { type: String, required: false },
  img: { type: String, required: false },
  shows: { type: Array, default: [] }
})

UserSchema.plugin(uniqueValidator)

UserSchema.methods.validPassword = async function (password) {
  const compare = await bcrypt.compare(password, this.password)
  return compare
}

//Pre-hook before the user info is saved in database: hash password and store it
UserSchema.pre('save', async function(next){
  const user = this;
  const hash = await bcrypt.hash(this.password, saltRounds);
  this.password = hash;
  next()
})

const User = mongoose.model('user',UserSchema)

module.exports = User


