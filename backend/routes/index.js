const express = require('express')
const router = express.Router()
const task = require('./task')
const user = require('./user')
const jwtmiddleware = new (require('../middleware/jwtmiddleware'))()

router.all('*', jwtmiddleware.validateJwt.bind(jwtmiddleware))
router.use('/task', task)
router.use('/user', user)

module.exports = router
