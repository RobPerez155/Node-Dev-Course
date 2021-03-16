const mongoose = require('mongoose')
const validator = require('validator')

// mongoose.model('string name for the model',{definition - where we define all of the fields we want} )
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

module.exports = User