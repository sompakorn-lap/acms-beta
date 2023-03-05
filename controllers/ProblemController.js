const Problem = require('../models/Problem')
const crypto = require('crypto')

const createProblem = async (req, res) => {
  try {
    const problem = new Problem({
      ...req.body,
      problemId: crypto.randomUUID()
    })
    await problem.save()
    res.status(201).json(problem)
  }
  catch (error) { res.status(500).json(error) }
}

const findProblem = async (req, res) => {
  try {
    const problem = await Problem.findOne(req.params).select('-answerKey')
    if(!problem){
      return res.status(404).json({ error: 'Problem not found' })
    }
    res.status(200).json(problem)
  }
  catch (error) { res.status(500).json(error) }
}

const findProblems = async (req, res) => {
  try {
    const problems = await Problem.find(req.params).select('-answerKey')
    res.status(200).json(problems)
  }
  catch (error) { res.status(500).json(error) }
}

module.exports = {
  createProblem,
  findProblem,
  findProblems
}