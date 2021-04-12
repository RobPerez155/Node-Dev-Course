const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')
const { response } = require('express')

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

beforeEach( async () => { // This will runn before each test case
  await User.deleteMany()
  await new User(userOne).save()
})

test('should signup a new user', async () => {
//await |request(app) from #1 & #2|.post request to create a user|.send({ our data})
  const response = await request(app).post('/users').send({
    name: 'Big Hungry Donkey',
    email: 'microdonk@gmail.com',
    password: 'SmartAss!'
  }).expect(201) // We are expecting a 201 status code

  // Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id) // If a user id cannot be found, user will return null 
  expect(user).not.toBeNull() // Here we want to user not to be null, otherwise our user wasn't saved to the database

  // Assertions about the response, making sure that our objects match
  expect(response.body).toMatchObject({ // This is asserting that the name, email, and token all match
    user: {
      name: 'Big Hungry Donkey',
      email: 'microdonk@gmail.com'
    },
    token: user.tokens[0].token
  })
  // Here we can make sure that the plain text password is not stored in the database
  expect(user.password).not.toBe('SmartAss!')
})

test('should login existing user', async () => {
  const response = await request(app).post('/users/login').send({
    email: userOne.email,
    password: userOne.password
  }).expect(200)

  const user = await User.findById(userOneId)
  expect(response.body.token).toBe(user.tokens[1].token)
})

test('should not login nonexistent user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: 'none@none.com',
      password: 'none'
  }).expect(400)
})
//
test('should get profile for user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`) // Here we are setting our authorization header
    .send()
    .expect(200)
})

test('should not get profile for unauthenticated user', async () => {
  await request(app)
  .get('/users/me')
  .send()
  .expect(401)
})

test('should delete account for user', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
    
})

test('should not delete account for unauthenticated user', async () => {
  await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})
