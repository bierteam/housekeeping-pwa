const express = require('express')
const router = express.Router()
const TaskService = require('../services/taskservice')

router.get('/', async function (req, res) {
  try {
    const taskService = new TaskService()
    const tasks = await taskService.findAllTasksAsync()
    res.status(200).json(tasks)
  } catch (error) {
    console.log(error)
    res.status(500).json('Something went wrong.')
  }
})

router.post('/', async function (req, res) {
  try {
    const taskFromBody = req.body
    const taskService = new TaskService(taskFromBody)
    const tasks = await taskService.createTaskAsync(taskFromBody)
    res.status(201).json(tasks)
  } catch (error) {
    console.log(error)
    res.status(500).json('Something went wrong')
  }
})

router.patch('/', async function (req, res) {
  try {
    const taskFromBody = req.body
    const taskService = new TaskService(taskFromBody)
    const tasks = await taskService.updateTaskAsync(taskFromBody)
    res.status(201).json(tasks)
  } catch (error) {
    console.log(error)
    res.status(500).json('Something went wrong')
  }
})

router.delete('/', async function (req, res) {
  try {
    const taskFromBody = req.body
    const taskService = new TaskService(taskFromBody)
    await taskService.deleteTaskAsync(taskFromBody)
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.status(500).json('Something went wrong')
  }
})

module.exports = router
