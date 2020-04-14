const express = require('express')
const router = express.Router()
const UserService = require('../services/userservice')
const User = require('../models/user')

router.post('/create', async function (req, res) {
  try {
    const userFromBody = new User(req.body)
    const userService = new UserService(userFromBody)
    const token = await userService.createUserAsync()
    res.status(201).json(token)
  } catch (error) {
    console.log(error)
    res.status(500).json('Something went wrong, maybe the user already exists...')
  }
})

router.post('/signin', async function (req, res) {
  try {
    const userFromBody = new User(req.body)
    const userService = new UserService(userFromBody)
    const token = await userService.signInUserAsync()
    res.json(token)
  } catch (error) {
    console.log(error)
    res.status(401).json('Error while logging in')
  }
})

router.get('/refresh', async function (req, res) {
  try {
    // TODO check for cookie with refresh token
    // if token is valid, return JWT and new refresh token cookie
    res.send('To be implemented.')
  } catch (error) {
    console.log(error)
    res.status(401).json('No refresh token send.')
  }
})

router.delete('/logout', async function (req, res) {
  try {
    // TODO delete refresh token
    res.send('To be implemented.')
  } catch (error) {
    console.log(error)
    res.status(401).json('No refresh token send.')
  }
})

router.delete('/logoutall', async function (req, res) {
  try {
    // TODO delete all refresh tokens
    res.send('To be implemented.')
  } catch (error) {
    console.log(error)
    res.status(401).json('No refresh token send.')
  }
})

module.exports = router
