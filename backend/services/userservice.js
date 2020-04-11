const User = require('../models/user')

class UserService {
  async createUserAsync (user) {
    const newUser = new User(user)
    await newUser.save()
    const token = await newUser.generateAuthToken()
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
