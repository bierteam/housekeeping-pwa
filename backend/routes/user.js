const express = require('express')
const router = express.Router()
const UserService = new (require('../services/userservice'))()

router.post('/create', async function (req, res) {
  try {
    const userFromBody = req.body
    const token = await UserService.createUserAsync(userFromBody)
    res.status(201).send({ token })
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post('/signin', async function (req, res) {
  try {
    const { username, password } = req.body
    const token = await UserService.signInUserAsync(username, password)
    res.send(token)
  } catch (error) {
    console.log(error)
    res.status(401).send('Error while logging in')
  }
})

module.exports = router
