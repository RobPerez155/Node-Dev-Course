// This is going to be the starting point for our app and where we will initiate our express serve.
const express = require('express')
require('./db/mongoose') // This tells our app to run this file
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000 //part one is what we need to have in order to run our app on heroku and part two is how we have it run on our machine

app.use(express.json()) // This will automatically parse incoming JSON to an object where we can access it using our req handlers

app.post('/users',(req, res) => { // /users is the endpoint
  const user = new User(req.body)

  user.save().then(() => {
    res.status(201).send(user)
  }).catch((e) => {
    res.status(400).send(e) // We can daisy chain our method calls
  })
})

app.get('/users', (req, res) => {
  User.find({}).then((users) => {
    res.send(users)
  }).catch((e) => {
    res.status(500).send(e)
  })
})

app.get('/users/:id', (req, res) => {
  const _id = req.params.id

  User.findById(_id).then((user) => {
    if (!user) {
      return res.status(404).send()
    }
    res.send(user)
  }).catch((e) => {
    res.status(500).send(e)
  })
})

app.post('/tasks', (req, res) => {
  const task = new Task(req.body)
  task.save().then(() => {
    res.status(201).send(task)
  }).catch((e) => {
    res.status(400).send(e)
  })
})

app.get('/tasks', (req, res) => {
  Task.find({}).then((tasks) => {
    res.send(tasks)
  }).catch((e) => {
    res.status(500).send()
  })
})

app.get('/tasks/:id', (req, res) => {
  const _id = req.params.id

  Task.findById(_id).then((task) => {
    if (!task) {
      return res.status(404).send()
    }
    res.send(task)
  }).catch((e) => {
    res.status(500).send()
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})

