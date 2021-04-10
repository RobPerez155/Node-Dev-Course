const request = require('supertest')
const app = require('../src/app')

test('should sign up a new user', async () => {
//await |request(app) from #1 & #2|.post request to create a user|.send({ our data})
  await request(app).post('/users').send({
    name: 'Big Hungry Donkey',
    email: 'littleDonk@gmail.com',
    password: 'SmartAss!'
  }).expect(201) // We are expecting a 201 status code
})
