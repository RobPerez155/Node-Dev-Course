//Repeat  - 
  // If a given word has the same letters and number of letters as another 

//Example   -
anagram('finder', 'friend') === true
anagram('dope', 'doope') === false

//Approach  -
  // compare the length of each string 
  // if the string length matches
  // Split up each string, sort the letters, and join them back to a string
  // if the strings are equal return true

//Code  -
const anagram = (str1, str2) => {
  const sortStr = ((str) => {
    str.split().sort((a, b) => { 
      if (a < b) return -1 
      return 1
      })
  })

  if (str1.length === str2.length && sortStr(str1) === sortStr(str2)){
    return true
  }
}
//Test  -
//Optimize  - We can split the if statement to measure length to weed out strings that don't need the second layer of testing.