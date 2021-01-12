const chalk = require('chalk') // This is an npm package
const getNotes = require('./notes.js') // This is our file
//The required file has to be assigned to a variable here in order to be used below

const msg = getNotes()
console.log(msg)

// console.log(validator.isEmail('pie@gmail.com'))
console.log(chalk.green.bold.inverse('Success!'))