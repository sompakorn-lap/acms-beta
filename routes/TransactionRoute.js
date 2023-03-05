const router = require('express').Router()
const TransactionController = require('../controllers/TransactionController')

router.route('/transaction/:userId')
  .get(TransactionController.findTransaction)
  .put(TransactionController.updateTransaction)

module.exports = router