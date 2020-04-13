const User = require('../models/user')

class UserService {
  constructor (user) {
    this.newUser = user
  }

  async createUserAsync () {
    await this.newUser.save()
    const token = await this.newUser.generateAuthToken()
    return token
  }

  async signInUserAsync () {
    const user = await User.findByCredentials(this.newUser.username, this.newUser.password)
    if (!user) {
      throw new Error('Invalid username or password')
    }
    return user
  }
}

module.exports = UserService
