const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
// const { response } = require('express')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
  _id: userOneId,
  name: 'Huge Hungry Hippo',
  email: 'tinydonk@gmail.com',
  password: 'SmartAss!',
  tokens: [{
    token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET) // Here we are assigning a new token
  }]
}

const setupDatabase = async () => {
  await User.deleteMany()
  await new User(userOne).save()
}

module.exports = {
  userOneId,
  userOne,
  setupDatabase
}