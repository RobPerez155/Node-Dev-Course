const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId, //This says that the data stored in owner is going to be an ObjId
    required: true,
    ref: 'User' // User here refers to our User model
  }
}, {
  timestamps: true
})

taskSchema.pre('save', async function(next) {
  next()
})

const Task = mongoose.model('Task',taskSchema)

module.exports = Task