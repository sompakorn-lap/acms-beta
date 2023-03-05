const Transaction = require('../models/Transaction')

const findTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne(req.params)
    if(!transaction){
      const newTransaction = new Transaction({
        ...req.params,
        payImageId: 'NoImage',
        slipImageId: 'NoImage',
        checked: false
      })
      await newTransaction.save()
      return res.status(200).json(newTransaction)
    }
    return res.status(200).json(transaction)
  }
  catch (error) { res.status(500).json(error) }
}

const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(req.params, req.body, { new: true })
    if(!transaction){
      return res.status(404).json({ error: 'Transaction not found' })
    }
    res.status(200).json(transaction)
  }
  catch (error) { res.status(500).json(error) }
}

module.exports = {
  findTransaction,
  updateTransaction
}