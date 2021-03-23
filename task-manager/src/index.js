// This is going to be the starting point for our app and where we will initiate our express serve.
const express = require('express')
require('./db/mongoose') // This tells our app to run this file
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000 //part one is what we need to have in order to run our app on heroku and part two is how we have it run on our machine

app.use(express.json()) // This will automatically parse incoming JSON to an object where we can access it using our req handlers

//------------ Users ------------

app.post('/users', async (req, res) => { // /users is the endpoint
  const user = new User(req.body)

  try { //We are using try because without it, if there's an error the code will just stop, whereas with try we can still our error response.
    await user.save()
      res.status(201).send(user)
  } catch(e) {
      res.status(400).send(e)
  }
})

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (e) {
    res.status(500).send(e)
  }
})

app.get('/users/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const user = await User.findById(_id)

    if (!user) {
      return res.status(404).send()
    }

    res.send(user)
  } catch (e) {
    res.status(500).send()
  }
})

app.patch('/users/:id', async (req, res) => {
  // Code needed to send a 400 code for when a user tries to update a property that cannot be change. like _id which can't be updated or height which doesn't exist.
  const updates = Object.keys(req.body) // Returns an array of strings, where each string is a property of our object
  const allowedUpdates = ['name', 'email', 'password', 'age'] // Specifies the properties that can be changed
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) // this will tell us if every single update can be found in allowed updates - this is written in the arrow function shorthand

    if (!isValidOperation) { // Here we are checking to see if "isValidOperation" is false 
      return res.status(400).send({ error: 'Invalid update!'})
    }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true}) // new will return the new user as opposed to the existing one, Validators will make sure we don't take in garbage.

    if (!user) { // If the id cannot be found this will happen 
      return res.status(404).send()
    }

    res.send(user) // If a user is found then their info will be returned.
  } catch (e) {
    res.status(400).send(e)
  }
})



//------------ Tasks ------------

app.post('/tasks', async (req, res) => {
  const task = new Task(req.body)
  
  try{
    await task.save()
      res.status(201).send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({})
      res.send(tasks)
  } catch(e) {
    res.status(500).send()
  }
})

app.get('/tasks/:id', async (req, res) => {
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

app.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['completed', 'description']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid task!'})
  }
  
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators:true})
    
    if(!task) {
      res.status(404).send()
    }

    res.send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})

