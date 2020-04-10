const express = require('express')
const router = express.Router()
const UserService = new (require('../services/userservice'))()

router.post('/', async function (req, res) {
  try {
    const userFromBody = req.body
    const token = await UserService.createUserAsync(userFromBody)
    res.status(201).send({ token })
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post('/signin', async function (req, res) {
  // Login a registered user
  try {
    const { username, password } = req.body
    const token = await UserService.signInUserAsync(username, password)
    res.send(token)
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router
