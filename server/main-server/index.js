require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const projectRoute = require('./routes/project')

const authenticate = require('./middleware/auth')


const PORT = process.env.PORT || 9000

const app = express()

app.use(cors(
  {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  }
))

app.get('/', async (req, res) => {
    res.send({message: 'Main-Server'})
})


app.get('/health', (req, res) => {
  res.status(200).json({message: 'Server is healthy'})
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/auth', authRoute)
app.use('/user', authenticate, userRoute)
app.use('/project', authenticate, projectRoute)


app.listen(PORT, () => {
  console.log(`App is listening to PORT: ${PORT}`)
})