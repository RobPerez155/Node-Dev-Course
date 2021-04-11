const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
  _id: userOneId,
  name: 'Huge Hungry Hippo',
  email: 'tinyDonk@gmail.com',
  password: 'SmartAss!',
  tokens: [{
    token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET) // Here we are assigning a new token
  }]
}

beforeEach( async () => { // This will runn before each test case
  await User.deleteMany()
  await new User(userOne).save()
})

test('should sign up a new user', async () => {
//await |request(app) from #1 & #2|.post request to create a user|.send({ our data})
  await request(app).post('/users').send({
    name: 'Big Hungry Donkey',
    email: 'microDonk@gmail.com',
    password: 'SmartAss!'
  }).expect(201) // We are expecting a 201 status code
})

test('should login existing user', async () => {
  await request(app).post('/users/login').send({
    email: userOne.email,
    password: userOne.password
  }).expect(200)
})

test('should not login nonexistent user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: 'none@none.com',
      password: 'none'
  }).expect(400)
})

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
})

test('should not delete account for unauthenticated user', async () => {
  await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})
