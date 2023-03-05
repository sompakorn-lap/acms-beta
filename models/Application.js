const mongoose = require('mongoose')
const { Schema } = mongoose

const ApplicationSchema = Schema({
  userId: String,
  order: Number,
  email: String,
  tel: String,
  name: String,
  grade: String,
  school: String,
  transcriptionImageId: String,
  identityCardImageId: String,
  checked: Boolean
})

const Application = mongoose.model('application', ApplicationSchema)

module.exports = Application