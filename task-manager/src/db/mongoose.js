const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true
})

//mongoose.model('string name for the model',{definition - where we define all of the fields we want} )
//Here we are defining our model
// const User = mongoose.model('User', {
//   name: {
//     type: String
//     // Here we are using the constructor functions from JavaScript as the value for type
//   },
//   age: {
//     type: Number
//   }
// })

// // How we create an instance of our model
// const me = new User({
//   name: 'Rob',
//   age: 32
// })

// // Here we are saving the instance of our model to our database
// me.save().then(() => {
//   console.log(me)
// }).catch((error) => {
//   console.log('Error!', error)
// })

const Task = mongoose.model('Task', {
  description: {
    type: String
  },
  completed: {
    type: Boolean
  }
})

const task = new Task({
  description: 'Dust the roof',
  completed: false
})

task.save().then(() => {
  console.log(task)
}).catch((error) => {
  console.log('Error!', error)
})