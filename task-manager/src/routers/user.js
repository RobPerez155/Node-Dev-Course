const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.post('/users', async (req, res) => { // /users is the endpoint
  const user = new User(req.body)

  try { //We are using try because without it, if there's an error the code will just stop, whereas with try we can still serve up our error response.
    await user.save()
      res.status(201).send(user)
  } catch(e) {
      res.status(400).send(e)
  }
})

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get('/users/:id', async (req, res) => {
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

router.patch('/users/:id', async (req, res) => {
  // Code needed to send a 400 code for when a user tries to update a property that cannot be change. like _id which can't be updated or height which doesn't exist.
  const updates = Object.keys(req.body) // Returns an array of strings, where each string is a property of our object
  const allowedUpdates = ['name', 'email', 'password', 'age'] // Specifies the properties that can be changed
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) // this will tell us if every single update can be found in allowed updates - this is written in the arrow function shorthand

    if (!isValidOperation) { // Here we are checking to see if "isValidOperation" is false 
      return res.status(400).send({ error: 'Invalid update!'})
    }

  try {
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true}) // new will return the new user as opposed to the existing one, Validators will make sure we don't take in garbage.
    const user = await User.findById(req.params.id)

    updates.forEach((update) => user[update] = req.body[update]) // This func. will run for each update that is being applied // bracket notation is used around the update variable so it can stay dynamic. // using dot notation would make it static

    await user.save() // this is waiting on our userSchema.pre('save') function in the /models/user file

    if (!user) { // If the id cannot be found this will happen 
      return res.status(404).send()
    }

    res.send(user) // If a user is found then their info will be returned.
  } catch (e) {
    res.status(400).send(e)
  }
})

router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
      return res.status(404).send()
    }

    res.send(user)
  } catch (e) {
    res.status(500).send()
  }
})


module.exports = router