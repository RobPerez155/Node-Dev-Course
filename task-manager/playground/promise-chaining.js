require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('604e913bf5726527c83d8b71', { age: 30}).then((user) => {
//   console.log(user)
//   return User.countDocuments({ age: 30})
// }).then((result) => {
//   console.log(result)
// }).catch((e) => {
//   console.log(e)
// })

// Using async and await to avoid chaining
const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age }) // { age } is the es6 shorthand of { age: age }
  const count = await User.countDocuments({ age })
  return count
}

updateAgeAndCount('604e913bf5726527c83d8b71', 30).then((count) => {
  console.log(count)
}).catch((e) => {
  console.log(e)
})
