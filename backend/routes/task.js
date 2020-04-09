const express = require('express')
const router = express.Router()
var MongoService = new (require('../services/mongoservice'))()

router.get('/', async function (req, res) {
  const tasks = await MongoService.findAllTasksAsync()
  res.json(tasks)
})

router.post('/', async function (req, res) {
  const taskFromBody = req.body
  await MongoService.createTaskAsync(taskFromBody)
  res.send()
})

router.put('/', async function (req, res) {
  const taskFromBody = req.body
  await MongoService.updateTaskAsync(taskFromBody)
  res.send()
})

module.exports = router
