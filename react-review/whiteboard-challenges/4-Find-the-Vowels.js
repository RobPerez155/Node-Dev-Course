//Repeat  - 
  // find how many vowels are in a given string
//Examples  -
  voweler('pizza') return 2
  voweler('why') return 0

//Approach  - 
  // create an array of the vowels, check if any of the vowels are included in the string, keep count of of the matching vowels
//Code  -
const voweler = (str) => {
  let count = 0
  const vowels = ['a', 'e', 'i', 'o', 'u']
  for(let char of str.toLowerCase()) {
    if(vowels.includes(char)) {
      count++
    }
  }
  return count
}
//Test  - 
//Optimization  - 