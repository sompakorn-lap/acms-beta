const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
app.use(express.json({ limit: '3mb', extended: true }))
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))
app.use(cookieParser())

mongoose.set('strictQuery', true)
mongoose.connect(process.env.DATABASE_URI , {useNewUrlParser: true, useUnifiedTopology: true})

app.use('/api', require('./routes/ContestRoute'))
app.use('/api', require('./routes/ProblemRoute'))
app.use('/api', require('./routes/ImageRoute'))
app.use('/api', require('./routes/AuthRoute'))
app.use('/api', require('./routes/SubmissionRoute'))
app.use('/api', require('./routes/UserRoute'))
app.use('/api', require('./routes/ApplicationRoute'))
app.use('/api', require('./routes/TransactionRoute'))

app.use(express.static(`${__dirname}/dist`))

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`)
})

const port = 3000 || process.env.PORT
app.listen(port, () => { console.log(`running in port ${port}`) })