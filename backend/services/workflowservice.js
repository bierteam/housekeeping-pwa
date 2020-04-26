const TaskService = require('./taskservice')
const UserService = require('./userservice')

class WorkflowService {
  constructor (task, requester) {
    this.task = task
    this.taskService = new TaskService(this.task)
    this.requester = requester
    this.userService = new UserService(this.requester)
  }

  async completeTaskAsync () {
    if (!this.task.completed && this.task.approved) {
      throw new Error('Task is not completed or already approved')
    }
    const oldTask = await this.taskService.findTaskAsync()
    if (oldTask.completed) {
      throw new Error('Task already completed')
    }
    this.task.completedBy = this.requester._id
    const updatedTask = await this.taskService.completeTaskAsync()
    return updatedTask
  }

  async approveTaskAsync () {
    if (!this.task.completed && !this.task.approved) {
      throw new Error('Task is not completed or already approved')
    }
    const currentTask = await this.taskService.findTaskAsync()
    if (currentTask.approved) {
      throw new Error('Task already approved')
    }
    const currentRequesterId = this.requester._id
    await this._checkIfRequesterCanApprove(currentTask.completedBy, currentRequesterId)
    this.task.approvedBy = this.requester._id
    const approvedTask = this.taskService.approveTaskAsync()
    return approvedTask
  }

  async _checkIfRequesterCanApprove (currentTaskCompletedBy, currentRequesterId) {
    if (currentTaskCompletedBy === currentRequesterId) {
      throw new Error(`User id ${currentRequesterId} is not allowed to approve task id ${currentTaskCompletedBy}`)
    }
    return true
  }
}

module.exports = WorkflowService
