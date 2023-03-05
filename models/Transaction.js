const mongoose = require('mongoose')
const { Schema } = mongoose

const TransactionSchema = Schema({
  userId: String,
  payImageId: String,
  slipImageId: String,
  checked: Boolean
})

const Transaction = mongoose.model('transaction', TransactionSchema)

module.exports = Transaction