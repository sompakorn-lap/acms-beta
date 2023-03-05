const router = require('express').Router()
const ContestController = require('../controllers/ContestController')

router.route('/contest')
  .get(ContestController.findContests)
  .post(ContestController.createContest)

router.route('/contest/:contestId')
  .get(ContestController.findContest)

module.exports = router