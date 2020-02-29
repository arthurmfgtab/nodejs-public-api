require('dotenv/config')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')
const app = express()

mongoose.connect(
    process.env.MONGO_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api', routes)

module.exports = app
