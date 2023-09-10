const mongoose = require('mongoose')
require('dotenv').config()

// declare global {
//   var mongoose // This must be a `var` and not a `let / const`
// }

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(`mongodb://localhost:27017/test`, {
//       useNewUrlParser: true,
//     })
//     console.log(`MongoDB Connected: {conn.connection.host}`)
//   } catch (error) {
//     console.error(error.message)
//     process.exit(1)
//   }
// }

const dbConnect = async () => {
  if (cached.conn) {
    console.log('Cached mongodb is called!')
    return cached.conn
  }

  if (!cached.promise) {
    mongoose.set('strictQuery', true)
    cached.promise = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('connected to mongoDB!')
  }

  cached.conn = await cached.promise
  return cached.conn
}

module.exports = dbConnect
