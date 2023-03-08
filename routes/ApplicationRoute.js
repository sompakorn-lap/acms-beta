const router = require('express').Router()
const ApplicationController = require('../controllers/ApplicationController')

router.route('/application/:userId')
  .get(ApplicationController.findApplications)
  .post(ApplicationController.createApplication)

router.route('/application/approve/:userId')
  .put(ApplicationController.approveApplications)

router.route('/application/active/:userId')
  .post(ApplicationController.activateAccount)

module.exports = router