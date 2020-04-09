const task = require('../models/task')

class MongoService {
  async findAllTasksAsync () {
    const tasks = await task.find()
    return tasks
  }

  async createTaskAsync (taskObject) {
    await task.create(taskObject)
  }

  async updateTaskAsync (taskObject) {
    console.log(taskObject)
    await task.updateOne({}, taskObject)
  }
}

module.exports = MongoService
