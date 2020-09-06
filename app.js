const express = require('express')
const cors = require('cors')
<<<<<<< HEAD
const morgan = require('morgan')
=======
// const morgan = require('morgan')
>>>>>>> 25421610e2622a0447bb2a9970c970fcf36693eb
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
<<<<<<< HEAD
app.use(morgan('dev'))
=======
// app.use(morgan('dev'))
>>>>>>> 25421610e2622a0447bb2a9970c970fcf36693eb

// Routers
app.use('/api/v1/users', userRouter)
app.use('/api/v1/posts', postRouter)

app.use(globalErrorHandler)

module.exports = app