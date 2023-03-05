const Contest = require('../models/Contest')
const crypto = require('crypto')

const createContest = async (req, res) => {
  try {
    const contest = new Contest({
      ...req.body,
      contestId: crypto.randomUUID()
    })
    await contest.save()
    res.status(201).json(contest)
  }
  catch (error) { res.status(500).json(error) }
}

const findContests = async (req, res) => {
  try {
    const contests = await Contest.find(req.params)
    res.status(200).json(contests)
  }
  catch (error) { res.status(500).json(error) }
}

const findContest = async (req, res) => {
  try {
    const contest = await Contest.findOne(req.params)
    if(!contest){
      return res.status(404).json({ error: 'Contest not found' })
    }
    res.status(200).json(contest)
  }
  catch (error) { res.status(500).json(error) }
}

module.exports = {
  createContest,
  findContests,
  findContest
}