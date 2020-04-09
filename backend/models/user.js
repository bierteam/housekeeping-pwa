// @ts-nocheck
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
    // @ts-ignore
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

userSchema.methods.generateAuthToken = async function () {
  const user = this
  // TODO make jwt expire
  await user.save()
  return jwt.sign({ username: user.username }, process.env.JWTSECRET)
}

userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username })
  if (!user) {
    console.log('Invalid login credentials')
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) {
    console.log('Invalid login credentials')
  }
  return jwt.sign({ username: user.username }, process.env.JWTSECRET)
}

const User = mongoose.model('User', userSchema)

module.exports = User
