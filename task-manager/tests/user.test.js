const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('should signup a new user', async () => {
//await |request(app) from #1 & #2|.post request to create a user|.send({ our data})
  const response = await request(app)
  .post('/users')
  .send({
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

test('should upload avatar image', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)// Assigns a token to auth the tester
    .attach('avatar', 'tests/fixtures/profile-pic.jpg') // ('The form field we want to set', 'path to the file')
    .expect(200)

    // Asserts that binary data for the upload was saved as a buffer
    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer)) // .any is searching for any type of file, in this case Buffer, but can be used w/ String, Number, etc.
    // Using .toBe is akin ===. eg. 1 === 1 is true but {} === {} is false, because they are just two diff objects with the same properties.
    // Using .toEqual will compare the obj's properties to confirm if they are the same
})

test('should update valid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: 'PinkyPie'
    })
    .expect(200)

    // Asserting that the new user.name has been updated
    const user = await User.findById(userOneId)
    expect(user.name).toEqual('PinkyPie') // Must use toEqual because we are comparing obj properties
})

test('should not update invalid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      _id: 2
    }).expect(400)
})
