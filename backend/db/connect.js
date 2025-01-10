import mongoose from 'mongoose'
// const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose.connect(url)
}

// module.exports = connectDB
export default connectDB
