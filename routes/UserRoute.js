const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.route('/user')
  .get(UserController.findUsers)
  .post(UserController.createUser)

router.route('/user/:userId')
  .get(UserController.findUser)
  .put(UserController.updateUser)

module.exports = router