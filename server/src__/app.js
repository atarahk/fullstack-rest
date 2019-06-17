const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')
const mongoose = require('mongoose')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true
  })
)
app.use(bodyParser.json())
// connect to db
if (process.env.NODE_ENV === 'production') {
  mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
} else {
  mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true })
}

app.use('*', (req, res) =>
  res.status(404).json({
    message: 'Not Found. Use /api/ to access the backend side'
  })
)

export default app
