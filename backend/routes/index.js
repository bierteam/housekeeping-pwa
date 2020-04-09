const express = require('express')
const router = express.Router()

const health = require('./health')
const task = require('./task')
const user = require('./user')

router.use('/health', health)
router.use('/task', task)
router.use('/user', user)

module.exports = router
