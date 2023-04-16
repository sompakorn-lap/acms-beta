const mongoose = require('mongoose')
const { Schema } = mongoose

const ContestSchema = Schema({
  contestId: String,
  contestTitle: String,
  description: String,
  link: String,
})

const Contest = mongoose.model('contest', ContestSchema)

module.exports = Contest