const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    mdp: {type: String, required: true}
})

var User = mongoose.model('User', userSchema, 'users')

userSchema.plugin(uniqueValidator)

module.exports = User