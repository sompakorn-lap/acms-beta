const User = require('../models/User')
const crypto = require('crypto')

const createUser = async (req, res) => {
  try {
    const { username, role } = req.body

    const user = new User({
      userId: crypto.randomUUID(),
      username: username,
      password: Math.random().toString(36).slice(2, 10),
      role: role,
      active: true,
      online: false,
    })
    await user.save()
    res.status(200).json(user)
  }
  catch (error) { res.status(500).json(error) }
}

const updateUser = async (req, res) => {
  try {
    const user = User.findOneAndUpdate(req.params, req.body)
    if(!user){
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json(user)
  }
  catch (error) { res.status(500).json(error) }
}

const findUser = async (req, res) => {
  try {
    const user = await User.findOne(req.params)
    if(!user){
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json(user)
  }
  catch (error) { res.status(500).json(error) }
}

const findUsers = async (req, res) => {
  try {
    const users = await User.find(req.query)
    res.status(200).json(users)
  }
  catch (error) { res.status(500).json(error) }
}

module.exports = {
  createUser,
  findUser,
  findUsers,
  updateUser
}