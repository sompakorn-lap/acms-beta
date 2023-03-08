const Application = require('../models/Application')
const User = require('../models/User')
const MailSender = require('../utils/MailSender')
const crypto = require('crypto')

const createApplication = async (req, res) => {
  try {
    const application = new Application({
      ...req.params,
      ...req.body,
      checked: false
    })
    await application.save()

    const { order, email } = req.body
    if(order === 0){
      // console.log(order, email)
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

const activateAccount = async (req, res) => {
  try {
    const applications = await Application.find(req.params)
    const users = await User.find({ role: 'examinee' })
    const leader = applications.filter(({ order }) => order == 0)

    const text = await applications.filter(({ order}) => order != 0).reduce(async (str, { order, name }) => {
      const user = new User({
        userId: crypto.randomUUID(),
        username: `examinee${users.length.toLocaleString('en-US', { minimumIntegerDigits: 3 })}-${order}`,
        password: Math.random().toString(36).slice(2, 10),
        role: (order === 1) ? 'examinee' : 'spectator',
        active: true,
        online: false,
      })
      await user.save()

      const { username, password } = user
      return (await str) + `สำหรับ ${name}\nusername :${username}\npassword :${password}\n`
    }, '')
    // console.log(text, leader[0].email)
    await MailSender(leader[0].email, 'test', text)
  }
  catch (error) { res.status(500).json(error) }
}

module.exports = {
  createApplication,
  findApplications,
  approveApplications,
  activateAccount
}