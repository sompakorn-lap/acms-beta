const Submission = require('../models/Submission')
const Problem = require('../models/Problem')

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
    const rank = submissions
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