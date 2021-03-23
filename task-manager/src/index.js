// This is going to be the starting point for our app and where we will initiate our express serve.
const express = require('express')
require('./db/mongoose') // This tells our app to run this file
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000 //part one is what we need to have in order to run our app on heroku and part two is how we have it run on our machine

app.use(express.json()) // This will automatically parse incoming JSON to an object where we can access it using our req handlers
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})

