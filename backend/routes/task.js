const express = require('express')
const router = express.Router()
const TaskService = require('../services/taskservice')
const Task = require('../models/task')
const WorkFlowService = require('../services/workflowservice')

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
    const taskFromBody = new Task(req.body)
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
    const taskFromBody = new Task(req.body)
    const taskService = new TaskService(taskFromBody)
    const task = await taskService.updateTaskAsync()
    res.status(201).json(task)
  } catch (error) {
    console.log(error)
    res.status(500).json('Something went wrong')
  }
})

router.patch('/complete', async function (req, res) {
  try {
    const taskFromBody = new Task(req.body)
    const requester = req.user
    const workFlowService = new WorkFlowService(taskFromBody, requester)
    await workFlowService.completeTaskAsync()
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.status(500).json('Something went wrong')
  }
})

router.patch('/approve', async function (req, res) {
  try {
    const taskFromBody = new Task(req.body)
    const requester = req.user
    const workFlowService = new WorkFlowService(taskFromBody, requester)
    await workFlowService.approveTaskAsync()
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.status(500).json('Something went wrong')
  }
})

router.delete('/', async function (req, res) {
  try {
    const taskFromBody = new Task(req.body)
    const taskService = new TaskService(taskFromBody)
    await taskService.deleteTaskAsync(taskFromBody)
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.status(500).json('Something went wrong')
  }
})

module.exports = router
