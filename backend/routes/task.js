const express = require('express')
const router = express.Router()
const task = require('../models/task')

router.get('/', async function (req, res) {
  const someRandomTask = await task.findOne()
  res.json(someRandomTask)
})

module.exports = router
