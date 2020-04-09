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

router.post('/login', async function (req, res) {
  // Login a registered user
  try {
    const { username, password } = req.body
    // @ts-ignore
    const user = await UserService.findByCredentials(username, password)
    console.log(user)
    if (!user) {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
    }
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router
