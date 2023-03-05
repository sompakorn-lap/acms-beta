const mongoose = require('mongoose')
const { Schema } = mongoose

const ProblemSchema = Schema({
  problemId: String,
  contestId: String,
  problemNo: String,
  problemTitle: String,
  statement: String,
  answerForm: [String],
  answerKey: [[String]],
  fullscore: [Number]
})

const Problem = mongoose.model('problem', ProblemSchema)

module.exports = Problem