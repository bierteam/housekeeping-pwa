const express = require('express')
const router = express.Router()
const UserService = require('../services/userService')
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

module.exports = router
