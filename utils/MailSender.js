const axios = require('axios')

async function MailSender(receiver, title, message) {
  const data = JSON.stringify({
    'Messages': [{
      'From': {'Email': process.env.MAIL},
      'To': [{'Email': receiver}],
      'Subject': title,
      'TextPart': message
    }]
  })

  const config = {
    method: 'post',
    url: 'https://api.mailjet.com/v3.1/send',
    data: data,
    headers: {'Content-Type': 'application/json'},
    auth: {username: process.env.USERNAME_MAIL, password: process.env.PASSWORD_MAIL},
  }

  return axios(config)
    .then(function (response) {
      // console.log(JSON.stringify(response.data))
    })
    .catch(function (error) {
      console.log(error)
    })
}

module.exports = MailSender