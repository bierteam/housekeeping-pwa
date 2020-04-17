/* eslint-env jest */
const UserService = require('../../services/userService')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')

describe('UserService', () => {
  beforeEach(() => {
    process.env.JWTSECRET = 'Somesecuresecret'
    jest.clearAllMocks()
  })

  test('createUserAsync should return a valid JWT', async () => {
    // Arrange
    const newUser = new User({ username: 'test', password: 'test' })
    newUser.save = jest.fn().mockResolvedValue({ test: 'test' })
    const userService = new UserService(newUser)

    // Act
    const token = await userService.createUserAsync({ username: 'test', password: 'test' })

    // Assert
    expect(token).toMatch(/^[A-Za-z0-9-_=]+.[A-Za-z0-9-_=]+.?[A-Za-z0-9-_.+/=]*$/) // regex checks if it's a valid jwt
  })

  test('createUserAsync the returned JWT should contain the username and _id of the newly created user', async () => {
    // Arrange
    const newUser = new User({ username: 'test', password: 'test', _id: 'fictional id' })
    newUser.save = jest.fn().mockResolvedValue({ test: 'test' })
    const userService = new UserService(newUser)

    // Act
    const token = await userService.createUserAsync({ username: 'test', password: 'test' })
    const claims = jwt.verify(token, process.env.JWTSECRET)

    // Assert
    expect(claims.username).toBe(newUser.username)
    expect(claims._id).toBe(newUser._id)
  })

  test('signInUserAsync should return a valid JWT', async () => {
    // Arrange
    const newUser = new User({ username: 'test', password: 'test', _id: 'fictional id' })
    const mockingToken = await newUser.generateAuthToken()
    User.findByCredentials = jest.fn().mockResolvedValue(mockingToken)
    const userService = new UserService(newUser)

    // Act
    const token = await userService.signInUserAsync()

    // Assert
    expect(token).toBe(mockingToken)
  })

  test('signInUserAsync the returned JWT should contain the username and _id of the newly created user', async () => {
    // Arrange
    const newUser = new User({ username: 'test', password: 'test', _id: 'fictional id' })
    const mockingToken = await newUser.generateAuthToken()
    User.findByCredentials = jest.fn().mockResolvedValue(mockingToken)
    const userService = new UserService(newUser)

    // Act
    const token = await userService.signInUserAsync()
    const claims = jwt.verify(token, process.env.JWTSECRET)

    // Assert
    expect(claims.username).toBe(newUser.username)
    expect(claims._id).toBe(newUser._id)
  })

  test('signInUserAsync throws an error when no user is found', async () => {
    // Arrange
    const newUser = new User({ username: 'test', password: 'test', _id: 'fictional id' })
    User.findByCredentials = jest.fn().mockResolvedValue(null)
    const userService = new UserService(newUser)

    try {
      // Act
      await userService.signInUserAsync()
      expect(true).toBe(false) // test failed
    } catch (error) {
      // Assert
      expect(error.message).toBe('Invalid username or password')
    }
  })
})
