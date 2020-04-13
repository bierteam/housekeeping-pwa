const task = require('../models/task')

class TaskService {
  async findAllTasksAsync () {
    const tasks = await task.find()
    return tasks
  }

  async createTaskAsync (taskObject) {
    const tasks = await task.create(taskObject)
    return tasks
  }

  async updateTaskAsync (taskObject) {
    const _id = taskObject._id
    if (!_id) {
      throw new Error('No object id.')
    }
    const tasks = await task.findOneAndUpdate({ _id }, taskObject, { new: true })
    return tasks
  }

  async deleteTaskAsync (taskObject) {
    const _id = taskObject._id
    if (!_id) {
      throw new Error('No object id.')
    }
    await task.deleteOne({ _id }, taskObject)
  }
}

module.exports = TaskService
