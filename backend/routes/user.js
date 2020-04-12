const express = require('express')
const router = express.Router()
const UserService = require('../services/userservice')
const User = require('../models/user')

router.post('/create', async function (req, res) {
  try {
    const userFromBody = new User(req.body)
    const userService = new UserService(userFromBody)
    const token = await userService.createUserAsync(userFromBody)
    res.status(201).json({ token })
  } catch (error) {
    // TODO log error, send generic response
    res.status(400).json(error)
  }
})

router.post('/signin', async function (req, res) {
  try {
    const { username, password } = req.body
    const token = await UserService.signInUserAsync(username, password)
    res.json(token)
  } catch (error) {
    console.log(error)
    res.status(401).json('Error while logging in')
  }
})

module.exports = router
