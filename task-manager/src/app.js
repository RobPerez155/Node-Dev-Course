// This file sets up the Express application and exports the app
// This is where we will test are app from
const express = require('express')
require('./db/mongoose') // This tells our app to run this file
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

app.use(express.json()) // Automatically parses incoming JSON to an object where we can access it using our req handlers
app.use(userRouter)
app.use(taskRouter)

module.exports = app

// Multer Notes
// const multer = require('multer')
// const upload = multer({
//   dest: 'images',
//   limits: {
//     fileSize: 1000000, // Measures in bytes and an Mbyte is 1 million bytes
//   },
//   fileFilter(req, file, cb) { // (REQuest being made, info on the FILE being uploaded, CB tells multer when we're done filtering)
//     if (!file.originalname.match(/\.(doc|docx)$/)){ // if not a file that matches throw an error
//       return cb(new Error('Please upload a Word document'))
//     }

//     cb(undefined, true)
//     // cb(new Error('Error Description')) // this is how we set up an error response
//     // cb(undefined, true) // We use 'undefined' as the first argument, saying that nothing went wrong. Then 'true' if the upload is expected
//     // cb(undefined, false) // This silently rejects the upload
//   }
// })
// // app.post('/upload', upload.single('upload'), (req, res) => { // upload.single is telling multer look for a key called upload.
// //   res.send()
// // })

// app.post('/upload', upload.single('upload'), (req, res) => { // upload.single is telling multer look for a key called upload.
//   res.send() // This happens when things go well with our middleware
// }, (error, req, res, next) => { // This is for when we get an error, we need all 4 arguments in order to for Express to know this is our error handler
//   res.status(400).send({ error: error.message })
// })}

