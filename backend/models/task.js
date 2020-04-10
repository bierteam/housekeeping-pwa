const mongoose = require('mongoose')
const uuid = require('uuid/v4')

const taskSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid
  },
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: false
  },
  points: {
    type: Number,
    unique: false,
    required: true,
    trim: true,
    lowercase: false
  },
  description: {
    type: String,
    unique: false,
    required: true,
    trim: true,
    lowercase: false
  },
  completed: {
    type: Boolean,
    unique: false,
    required: true,
    trim: true,
    lowercase: false
  }
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
