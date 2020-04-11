const { v4: uuid } = require('uuid')
const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid
  },
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: false
  },
  points: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true,
    lowercase: false
  },
  completed: {
    type: Boolean,
    required: true,
    default: false
  },
  completedDate: {
    type: Date,
    default: function () {
      if (this.completed) {
        return Date.now()
      }
    }
  }

  // TODO group/household
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
