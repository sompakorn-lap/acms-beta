const Application = require('../models/Application')
const User = require('../models/User')
const Image = require('../models/Image')
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
      const user = await User.findOne(req.params)
      const { username, password } = user
      await MailSender(email, 'แจ้งชื่อผู้ใช้งานและรหัสผ่านสำหรับชำระเงิน', `ชื่อผู้ใช้งาน :${username}\nรหัสผ่าน :${password}`)
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

const deleteApplications = async (req, res) => {
  try {
    const applications = await Application.find(req.params)
    for(const application of applications){
      const { transcriptionImageId, identityCardImageId } = application
      if(transcriptionImageId !== 'NoImage'){
        const image = await Image.findOneAndDelete({ imageId: transcriptionImageId })
        // console.log(transcriptionImageId, 'is deleted')
      }
      if(identityCardImageId !== 'NoImage'){
        const image = await Image.findOneAndDelete({ imageId: identityCardImageId })
        // console.log(identityCardImageId, 'is deleted')
      }
    }
    await Application.deleteMany(req.params)
    await User.findOneAndDelete(req.params)
    res.status(200).json('applications are deleted')
  }
  catch (error) { res.status(500).json(error) }
}

const activateAccount = async (req, res) => {
  // console.log('test')
  try {
    const applications = await Application.find(req.params)
    const users = await User.find({ role: 'examinee' })
    const leader = applications.filter(({ order }) => order == 0)

    const text = await applications.filter(({ order}) => order != 0).reduce(async (str, { order, name }) => {
      const user = new User({
        userId: crypto.randomUUID(),
        username: `simsat${users.length.toLocaleString('en-US', { minimumIntegerDigits: 3 })}-${order}`,
        password: Math.random().toString(36).slice(2, 10),
        role: (order === 1) ? 'examinee' : 'spectator',
        active: true,
        online: false,
      })
      await user.save()

      const { username, password } = user
      return (await str) + `สำหรับ ${name}\nชื่อผู้ใช้งาน :${username}\nรหัสผ่าน :${password}\n`
    }, '')
//     res.send(text)
    await MailSender(leader[0].email, 'แจ้งชื่อผู้ใช้งานและรหัสผ่านสำหรับเข้าสอบ', text)
  }
  catch (error) { res.status(500).json(error) }
}

module.exports = {
  createApplication,
  findApplications,
  deleteApplications,
  approveApplications,
  activateAccount
}
