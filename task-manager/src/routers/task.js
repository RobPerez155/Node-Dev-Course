const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
  // const task = new Task(req.body)
  const task = new Task({ // This will create a task with all the task info and the owner attached to it
    ...req.body, // ... will copy all of the properties from body over to our new task object
    owner: req.user._id // This is coming from our auth file
  })
  
  try{
    await task.save()
      res.status(201).send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({})
      res.send(tasks)
  } catch(e) {
    res.status(500).send()
  }
})

router.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const task = await Task.findById(_id)
      if (!task) {
        return res.statusMessage(404).send()
      }
      res.send(task)
  }
    catch(e) {
    res.status(500).send()
  }
})

router.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['completed', 'description']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid task!'})
  }
  
  try {
    const task = await Task.findById(req.params.id)
    
    updates.forEach((update) => task[update] = req.body[update])
    await task.save()

    if(!task) {
      res.status(404).send()
    }

    res.send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)

    if (!task) {
      return res.status(404).send()
    }

    res.send(task)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router