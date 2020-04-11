const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

router.get('/', function (req, res) {
  // TODO add more health checks

  // https://mongoosejs.com/docs/api.html#connection_Connection-readyState
  if (mongoose.connection.readyState === 1) {
    res.sendStatus(200)
  } else {
    res.sendStatus(503)
  }
})

module.exports = router
