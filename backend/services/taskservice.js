const Task = require('../models/task')

class TaskService {
  constructor (task) {
    this.task = task
  }

  async findAllTasksAsync () {
    const tasks = await Task.find()
    return tasks
  }

  async findTaskAsync () {
    const _id = this.task._id
    const task = await Task.findOne({ _id })
    return task
  }

  async createTaskAsync () {
    const task = await this.task.save()
    return task
  }

  async updateTaskAsync () {
    this.task.isNew = false
    const updatedTask = await this.task.save({ new: true })
    if (!updatedTask) {
      throw new Error('No task found, please provide a (valid) _id')
    }
    return updatedTask
  }

  async deleteTaskAsync () {
    const _id = this.task._id
    const task = await Task.deleteOne({ _id }, this.taskObject)
    if (task.deletedCount === 0) {
      throw new Error(`No task found with _id ${_id}`)
    }
  }

  async completeTaskAsync (id) {
    const updatedTask = await Task.findOneAndUpdate({ id }, { completed: true, completedBy: this.task.completedBy }, { new: true })
    if (!updatedTask) {
      throw new Error('No task found, please provide a (valid) _id')
    }
    return updatedTask
  }

  async approveTaskAsync (id) {
    const updatedTask = await Task.findOneAndUpdate({ id }, { approved: true, approvedBy: this.task.approvedBy }, { new: true })
    if (!updatedTask) {
      throw new Error('No task found, please provide a (valid) _id')
    }
    return updatedTask
  }
}

module.exports = TaskService
