const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = Schema({
  userId: String,
  username: String,
  password: String,
  role: String,
  active: Boolean,
  online: Boolean
})

const User = mongoose.model('user', UserSchema)

module.exports = User