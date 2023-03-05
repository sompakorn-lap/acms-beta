const mongoose = require('mongoose')
const { Schema } = mongoose

const SubmissionSchema = Schema({
  userId: String,
  problemId: String,
  contestId: String,
  answer: [String],
  submitted: Boolean,
  score: [Number],
})

const Submission = mongoose.model('submission', SubmissionSchema)

module.exports = Submission