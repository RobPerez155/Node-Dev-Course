// Object property shorthand - this allows to add values onto an object with ashorthand syntax under certain conditions.

const name = 'Andrew'
const userAge = 27

//When a property matches the name of its variable then a shorthand abbreviation can be used. So -name: name- becomes just -name-
const user = {
  name: name, //Here we can use the shorthand syntax
  age: userAge, //Here we cannot because the variable name does not match up with the property
  location: 'Philadelphia'
}

console.log(user)

// Object destructuring - Allows us to extract object properties and their values into individual variables. 

const product = {
  label:'Red notebook',
  price: 3,
  stock: 201,
  salePrice: undefined  
}

//const label = product.label
//const stock = product.stock

// const {label:productLabel, stock, rating = 5} = product
// console.log(productLabel) //We can change the name of the property label
// console.log(stock)
// console.log(rating)//We can add a new property but it will come back as undefined, unless we give it a default value as we did above. A default will only be used if there isn't already a default assigned to the value

const transaction = (type, { label, stock }) => { //Here we can destructure a property from inside the curly braces before we call product.
  console.log(type, label, stock)//We can call everything all at once
}

transaction('order', product)