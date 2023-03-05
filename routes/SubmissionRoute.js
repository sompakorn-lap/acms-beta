const router = require('express').Router()
const SubmissionController = require('../controllers/SubmissionController')
const SubmitController = require('../controllers/SubmitController')

router.route('/submission/user/:userId/contest/:contestId/problem/:problemId')
  .get(SubmissionController.findSubmission)
  .put(SubmissionController.updateSubmission)

router.route('/submit/user/:userId/problem/:problemId')
  .put(SubmitController.submit)

router.route('/submissions')
  .get(SubmissionController.findSubmissions)

router.route('/rank')
  .get(SubmissionController.calculateRank)

module.exports = router