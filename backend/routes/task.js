const express = require('express')
const router = express.Router()
var MongoService = new (require('../services/mongoservice'))()

router.get('/', async function (req, res) {
  const someRandomTask = await MongoService.findAllTasksAsync()
  res.json(someRandomTask)
})

router.post('/', async function (req, res) {
  const taskFromBody = req.body
  await MongoService.createTaskAsync(taskFromBody)
  res.send()
})

module.exports = router
