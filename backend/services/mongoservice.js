const task = require('../models/task')

class MongoService {
  async findAllTasksAsync () {
    const tasks = await task.find()
    return tasks
  }

  async createTaskAsync (taskObject) {
    task.create(taskObject)
  }
}

module.exports = MongoService
