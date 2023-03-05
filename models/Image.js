const mongoose = require('mongoose')
const { Schema } = mongoose

const ImageSchema = Schema({
  imageId: String,
  data: String
})

const Image = mongoose.model('image', ImageSchema)

module.exports = Image