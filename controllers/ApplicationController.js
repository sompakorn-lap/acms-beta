const Application = require('../models/Application')
const User = require('../models/User')
const MailSender = require('../utils/MailSender')

const createApplication = async (req, res) => {
  try {
    const application = new Application({
      ...req.params,
      ...req.body,
      checked: false
    })
    await application.save()

    const { order, email } = req.body
    if(order === 1){
      console.log(order, email)
      const user = await User.findOne(req.params)
      const { username, password } = user
      await MailSender(email, 'test', `username :${username}\npassword :${password}`)
    }
    
    res.status(201).json(application)
  }
  catch (error) { res.status(500).json(error) }
}

const findApplications = async (req, res) => {
  try {
    const applications = await Application.find(req.params)
    res.status(200).json(applications)
  }
  catch (error) { res.status(500).json(error) }
}

const approveApplications = async (req, res) => {
  try {
    const applications = await Application.updateMany(req.params, { checked: true })
    res.status(200).json(applications)
  }
  catch (error) { res.status(500).json(error) }
}

module.exports = {
  createApplication,
  findApplications,
  approveApplications
}