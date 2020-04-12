const UserService = require('../../services/userservice')
const User = require('../../models/user')

describe('UserService', () => {
  test('It should return a valid JWT', async () => {
    // Arrange
    const newUser = new User({ username: 'test', password: 'test' })
    newUser.save = jest.fn().mockResolvedValue({ test: 'test' })
    const userService = new UserService(newUser)

    // Act
    var jwt = await userService.createUserAsync({ username: 'test', password: 'test' })

    //Assert
    expect(jwt).toBeDefined()
    expect(jwt).toMatch(/^[A-Za-z0-9-_=]+.[A-Za-z0-9-_=]+.?[A-Za-z0-9-_.+/=]*$/) // regex checks if it's a valid jwt
  })
})
