const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({ // Here is where create the properties for our User model. Doing it this way will allow us to use Middleware like bcrypt
  name: {
    type: String,
    required: true,
    trim: true
    // Here we are using the constructor functions from JavaScript as the value for type
  },
  email: {
    type: String,
    unique: true,
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

userSchema.statics.findByCredentials = async (email, password) => { // This option will be called in the user router
  const user = await User.findOne({ email }) // here we are using the shorthand to find an a user with an email property that matches the email given to us - ({email: email})

  if (!user) {
    throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Unable to login')
  }

  return user
}

// Hash the plain text password before saving
userSchema.pre('save', async function(next) {
  const user = this // this is equal to the document being save, in this case userSchema

  if (user.isModified('password')) { //Here we are checking if the password has been modified. This will be true if the user is first created or if password is the item being changed. 
  // This prevents us from double-hashing a password.
    user.password = await bcrypt.hash(user.password, 8)
  }

  next() // this tells our function when it's complete
})

const User = mongoose.model('User', userSchema) // mongoose.model('string name for the model', schemaName (- where all of our properties are kept) )

module.exports = User