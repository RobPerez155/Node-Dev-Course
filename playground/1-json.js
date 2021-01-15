//STORING DATA WITH JSON
//JSON is the string representation of an object
const fs = require('fs')

//1. Load and Parse JSON data
const dataBuffer = fs.readFileSync('1-json.json')
// console.log(dataBuffer) -> reads the file and returns the code back to us in binary data
const dataJSON = dataBuffer.toString() //Converts the binary data into a string
const user = JSON.parse(dataJSON) // Parses the JSON data into an object we can edit/change
console.log(user) // Here we can access parts of the object we just assigned the json data to

//2. Change the name and age property
user.name = 'Robert'
user.age = 32

//3. Stringify the changed object and overwrite the original data
const userJSON = JSON.stringify(user)
fs.writeFileSync('1-json.json', userJSON)