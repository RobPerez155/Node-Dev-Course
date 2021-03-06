const characters = [
  {
      name: 'Luke Skywalker',
      height: 172,
      mass: 77,
      eye_color: 'blue',
      gender: 'male',
  },
  {
      name: 'Darth Vader',
      height: 202,
      mass: 136,
      eye_color: 'yellow',
      gender: 'male',
  },
  {
      name: 'Leia Organa',
      height: 150,
      mass: 49,
      eye_color: 'brown',
      gender: 'female',
  },
  {
      name: 'Anakin Skywalker',
      height: 188,
      mass: 84,
      eye_color: 'blue',
      gender: 'male',
  },
];

//***MAP***
//1. Get array of all names
const allNames = characters.map( (character) => character.name)

//2. Get array of all heights
const allHeights = characters.map ( (character) => character.height)

//3. Get array of objects with just name and height properties
const nameAndHeights = characters.map( (character) => [character.name, character.height])

//4. Get array of all first names
const firstNames = characters.map((character) => character.name.split(" ")[0])

//***REDUCE***
    // Here we are trying to iterate through an array to get some kind of ending result
    // We will use an acumulator pattern 
//1. Get total mass of all characters
const totMass = characters.reduce((accumulator, current) => {
  return accumulator + current.mass
}, 0)

//2. Get total height of all characters
const totHeight = characters.reduce((acc, cur) => acc + cur.height, 0)

//3. Get total number of characters by eye color
    // This is an example of exactly why one should ask deeper questions on whiteboarding challenges
      // How do you want the data returned
      // So you want to see there are x amount of blue eyes, y amount of yellow eyes...
const totByEyeColor = characters.reduce((acc, cur) => {
  const eyeColor = cur.eye_color
  if(acc[eyeColor]) { // if the accumulator already has a key of eyeColor, then we update the value for that eye_color
    acc[eyeColor]++
  } else { // else, if there is no key then add it and assign it the value of one
    acc[eyeColor] = 1
  }
  return acc
}, {}) // Here we start the count with an empty object

//4. Get total number of characters in all the character names
const totChar = characters.reduce((acc, cur) => acc + cur.name.length, 0) 

//***FILTER***
//1. Get characters with mass greater than 100
const greater100CharactersOld = characters.filter( (character) => {
  return character.mass > 100
})
// This can be shortened because we have a 1 line return
const greater100Characters = characters.filter( 
  (character) => character.mass > 100 )

//2. Get characters with height less than 200
const shorter200Character = characters.filter( 
  (character) => character.height < 200 )

//3. Get all male characters
const maleCharacter = characters.filter( (character) => character.gender == 'male')

//4. Get all female characters
const femaleCharacter = characters.filter( (character) => character.gender == 'female')

//***SORT***
    // function(A, B){return A - B}
    // if the result is Negative A is sorted before B
    // if the result is Positive B is sorted before A
//1. Sort by mass
const sortDescMass = characters.sort((a, b) => b.mass - a.mass)  // high to low
const sortAscMass = characters.sort((c, d) => c.mass - d.mass) // low to high

//2. Sort by height
const sortDescHeight = characters.sort( (a, b) => a.height - b.height)

//3. Sort by name
const sortDescName = characters.sort( (a, b) => {
  if(a.name < b.name) return -1         // Can't subtract strings
  return 1
})

//4. Sort by gender
const byGender = characters.sort((a) => {
  if(a.gender === 'female') return -1
  return 1
})

//***EVERY***
//1. Does every character have blue eyes?
const everyBlue = characters.every((character) => character.eye_color === 'blue')

//2. Does every character have mass more than 40?
const more40 = characters.every((character) => character.mass > 40)

//3. Is every character shorter than 200?
const shorter200 = characters.every((character) => character.height < 200)

//4. Is every character male?
const allMale = characters.every((character) => character.gender === 'male')


//***SOME***
//1. Is there at least one male character?
const oneMale = characters.some((character) => character.gender === 'male')

//2. Is there at least one character with blue eyes?
const blueEyes = characters.some((character) => character.eye_color === 'blue')

//3. Is there at least one character taller than 210?
const taller210 = characters.some((character) => character.height > 210)

//4. Is there at least one character that has mass less than 50?
const less50 = characters.some((character) => character.mass < 50)

// Traditional for loop
for (let i = 0; i < arr.length; i++) {
  // (Start here; Stop here; do after each)
}

// for of loop 
for (const e of arr) {
  // (Iterate each item e for the entire arr)
}

// forEach loop
arr.forEach(element => {
  // code we want to run for each element
  console.log(element)
});

// How to loop over an object, use .map or for in loop
for ( const key in object) {
  // This will iterate over each key in the object
}