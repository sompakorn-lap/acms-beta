const router = require('express').Router()
const AuthController = require('../controllers/AuthController')

router.route('/auth/login')
  .put(AuthController.login)

router.route('/auth/logout')
  .put(AuthController.logout)

router.route('/auth/refresh')
  .get(AuthController.refresh)

module.exports = router