// This is going to be the starting point for our app and where we will initiate our express serve.
const express = require('express')

const app = express()
const port = process.env.PORT || 3000 //part one is what we need to have in order to run our app on heroku and part two is how we have it run on our machine

app.post('/users',(req, res) => {
  res.send('testing!')
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})

