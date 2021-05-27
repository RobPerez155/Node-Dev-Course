//Repeat   check to see if a given string is a palindrome

//Example   for example
palindrome("racecar") == true
palindrome("berry") == false

//Approach   My approach is to reverse the string using the split, reverse, and join methods. Then I will compare the result to the original string.

//Code
const palindrome = (string) => {
  string = string.toLowerCase()
  return string === string.split('').reverse().join('')
}

//Test
palindrome("racecar")
palindrome("berry")

//Optimize  One way I see to optimize this is to have it work with an array for larger datasets