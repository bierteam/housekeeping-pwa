const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minLength: 7
  }
})

userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

userSchema.methods.generateAuthToken = async function () {
  const user = this
  return jwt.sign({ 
    username: user.username,
    exp: Math.floor(Date.now() / 1000) + (60 * 60) // expires in 1h
  }, process.env.JWTSECRET)
}

userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username })
  if (!user) {
    throw new Error('Invalid login credentials')
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) {
    throw new Error('Invalid login credentials')
  }
  return user.generateAuthToken()
}

const User = mongoose.model('User', userSchema)

module.exports = User
