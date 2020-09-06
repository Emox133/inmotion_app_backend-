const express = require('express')
const cors = require('cors')
// const morgan = require('morgan')

const path = require('path')
const app = express()
const globalErrorHandler = require('./controllers/errorController')
const userRouter = require('./routers/userRouter')
const postRouter = require('./routers/postRouter')

app.use(cors())

app.use(express.json())
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// Development middleware
// app.use(morgan('dev'))

// Routers
app.use('/api/v1/users', userRouter)
app.use('/api/v1/posts', postRouter)

app.use(globalErrorHandler)

module.exports = app