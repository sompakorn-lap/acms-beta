const Submission = require('../models/Submission')
const Problem = require('../models/Problem')
const User = require('../models/User')

const updateSubmission = async (req, res) => {
  try {
    const submission = await Submission.findOneAndUpdate(req.params, req.body, { new: true })
    if(!submission){
      return res.status(404).json({ error: 'Submission not found' })
    }
    res.status(200).json(submission)
  }
  catch (error) { res.status(500).json(error) }
}

const findSubmission = async (req, res) => {
  try {
    const submission = await Submission.findOne(req.params)
    if(!submission){
      const problem = await Problem.findOne({ problemId: req.params.problemId })
      const newSubmission = new Submission({
        ...req.params,
        answer: Array(problem.answerForm.length).fill(''),
        submitted: false,
        score: Array(problem.answerForm.length).fill(0.0)
      })
      await newSubmission.save()
      return res.status(200).json(newSubmission)
    }
    res.status(200).json(submission)
  }
  catch (error) { res.status(500).json(error) }
}

const findSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ ...req.query, submitted: true })
    res.status(200).json(submissions)
  }
  catch (error) { res.status(500).json(error) }
}

const calculateRank = async (req, res) => {
  try {
    const submissions = await Submission.find({ submitted: true })
    const users = await User.find({ role: 'examinee' })
    const usernames = {}
    for(const user of users){
      const { userId, username } = user
      usernames[userId] = username
    }

    const userScores = {}
    for(const submission of submissions){
      const { userId, score, contestId } = submission
      if(contestId === 'practice'){ continue }
      if(!userScores[userId]){ userScores[userId] = 0 }
      userScores[userId] += score.reduce((sum, item) => sum + item)
    }
    const rank = Object.entries(userScores).map(([userId, score]) => ({ username: usernames[userId] , score })).sort((a, b) => b.score - a.score)
    res.status(200).json(rank)
  }
  catch (error) { res.status(500).json(error) }
}

module.exports = {
  updateSubmission,
  findSubmission,
  findSubmissions,
  calculateRank
}