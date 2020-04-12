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

  async signInUserAsync (username, password) {
    const user = await User.findByCredentials(username, password)
    if (!user) {
      // Todo error handling
      return
    }
    return user
  }
}

module.exports = UserService
