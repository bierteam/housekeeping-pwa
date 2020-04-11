const express = require('express')
const router = express.Router()
const MongoService = new (require('../services/mongoservice'))()

router.get('/', async function (req, res) {
  const tasks = await MongoService.findAllTasksAsync()
  res.json(tasks)
})

router.post('/', async function (req, res) {
  const taskFromBody = req.body
  await MongoService.createTaskAsync(taskFromBody)
  res.json()
})

router.put('/', async function (req, res) {
  const taskFromBody = req.body
  await MongoService.updateTaskAsync(taskFromBody)
  res.json()
})

module.exports = router
