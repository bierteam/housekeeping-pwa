const mongoose = require('mongoose')
const uuid = require('uuid/v4')

const taskSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid
  },
  task: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: false
  }
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
