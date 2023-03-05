const Submission = require('../models/Submission')
const Problem = require('../models/Problem')

async function submit(req, res) {
  try {
    const { problemId } = req.params
    let submission = await Submission.findOne(req.params)
    if(!submission){
      return res.status(404).json({ error: 'Submission not found' })
    }
    const problem = await Problem.findOne({ problemId: problemId })
    if(!problem){
      return res.status(404).json({ error: 'Problem not found' })
    }

    /* auto grading */
    let index = 0
    let newScore = []
    for(const item of problem.answerKey){
      const key = problem.answerKey[index]
      const ans = submission.answer[index]
      const value = problem.fullscore[index]
      newScore.push(key.includes(ans) ? value : 0)
      index++
    }
    
    await Submission.updateOne(req.params, { score: newScore, submitted: true })
  }
  catch (error) { res.status(500).json(error) }
}

module.exports = {
  submit
}