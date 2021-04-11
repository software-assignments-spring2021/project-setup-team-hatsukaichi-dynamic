const mongoose = require('mongoose')

const bcrypt = require('bcrypt')

const uniqueValidator = require('mongoose-unique-validator')

const saltRounds = 10

const UserSchema = new mongoose.Schema({
	username: {type: String, required: true, unique: true},
	email: {type: String, required: true, unique: true},
	passwordHash: {type: String, required: true}
})

UserSchema.plugin(uniqueValidator)

UserSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.passwordHash)
}

UserSchema.virtual("password").set(function(value){
	this.passwordHash = bcrypt.hashSync(value, saltRounds)
})

module.exports = mongoose.model('User', UserSchema)