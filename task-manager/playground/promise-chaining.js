require('../src/db/mongoose')
const User = require('../src/models/user')

User.findByIdAndUpdate('604e913bf5726527c83d8b71', { age: 30}).then((user) => {
  console.log(user)
  return User.countDocuments({ age:30})
}).then((result) => {
  console.log(result)
}).catch((e) => {
  console.log(e)
})