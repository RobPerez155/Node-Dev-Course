const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true
})

// mongoose.model('string name for the model',{definition - where we define all of the fields we want} )
// Here we are defining our model
const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true
    // Here we are using the constructor functions from JavaScript as the value for type
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      // use of email validator is documented here https://www.npmjs.com/package/validator
      if(!validator.isEmail(value)){
        throw new Error('Email is invalid')
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be more than 0.')
      } 
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain "password"')
      }
    }
  }
})

// How we create an instance of our model
const me = new User({
  name: 'Rob',
  email: "robert.perez.psirho@gmail.com",
  age: 32,
  password: 'billybobswineshack'
})

// Here we are saving the instance of our model to our database
me.save().then(() => {
  console.log(me)
}).catch((error) => {
  console.log('Error!', error)
})

const Task = mongoose.model('Task', {
  description: {
    type: String,
    trim: true,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
})

const task = new Task({
  description: 'Dust the grandma'
})

task.save().then(() => {
  console.log(task)
}).catch((error) => {
  console.log('Error!', error)
})