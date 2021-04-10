// To start server use "npm run dev" in the terminal. This is going to be the starting point for our app and where we will initiate our express server.
const app = require('./app') // Here we load in our Express app
const port = process.env.PORT // Define our port

app.listen(port, () => { 
  console.log(`Server is up on port ${port}`)
})