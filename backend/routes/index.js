const express = require('express')
const router = express.Router()

const health = require('./health')
const task = require('./task')

router.use('/health', health)
router.use('/task', task)

module.exports = router
