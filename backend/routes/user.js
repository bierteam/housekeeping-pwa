const express = require('express')
const router = express.Router()
const UserService = new (require('../services/userservice'))()

router.post('/create', async function (req, res) {
  try {
    const userFromBody = req.body
    const token = await UserService.createUserAsync(userFromBody)
    res.status(201).json({ token })
  } catch (error) {
    console.log(error)
    res.status(500).json('Something went wrong, maybe the user already exists...')
  }
})

router.post('/signin', async function (req, res) {
  try {
    const { username, password } = req.body
    const token = await UserService.signInUserAsync(username, password)
    res.json({ token })
  } catch (error) {
    console.log(error)
    res.status(401).json('Error while logging in')
  }
})

module.exports = router
