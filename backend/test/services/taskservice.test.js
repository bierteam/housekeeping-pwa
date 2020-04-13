/* eslint-env jest */
const TaskService = require('../../services/taskservice')
const Task = require('../../models/task')

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('findAllTasksAsync returns shit', async () => {
    // Arrange
    const mockObject = [{
      completed: false,
      _id: '65a4a087-eeda-4bf1-8723-aef4f1e32031',
      name: 'Diushes3',
      description: 'Do the fucking dishses!',
      points: 20,
      task: 'test'
    }]
    Task.find = jest.fn().mockResolvedValue(mockObject)

    // Act
    const taskService = new TaskService()
    const tasks = await taskService.findAllTasksAsync()

    // Assert
    expect(tasks).toBe(mockObject)
  })
})
