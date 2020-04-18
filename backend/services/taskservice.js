const Task = require('../models/task')

class TaskService {
  constructor (task) {
    this.task = task
  }

  async findAllTasksAsync () {
    const tasks = Task.find()
    return tasks
  }

  async createTaskAsync () {
    const task = await this.task.save()
    return task
  }

  async updateTaskAsync () {
    const _id = this.task._id
    const task = await Task.findOneAndUpdate({ _id }, this.task, { new: true })
    if (!task) {
      throw new Error('No task found, please provide a (valid) _id')
    }
    return task
  }

  async deleteTaskAsync () {
    const _id = this.task._id
    const task = await Task.deleteOne({ _id }, this.taskObject)
    if (task.deletedCount === 0) {
      throw new Error(`No task found with _id ${_id}`)
    }
  }
}

module.exports = TaskService
