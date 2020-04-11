const express = require('express')
const router = express.Router()
const MongoService = new (require('../services/mongoservice'))()

router.get('/', async function (req, res) {
  try {
    const tasks = await MongoService.findAllTasksAsync()
    res.status(200).json({ tasks })
  } catch (error) {
    console.log(error)
    res.status(500).json('Something went wrong.')
  }
})

router.post('/', async function (req, res) {
  try {
    const taskFromBody = req.body
    const tasks = await MongoService.createTaskAsync(taskFromBody)
    res.status(201).json({ tasks })
  } catch (error) {
    console.log(error)
    res.status(500).json('Something went wrong')
  }
})

router.put('/', async function (req, res) {
  try {
    const taskFromBody = req.body
    const tasks = await MongoService.updateTaskAsync(taskFromBody)
    res.status(201).json({ tasks })
  } catch (error) {
    console.log(error)
    res.status(500).json('Something went wrong')
  }
})

module.exports = router

// try {
//   const userFromBody = req.body
//   const token = await UserService.createUserAsync(userFromBody)
//   res.status(201).json({ token })
// } catch (error) {
//   console.log(error)
//   res.status(500).json('Something went wrong, maybe the user already exists...')
// }