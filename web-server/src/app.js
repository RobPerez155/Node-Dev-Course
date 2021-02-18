const express = require('express')

const app = express()

// app.com
app.get('', (req, res) => { // This method takes two arguments, the route and a function. 
//The function gets called with 2 arguments, req(request) and the res(response)
  res.send('<h1>Hello express!</h1>') // We can send back HTML
})
// app.com/help
app.get('/help', (req, res) => {
  res.send([{
    name: 'Robert',
    age: 32
  }, {
    name: 'Kat',
    age: 35
  }]) // We can send back 1 JSON object or an array of JSON objects
})

// app.com/about
app.get('/about', (req, res) => {
  res.send('<h1>About Page</h1>')
})

// app.com/weather
app.get('/weather', (req, res) => {
  res.send({
    forecast: 'It\'s gonna rain!',
    location: 'Tempe, AZ'
  })
})

app.listen(3000, () => {
  console.log('This code was ran asynchronously when the server was started')
})  //This is what we need to start up the server, 3000 is the port number we'll use