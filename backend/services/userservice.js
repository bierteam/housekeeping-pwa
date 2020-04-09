const User = require('../models/user')

class UserService {
  async createUserAsync (user) {
    // @ts-ignore
    const newUser = new User(user)
    await newUser.save()
    // @ts-ignore
    const token = await newUser.generateAuthToken()
    return token
  }
}

module.exports = UserService
