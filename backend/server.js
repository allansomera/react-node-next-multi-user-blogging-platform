const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const dbConnect = require('./lib/db')
const path = require('node:path')

const cors = require('cors')

// require('dotenv').config()
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') })
// require('dotenv').config({ path: '.env.local' })
// require('dotenv').config()
// dotenv.config({ path: '.env.local' });
// dotenv.config();

//bring in routes

const blogRoutes = require('./routes/blog')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const server = express()

dbConnect()
server.use(morgan('dev'))
server.use(bodyParser())
server.use(cookieParser())

//cors
if (process.env.NODE_ENV === 'development') {
  server.use(cors({ origin: `${process.env.CLIENT_URL}` }))
}

//route middleware
server.use('/api', blogRoutes)
server.use('/api', authRoutes)
server.use('/api', userRoutes)

// server.get('/api', (req, res) => {
//   // console.log('db: ', process.env.MONGODB_URI)
//   // console.log('client: ', process.env.CLIENT_URL)
//   // console.log('process.env: ', process.env)
//   res.json({ time: Date().toString() })
// })

const port = process.env.PORT || 8000
server.listen(port, () => {
  console.log('running: ', process.env.FILE)
  console.log(`Server is running on port ${port}`)
})
