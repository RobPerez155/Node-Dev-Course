// To start server use "npm run dev" in the terminal. This is going to be the starting point for our app and where we will initiate our express server.
const express = require('express')
require('./db/mongoose') // This tells our app to run this file
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000 //part one is what we need to have in order to run our app on heroku and part two is how we have it run on our machine

// app.use((req, res, next) => { // next() is specific to registering middleware
//     res.status(503).send('This site is currently under maintenance.')
// })

app.use(express.json()) // Automatically parses incoming JSON to an object where we can access it using our req handlers
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})

const pet = {
  name: "hal"
}

pet.toJSON = function () {
  return {}
}

console.log(JSON.stringify(pet))