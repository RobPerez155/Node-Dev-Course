// This is going to be the starting point for our app and where we will initiate our express serve.
const express = require('express')
require('./db/mongoose') // This tells our app to run this file
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000 //part one is what we need to have in order to run our app on heroku and part two is how we have it run on our machine

app.use(express.json()) // This will automatically parse incoming JSON to an object where we can access it using our req handlers

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

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})

