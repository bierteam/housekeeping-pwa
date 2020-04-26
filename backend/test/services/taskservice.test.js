/* eslint-env jest */
const TaskService = require('../../services/taskservice')
const Task = require('../../models/task')

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('findAllTasksAsync returns tasks', async () => {
    // Arrange
    const mockObject = {
      completed: false,
      _id: '65a4a087-eeda-4bf1-8723-aef4f1e32031',
      name: 'Dishes',
      description: 'Do the fucking dishses!',
      points: 20,
      task: 'test'
    }
    Task.find = jest.fn().mockResolvedValue(mockObject)

    // Act
    const taskService = new TaskService()
    const tasks = await taskService.findAllTasksAsync()

    // Assert
    expect(tasks).toBe(mockObject)
  })

  test('createTaskAsync returns task on succes', async () => {
    // Arrange
    const mockObject = {
      completed: false,
      _id: '65a4a087-eeda-4bf1-8723-aef4f1e32031',
      name: 'Dishes',
      description: 'Do the fucking dishses!',
      points: 20,
      task: 'test'
    }
    const newTask = new Task(mockObject)
    newTask.save = jest.fn().mockResolvedValue(mockObject)

    // Act
    const taskService = new TaskService(newTask)
    const task = await taskService.createTaskAsync()

    // Assert
    expect(task).toBe(mockObject)
    expect(task._id).toBe(mockObject._id)
  })

  test('updateTaskAsync returns task on succes', async () => {
    // Arrange
    const mockObject = {
      completed: false,
      _id: '65a4a087-eeda-4bf1-8723-aef4f1e32031',
      name: 'Dishes',
      description: 'Do the fucking dishses!',
      points: 20,
      task: 'test'
    }
    const newTask = new Task(mockObject)
    newTask.save = jest.fn().mockResolvedValue(mockObject)

    // Act
    const taskService = new TaskService(newTask)
    const task = await taskService.updateTaskAsync()

    // Assert
    expect(task).toBe(mockObject)
    expect(task._id).toBe(mockObject._id)
  })

  test('updateTaskAsync throws error when to task is found', async () => {
    // Arrange
    const mockObject = {
      completed: false,
      _id: '65a4a087-eeda-4bf1-8723-aef4f1e32031',
      name: 'Dishes',
      description: 'Do the fucking dishses!',
      points: 20,
      task: 'test'
    }
    const newTask = new Task(mockObject)
    newTask.save = jest.fn().mockResolvedValue(null)

    // Act
    const taskService = new TaskService(newTask)
    try {
      // Act
      await taskService.updateTaskAsync()
      expect(true).toBe(false) // test failed
    } catch (error) {
      // Assert
      expect(error.message).toBe('No task found, please provide a (valid) _id')
    }
  })

  test('updateTaskAsync throws error when no task is found to be deleted', async () => {
    // Arrange
    const mockObject = {
      completed: false,
      _id: '65a4a087-eeda-4bf1-8723-aef4f1e32031',
      name: 'Dishes',
      description: 'Do the fucking dishses!',
      points: 20,
      task: 'test'
    }

    const emptyObject = {
      deletedCount: 0
    }
    const newTask = new Task(mockObject)
    Task.deleteOne = jest.fn().mockResolvedValue(emptyObject)

    // Act
    const taskService = new TaskService(newTask)
    try {
      // Act
      await taskService.deleteTaskAsync()
      expect(true).toBe(false) // test failed
    } catch (error) {
      // Assert
      expect(error.message).toBe(`No task found with _id ${mockObject._id}`)
    }
  })

  test('updateTaskAsync succes on delete', async () => {
    // Arrange
    const mockObject = {
      completed: false,
      _id: '65a4a087-eeda-4bf1-8723-aef4f1e32031',
      name: 'Dishes',
      description: 'Do the fucking dishses!',
      points: 20,
      task: 'test'
    }

    const notAnEmptyObject = {
      deletedCount: 1
    }
    const newTask = new Task(mockObject)
    Task.deleteOne = jest.fn().mockResolvedValue(notAnEmptyObject)

    // Act
    const taskService = new TaskService(newTask)
    try {
      // Act
      await taskService.deleteTaskAsync()
      expect(true).toBe(true)
    } catch (error) {
      // Assert
      expect(true).toBe(false)
    }
  })
})
