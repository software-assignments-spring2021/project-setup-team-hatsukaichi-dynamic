const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const uniqueValidator = require('mongoose-unique-validator')
const saltRounds = 10
const autoIncrement = require('mongoose-sequence')(mongoose)

const UserSchema = new mongoose.Schema({
  id: { type: Number },
  username: { type: String, required: true, unique: true, min: 2 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, min: 8, max: 1024 },
  bio: { type: String, required: false },
  img: { type: String, required: false },
  shows: { type: Array, default: [] }
})

UserSchema.plugin(autoIncrement, { inc_field: 'id' })

UserSchema.plugin(uniqueValidator)

UserSchema.methods.validPassword = async function (password) {
  const user = this
  const compare = await bcryptjs.compareSync(password, this.password)
  return compare
}

//Pre-hook before the user info is saved in database: hash password and store it
UserSchema.pre('save', async function (next) {
  const user = this
  const hash = await bcryptjs.hashSync(this.password, saltRounds)
  this.password = hash
  next()
})

const User = mongoose.model('user', UserSchema)

module.exports = User
