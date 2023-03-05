const router = require('express').Router()
const ProblemController = require('../controllers/ProblemController')

router.route('/problem')
  .post(ProblemController.createProblem)

router.route('/problem/:problemId')
  .get(ProblemController.findProblem)

router.route('/problems/:contestId')
  .get(ProblemController.findProblems)

module.exports = router