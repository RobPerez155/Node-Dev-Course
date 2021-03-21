require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('604e6de2b3fb4321c9176fe9').then((task) => {
//   console.log(task)
//   return Task.countDocuments({ completed: false })
// }).then((result) => {
//   console.log.log(result)
// }).catch((e) => {
//   console.log(e)
// })

// Here we have created our "Promise"
const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id)
  const count = await Task.countDocuments({ completed: false })
  return count
}

// Here we are consuming our "Promise"
deleteTaskAndCount('604e6de2b3fb4321c9176fe9').then((count) => {
  console.log(count)
}).catch((e) => {
  console.log(e)
})
// After this code is ran, then our promise is either "Fulfilled" or "Rejected", either way though the Promise is considered settled.