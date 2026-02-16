require('dotenv').config()
const mongoose = require('mongoose')

let cached = null

exports.conectarMongoDB = async () => {
  if (cached) return cached
  if (mongoose.connection.readyState === 1) {
    cached = mongoose.connection
    return cached
  }

  cached = await mongoose.connect(process.env.MONGODB_CONSTRING)
  return cached
}
