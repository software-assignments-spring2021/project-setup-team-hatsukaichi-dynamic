const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator')
const saltRounds = 10

const UserSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true, min: 1, max: 255  },
  username: { type: String, required: true, unique: true, min: 2, max: 255 },
  email: { type: String, required: true, unique: true, min: 2,  max: 255 },
  passwordHash: { type: String, required: true, min: 6, max: 1024 },
  bio: { type: String, required: false },
  img: { type: String, required: false },
  shows: { type: Array, default: [] }
})

UserSchema.plugin(uniqueValidator)

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.passwordHash)
}

UserSchema.virtual('password').set(function (value) {
  this.passwordHash = bcrypt.hashSync(value, saltRounds)
})

//module.exports = { UserModel: mongoose.model('User', UserSchema) }
module.exports =  mongoose.model('User', UserSchema)
