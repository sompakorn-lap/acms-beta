const User = require('../models/User')

const login = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({
      ...req.body,
      active: true,
      online: false
    }, { online: true }, { new: true })
    if(!user){
      return res.status(404).json({ error: 'Something wrong' })
    }
    const { userId, role } = user
    const auth = { userId, role }
    const authToken = (Buffer.from(JSON.stringify(auth))).toString('base64')
    res.cookie('authToken', authToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.status(200).json({ userId, role })
  }
  catch (error) { res.status(500).json(error) }
}

const refresh = async (req, res) => {
  try {
    const cookies = req.cookies
    if(!cookies?.authToken) return res.status(401).json({ role: '' })
    const authToken = JSON.parse(Buffer.from(cookies.authToken, 'base64').toString())
    const user = await User.findOne(authToken)
    if(!user){
      return res.status(200).json({ role: '' })
    }
    const { userId, role } = user
    res.status(200).json({ userId, role })
  }
  catch (error) { res.status(500).json(error) }
}

const logout = async (req, res) => {
  try {
    const cookies = req.cookies
    if(!cookies?.authToken) return res.status(404).json({ error: 'Something wrong' })
    const authToken = JSON.parse(Buffer.from(cookies.authToken, 'base64').toString())
    // console.log(authToken)
    const user = await User.findOneAndUpdate({
      ...authToken,
      active: true,
      online: true
    }, { online: false }, { new: true })
    // console.log(user)
    if(!user){
      return res.status(404).json({ error: 'Something wrong' })
    }
    res.clearCookie('authToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    })
    res.status(200).json({ 'message': 'successful logout' })
  }
  catch (error) { res.status(500).json(error) }
}

module.exports = {
  login,
  refresh,
  logout
}