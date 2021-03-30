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

// GET /tasks?completed=true
router.get('/tasks', auth, async (req, res) => {
  const match = {}

  if (req.query.completed) { // req.query.completed refers to the object we get in #21 - { completed: 'true' }
    match.completed = req.query.completed === 'true' // We need to make req.query.completed equal to a string 'true', because our query returns a string and not a boolean 
  }

  try {
    await req.user.populate({
      path: 'tasks',
      match // Here we are using the property shorthand to call our object match from #23
    }).execPopulate() // This uses #58 in the User model
      res.send(req.user.tasks)
  } catch(e) {
    res.status(500).send()
  }
})

router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id

  try {
    const task = await Task.findOne({ _id, owner: req.user._id }) // Here we're giving two filters for findOne to use 
      if (!task) {
        return res.statusMessage(404).send()
      }
      res.send(task)
  }
    catch(e) {
    res.status(500).send()
  }
})

router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['completed', 'description']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid task!'})
  }
  
  try {
    const task = await Task.findOne({_id: req.params.id, owner: req.user._id}) // A task will only be found if the task Id exists, or if you are the creator})
    
    if(!task) {
      res.status(404).send()
    }

    updates.forEach((update) => task[update] = req.body[update])
    await task.save()

    res.send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({_id: req.params._id, owner: req.user._id}) // _id comes from params and owner comes from the User model
    
    if (!task) {
      return res.status(404).send()
    }

    res.send(task)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router